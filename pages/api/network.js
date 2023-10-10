const { network } = require('./network.json')
const { dhcp_opts } = require('./network_opts.json')

export default function handler(req, res) {
  // console.log(network)
  // console.log(req)
  if (req.method === 'GET') {
    //console.log(req.query.network)
    if (req.query._return_fields === 'options,members') {
      const dhcp_opts_entry = dhcp_opts.filter(
        (net) => net.data._ref.includes(req.query.network.slice(0, 10)) === true
      )
      if (dhcp_opts_entry.length === 0) {
        res.status(200).json(Array())
      } else {
        res.status(200).json(Array(dhcp_opts_entry[0].data))
      }
    } else {
      const network_entry = network.filter(
        (net) => net.data.network === req.query.network
      )
      //console.log(network_entry.data)
      if (network_entry.length === 0) {
        res.status(200).json(Array())
      } else {
        res.status(200).json(Array(network_entry[0].data))
      }
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  }
}
