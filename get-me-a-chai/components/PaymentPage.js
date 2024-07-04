"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { fetchuser, fetchpayments, initiate } from '@/actions/userActions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { notFound } from 'next/navigation'

const PaymentPage = ({ username }) => {

    const [paymentForm, setpaymentForm] = useState({ name: '', amount: '', message: '' })
    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get('paymentdone') === 'true') {
            toast('Thanks for your Donations!', {
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
        // router.push(`/${username}`)
    }, [])

    const handleChange = (e) => {
        setpaymentForm({ ...paymentForm, [e.target.name]: e.target.value })
    }

    const getData = async (params) => {
        let user = await fetchuser(username)
        setCurrentUser(user)
        let dbPayments = await fetchpayments(username)
        setPayments(dbPayments)
    }

    const pay = async (amount) => {
        // Get the orderID
        let a = await initiate(amount, username, paymentForm)
        let orderId = a.id

        var options = {
            "key": process.env.NEXT_PUBLIC_KEY_ID,
            "amount": amount, // Example: 2000 paise = INR 20
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId,
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        }
        var rzp1 = new Razorpay(options);
        rzp1.open();
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

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="cover w-full relative">
                <img className="object-cover w-full h-[370px]" src="/cover.jpeg" alt="user page cover" />

                <div className="absolute -bottom-16 right-[46%] border-2 border-white rounded-xl">
                    <img className="w-[120px] h-[120px] rounded-xl" src="/cover.jpeg" alt="user profile cover" />
                </div>
            </div>

            <div className="info flex justify-center items-center py-24 flex-col gap-1">
                <div className="font-bold text-3xl">
                    {username}
                </div>

                <div className="">
                    Creating a podcast with ben avery, devan costa and jace avery
                </div>

                <div className='flex items-center gap-2 text-sm opacity-60'>
                    <span>8,074 members</span>

                    <span><img className="bg-white rounded-full block" src="/circle.svg" alt="dot" /></span>

                    <span>247 posts</span>

                    <span><img className="bg-white rounded-full block" src="/circle.svg" alt="dot" /></span>

                    <span>$35,340/month</span>
                </div>

                <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-16 py-2.5 text-center my-4">Join for free</button>

                <div className="invert flex gap-4">
                    <a href="https://www.instagram.com/" target='_blank'>
                        <img src="/insta.svg" alt="Instagram Logo" />
                    </a>

                    <a href="https://www.twitter.com/" target='_blank'>
                        <img src="/twitter.svg" alt="Twitter Logo" />
                    </a>

                    <a href="https://www.facebook.com/" target='_blank'>
                        <img src="/facebook.svg" alt="Facebook Logo" />
                    </a>

                    <a href="https://www.discord.com/" target='_blank'>
                        <img src="/discord.svg" alt="Discord Logo" />
                    </a>
                </div>

                <hr className='h-[2px] w-full bg-white opacity-50 my-8' />

                <div className="payment flex gap-8 w-[80%] mt-14">
                    <div className="supporters w-1/2 bg-slate-900 rounded-lg p-8 border border-white border-opacity-50">
                        <h2 className="text-2xl font-bold mb-2">Top 10 Supporters</h2>

                        <ul className={`${payments.length >= 6 ? "overflow-y-scroll dark-scrollbar h-[200px]" : ""}`}>
                            {payments.length === 0 && <li className="text-sm mt-5 text-center">No payments yet</li>}

                            {payments.map((p, i) => {
                                return <li key={i} className="my-2 flex gap-2 items-center text-sm">
                                    <img width={33} className="rounded-full p-1" src="/avatar.gif" alt="avatar" />

                                    <span>{p.name} donated <span className="font-bold">₹{p.amount / 100}</span> with a message "{p.message}"</span>
                                </li>
                            })}
                        </ul>
                    </div>

                    <div className="makePayment w-1/2 bg-slate-900 rounded-lg p-10 border border-white border-opacity-50">
                        <h2 className="text-2xl font-bold mb-7">Make a payment</h2>

                        <div className="flex gap-5">
                            <div className="flex gap-2 flex-col w-full">
                                <div className="flex gap-2 w-full">
                                    <input onChange={handleChange} value={paymentForm.name} name='name' type="text" placeholder="Name" className="w-[65%] bg-slate-800 rounded-lg p-2 px-3 border border-white border-opacity-10" required />

                                    <input onChange={handleChange} value={paymentForm.amount} name="amount" type="text" placeholder="Amount" className="w-[40%] bg-slate-800 rounded-lg p-2 px-3 border border-white border-opacity-10" required />
                                </div>

                                <input onChange={handleChange} value={paymentForm.message} name='message' type="text" placeholder="Message" className="w-full bg-slate-800 rounded-lg p-2 px-3 border border-white border-opacity-10" required />
                            </div>

                            <button onClick={() => pay(Number.parseInt(paymentForm.amount) * 100)} type="button" disabled={paymentForm.name?.length < 3 || paymentForm.message?.length < 4 || paymentForm.amount?.length < 1} className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center my-4 disabled:opacity-60">Pay</button>
                        </div>

                        <div className="flex gap-4 mt-6">
                            <button onClick={() => pay(1000)} className="bg-slate-800 px-3 py-2 rounded-lg transition-all ease-in duration-75 border border-white border-opacity-10 hover:bg-slate-100 hover:text-black hover:font-semibold">Pay ₹10</button>

                            <button onClick={() => pay(2000)} className="bg-slate-800 px-3 py-2 rounded-lg transition-all ease-in duration-75 border border-white border-opacity-10 hover:bg-slate-100 hover:text-black hover:font-semibold">Pay ₹20</button>

                            <button onClick={() => pay(3000)} className="bg-slate-800 px-3 py-2 rounded-lg transition-all ease-in duration-75 border border-white border-opacity-10 hover:bg-slate-100 hover:text-black hover:font-semibold">Pay ₹30</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
