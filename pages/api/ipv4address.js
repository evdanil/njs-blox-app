const { ipv4address } = require('./ipv4address.json')

export default function handler(req, res) {
  // console.log(network)
  if (req.method === 'GET') {
    // res.status(200).json(ipv4address[0].data)

    const ip_addr_array = ipv4address[0].data.filter((el) => {
      return el.ip_address.slice(0, 10) === req.query.network.slice(0, 10)
    })
    //console.log(network_entry.data)
    if (ip_addr_array.length === 0) {
      res.status(200).json(Array())
    } else {
      // console.log(ip_addr_array)
      res.status(200).json(ip_addr_array)
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  }
}
