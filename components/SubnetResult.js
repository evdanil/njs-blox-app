// Component should properly display subnet information
// Description, Registred DNS, DHCP Options, DHCP Range(start&end), IPv4 DHCP Failover association, Fixed Addresses (IP, MAC & Name)
// data prop contains all required information, if it is empty object we dont render anything
import { FaInfo } from 'react-icons/fa'

function SubnetResult({ data }) {
  // console.log(data)
  return (
    <>
      {[...data.keys()].length !== 0 ? (
        <div>Results {[...data.keys()]}</div>
      ) : (
        ''
      )}
    </>
  )
}

export default SubnetResult

SubnetResult.defaultProps = {
  data: { network: '' },
}
