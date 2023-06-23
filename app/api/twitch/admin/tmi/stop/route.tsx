import {NextResponse} from 'next/server'
import {path} from '../route'
import axios from 'axios'

export const PUT = async () => {
  try {
    const res = await axios.put(`${path}/stop`)
    return NextResponse.json(res.data)
  } catch (error) {
    console.error('stopTmi: ', error)
    return NextResponse.json({error: 'Failed to stop tmi'})
  }
}
