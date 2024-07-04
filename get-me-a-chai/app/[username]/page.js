import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from 'next/navigation'
import User from '@/models/User'
import connectDb from '@/db/connectDb'

const Username = async ({ params }) => {

  // If the username is not present in the database, show a 404 page
  // const checkUser = async () => {
  //   await connectDb()
  //   let u = await User.findOne({ username: params.username })
  //   if (!u) {
  //     return notFound()
  //   }
  // }
  // await checkUser()

  return (
    <>
      <PaymentPage username={params.username} />
    </>
  )
}

export default Username


// Metadata
export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Get me a Chai`,
    description: `Payment Page for ${params.username} on Get me a Chai`,
  }
}

