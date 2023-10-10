import { API_URL } from '@/config/index'
import { getStoredAuth } from '../auth/Auth'

async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 10000 } = options

  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  })
  clearTimeout(id)

  return response
}

// Multiple types of requests:
// - to get general subnet data - use default options with no fields
// GET https://x.x.x.x/wapi/v2.11/network?network=10.227.17.0/24&_return_as_object=1
// - to get current DHCP/DNS A records use options set to 'usage=DNS', req_type set to 'ipv4address' and fields _return_fields=ip_address,names
// GET https://x.x.x.x/wapi/v2.11/ipv4address?network=10.227.17.0/24&usage=DNS&_return_fields=ip_address,names
// - to get DHCP Subnet Options - set options to '' and fields _return_fields=options,members
// GET https://x.x.x.x/wapi/v2.11/network?network=10.227.17.0/24&_return_fields=options,members
// - to get DHCP Ranges - use req_type 'range' and fields to ''
// GET https://x.x.x.x/wapi/v2.11/range?network=10.227.17.0/24&_return_as_object=1
// - to get DHCP Range Failover association - use req_type 'range' and fields _return_fields=member,failover_association
// GET https://x.x.x.x/wapi/v2.11/range?network=10.227.17.0/24&_return_fields=member,failover_association
// - to get fixed IP records  - use req_type 'fixedaddress' and fields _return_fields=ipv4addr,mac,name
// GET https://x.x.x.x/wapi/v2.11/fixedaddress?network=10.227.17.0/24&_return_fields=ipv4addr,mac,name

export async function getDataAPI(
  subnet,
  req_type = 'network',
  options = '_return_as_object=1',
  fields = ''
) {
  const { apiUrl, username, password } = getStoredAuth()

  const requestUri = `${apiUrl !== '' ? apiUrl : API_URL}/${
    req_type !== '' ? req_type : 'network'
  }?network=${subnet.trim()}${options != '' ? '&' + options.trim() : ''}
  ${fields != '' ? '&' + fields.trim() : ''}`
  let fetchOptions = {}
  if (username !== '' && password !== '') {
    fetchOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Basic ' + btoa(`${username}:${password}`),
      },
      timeout: 5000,
    }
  }
  // console.log(request_uri)
  try {
    const res = await fetchWithTimeout(requestUri, fetchOptions)
    return res.json()
  } catch (error) {
    return { message: error }
  }
}

export default async function getAllSubnetData(subnet) {
  // Initiate both requests in parallel
  // Receive DNS A Records or DHCP issues Addresses
  const dnsRecordsData = getDataAPI(
    subnet,
    'ipv4address',
    'usage=DNS',
    '_return_fields=ip_address,names'
  )

  // Receive DHCP Subnet Options
  const dhcpOptsData = getDataAPI(
    subnet,
    'network',
    '',
    '_return_fields=options,members'
  )

  // Receive DHCP Ranges
  const dhcpRangesData = getDataAPI(subnet, 'range', '', '')

  // Receive DHCP Failover association
  const dhcpFailoverData = getDataAPI(
    subnet,
    'range',
    '',
    '_return_fields=member,failover_association'
  )

  // Receive fixed IP address records
  const dhcpFixedIpData = getDataAPI(
    subnet,
    'fixedaddress',
    '',
    '_return_fields=ipv4addr,mac,name'
  )

  // Wait for the promises to resolve
  const [dnsRecords, dhcpOpts, dhcpRanges, dhcpFailover, dhcpFixedIp] =
    await Promise.all([
      dnsRecordsData,
      dhcpOptsData,
      dhcpRangesData,
      dhcpFailoverData,
      dhcpFixedIpData,
    ])
  // console.log('dhcpopts:')
  // console.log(dhcpOpts)
  return {
    dnsRecords,
    dhcpOpts,
    dhcpRanges,
    dhcpFailover,
    dhcpFixedIp,
  }
}
