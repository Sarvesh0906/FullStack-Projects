"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchuser, updateProfile } from '@/actions/userActions'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [form, setform] = useState({})

  useEffect(() => {
    getData()
    if (!session) {
      router.push('/login')
    }
  }, [router, session])

  const getData = async () => {
    let u = await fetchuser(session.user.username)
    setform(u)
  }


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    let res = await updateProfile(e, session.user.username)
    toast('Profile Updated!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
  });
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="container w-[50%] mx-auto py-7">
        <h1 className="text-center text-3xl font-bold mb-5">Welcome to your Dashboard</h1>

        <form action={handleSubmit} className="bg-slate-900 rounded-lg p-8 my-1">
          <div className="flex gap-6 mb-5">
            <div className="w-1/2">
              <label htmlFor="first_name" className="text-white block mb-2 text-sm font-medium  dark:text-white">First name</label>

              <input value={form.first_name ? form.first_name : ""} onChange={handleChange} type="text" id="first_name" name="first_name" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
            </div>

            <div className="w-1/2">
              <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-white dark:text-white">Last name</label>

              <input value={form.last_name ? form.last_name : ""} onChange={handleChange} type="text" id="last_name" name="last_name" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
            </div>
          </div>

          <div className="flex gap-6 mb-5">
            <div className="w-1/2">
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-white dark:text-white">Username</label>

              <input value={form.username ? form.username : ""} onChange={handleChange} type="text" id="username" name='username' className="bg-gray-50 border border-gray-300 text-sm rounded-lg text-black focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Flowbite" required />
            </div>

            <div className="w-1/2">
              <label htmlFor="phone" className="block mb-2 text-sm font-medium text-white dark:text-white">Phone number</label>

              <input value={form.phone ? form.phone : ""} onChange={handleChange} type="tel" id="phone" name='phone' className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="12345-67890" pattern="[0-9]{5}-[0-9]{5}" required />
            </div>
          </div>

          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-white">Email address</label>

            <input value={form.email ? form.email : ""} onChange={handleChange} type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
          </div>

          <div className="flex gap-6">
            <div className="mb-5 w-1/2">
              <label htmlFor="profile" className="block mb-2 text-sm font-medium text-white dark:text-white">Profile Picture</label>

              <input value={form.profile ? form.profile : ""} onChange={handleChange} type="text" id="profile" name='profile' className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xyz" required />
            </div>

            <div className="mb-5 w-1/2">
              <label htmlFor="cover" className="block mb-2 text-sm font-medium text-white dark:text-white">Cover Picture</label>

              <input value={form.cover ? form.cover : ""} onChange={handleChange} type="text" id="cover" name='cover' className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xyz" required />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="mb-5 w-1/2">
              <label htmlFor="razorpayId" className="block mb-2 text-sm font-medium text-white dark:text-white">Razorpay Id</label>

              <input value={form.razorpayId ? form.razorpayId : ""} onChange={handleChange} type="text" id="razorpayId" name='razorpayId' className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="******" required />
            </div>

            <div className="mb-5 w-1/2">
              <label htmlFor="razorpaySecret" className="block mb-2 text-sm font-medium text-white dark:text-white">Razorpay Secret</label>

              <input value={form.razorpaySecret ? form.razorpaySecret : ""} onChange={handleChange} type="text" id="razorpaySecret" name='razorpaySecret' className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="******" required />
            </div>
          </div>

          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
            </div>

            <label htmlFor="remember" className="ms-2 text-sm font-medium text-white dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
          </div>

          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>

      </div>
    </>
  )
}

export default Dashboard
