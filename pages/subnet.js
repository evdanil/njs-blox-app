import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import getDataAPI from '@/utils/infoblox/Api'
import getAllSubnetData from '@/utils/infoblox/Api'
import SubnetResult from '@/components/SubnetResult'

function SubnetPage() {
  const router = useRouter()
  const [subnets, setSubnets] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [subnetsData, setSubnetsData] = useState(new Map())
  const [isValidated, setIsValidated] = useState(false)
  const updateSubnetsData = (k, v) => {
    setSubnetsData(new Map(subnetsData.set(k, v)))
  }
  const deleteSubnetsData = (k) => {
    let prev = new Map(subnetsData)
    prev.delete(k)
    setSubnetsData(prev)
  }

  useEffect(() => {
    // Do nothing if subnets list isn't validated
    if (!isValidated) {
      return
    }

    const fetchData = async () => {
      Array.from(subnetsData.keys()).map(async (subnet) => {
        const result = await getAllSubnetData(subnet)

        updateSubnetsData(subnet, {
          ...subnetsData.get(subnet),
          ...result,
        })
      })
    }

    fetchData()
  }, [isValidated])

  useEffect(() => {
    // Do nothing if form hasnt been submitted
    if (!isSubmitted) {
      return
    }

    const subnetsArray = subnets.trim().split(/[,\s]+|$/)

    // const subnetsMap = new Map()
    const fetchData = async () => {
      subnetsArray.map(async (subnet) => {
        const result = await getDataAPI(subnet)

        if (result.message !== undefined) {
          toast.error(`Subnet ${subnet}: ${result.message}`)
        } else {
          updateSubnetsData(subnet, {
            ...subnetsData.get(subnet),
            network: result.network,
            comment: result.comment,
          })
        }
      })
      setIsValidated(true)
    }

    fetchData()
  }, [isSubmitted])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validatedSubnets = validateSubnets(subnets.trim().split(/[,\s]+|$/))

    if (validatedSubnets.length === 0) {
      toast.error('Please fill in IP or Subnet list')
      return
    }
    setSubnets(validatedSubnets)
    setIsSubmitted(true)
  }

  const validateSubnets = (list) => {
    if (list.length === 0) {
      return ''
    }
    // Regexp validating IP/CIDR
    const regexp =
      /^(((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([1-9]|1[0-9]|2[0-8]|3[0-2])){0,1}){0,1}((\s*,\s*)(?=[^,])){0,1})+$/

    // Remove extra spaces, split by commas and new lines, check every item for regexp and return null if not IP/Subnet
    const result = list.map((s) => {
      return s.match(regexp) !== null ? s : null
    })
    // Set textarea to filtered results
    const subnets_list = result.filter((s) => s !== null).join('\n')

    if (subnets_list.length !== 0) {
      // console.log('subnets_list:' + subnets_list)
      return subnets_list
    }
    // Return false as no usable results
    return ''
  }

  return (
    <Layout
      title='NJS-BLOX Subents Information'
      keywords='subnet, network'
      description='Friendly Infoblox DDI Reporting Tool'
    >
      <h1>Subnets Information</h1>
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <div>
          <label htmlFor='subnets'>Input subnet or list of subnets</label>
          <textarea
            name='subnets'
            id='subnets'
            type='text'
            value={subnets}
            onChange={(e) => {
              setIsValidated(false)
              setIsSubmitted(false)
              setSubnets(e.target.value)
            }}
            onPaste={(e) => {
              setIsValidated(false)
              setIsSubmitted(false)
              setSubnets(e.target.value)
            }}
            // rows={20}
            placeholder='10.10.10.0/24'
          ></textarea>
        </div>
        <input
          type='submit'
          value='Retreive'
          className='btn'
        />
      </form>
      <div
        id='report'
        className=''
      >
        <SubnetResult data={subnetsData} />
      </div>
    </Layout>
  )
}

export default SubnetPage
