const { fixedaddress } = require('./fixed_address.json')

export default function handler(req, res) {
  if (req.method === 'GET') {
    const fixedaddress_entry = fixedaddress.filter((net) =>
      net.req.includes(req.query.network.slice(0, 10))
    )
    if (fixedaddress_entry.length === 0) {
      res.status(200).json(Array())
    } else {
      res.status(200).json(fixedaddress_entry[0].data)
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  }
}
