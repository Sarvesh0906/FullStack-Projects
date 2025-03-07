import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";
import User from "@/models/User"

export const POST = async (req) => {
    await connectDb()

    let body = await req.formData()
    body = Object.fromEntries(body)

    // Check if razorpay OrderId is present on the server
    let payment = await Payment.findOne({ oid: body.razorpay_order_id })
    if (!payment) {
        return NextResponse.json({ success: false, message: "OrderId not found" })
    }

    // fetch the secret of the user who is getting the payment
    let user = await User.findOne({ username: payment.to_user })
    const secret = user.razorpaySecret

    // Verify the payment
    let verified = validatePaymentVerification({
        "order_id": body.razorpay_order_id,
        "payment_id": body.razorpay_payment_id}, body.razorpay_signature, secret)

    if (verified) {
        // Update the payment status
        const updatedPayment = await Payment.findOneAndUpdate({ oid: body.razorpay_order_id }, { done: "true" }, { new: true })
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
    }
    else {
        return NextResponse.json({ success: false, message: "Payment verification failed" })
    }

}