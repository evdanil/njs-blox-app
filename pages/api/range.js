const { range } = require('./range.json')
const { range_opts } = require('./range_opts.json')

export default function handler(req, res) {
  // console.log(network)
  // console.log(req)
  if (req.method === 'GET') {
    //console.log(req.query.network)
    if (req.query._return_fields === 'member,failover_association') {
      // console.log('Test Hit!')
      const range_entry = range_opts.filter((net) =>
        net.req.includes(req.query.network.slice(0, 10))
      )
      //console.log(range_entry.data)
      if (range_entry.length === 0) {
        res.status(200).json(Array())
      } else {
        res.status(200).json(Array(range_entry[0].data))
      }
    } else {
      const range_entry = range.filter((net) =>
        net.req.includes(req.query.network.slice(0, 10))
      )

      //console.log(range_entry.data)
      if (range_entry.length === 0) {
        res.status(200).json(Array())
      } else {
        res.status(200).json(Array(range_entry[0].data))
      }
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  }
}
