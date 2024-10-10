import { useState } from "react"
import Logo from "../assets/logo.svg"
import { FaArrowLeftLong, FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import OTPInput from "react-otp-input"
import Lottie from "lottie-react"
import Done from "../assets/done-animation.json"

export default function AdminLogin() {
    const navigate = useNavigate()
    const [phase, setPhase] = useState(1)
    const [otp, setOtp] = useState("")
    const [time, setTime] = useState(60)
    const [togglePasswordShow, setTogglePasswordShow] = useState(false)

    function handlePasswordShow() {
        setTogglePasswordShow(!togglePasswordShow)
    }

    function resetTime() {
        setTime(60)
    }

    return (
        <div className="w-screen h-screen flex flex-col gap-y-5 justify-center items-center bg-[#F5F5F5]">
            {phase !== 5 ? (
                <img src={Logo} alt="Logo" className="h-[50px] w-auto" />
            ) : null}
            {phase === 1 ? (
                <div className="w-[35%] flex flex-col items-center p-10 rounded-[24px] bg-white shadow-[0px_0px_34.9px_0px_rgba(31,14,28,0.05)]">
                    <div className="flex flex-col gap-y-1.5 mt-8 w-full">
                        <label>Email:</label>
                        <input
                            className="w-full rounded-[8px] p-3 border border-primaryBorder"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-y-1.5 mt-4">
                        <label className="">Password:</label>
                        <div className="w-full flex gap-x-2 items-center px-4 py-3 rounded-[8px] border-primaryBorder border-[1px] bg-white">
                            <input
                                className="outline-none w-[95%]"
                                type={!togglePasswordShow ? "password" : "text"}
                                placeholder="Type"
                            />
                            {!togglePasswordShow ? (
                                <FaRegEye
                                    onClick={handlePasswordShow}
                                    size={20}
                                    className="cursor-pointer flex-shrink-0"
                                />
                            ) : (
                                <FaRegEyeSlash
                                    onClick={handlePasswordShow}
                                    className="cursor-pointer flex-shrink-0"
                                    size={20}
                                />
                            )}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setPhase(2)}
                        className="text-[#585858] text-sm ml-auto mt-4 hover:underline"
                    >
                        Forgot password?
                    </button>

                    <button
                        onClick={() => {
                            navigate("/")
                        }}
                        className="mt-8 w-full rounded-[8px] py-3 text-white bg-defaultOrange hover:bg-defaultOrangeHover"
                    >
                        Login
                    </button>
                </div>
            ) : phase === 2 ? (
                <div className="w-[35%] flex flex-col items-center p-10 rounded-[24px] bg-white shadow-[0px_0px_34.9px_0px_rgba(31,14,28,0.05)]">
                    <h1 className="text-lg text-center font-semibold">
                        Reset your password
                    </h1>

                    <p className="text-secondaryTextColor text-sm text-center mt-2.5 max-w-[75%]">
                        Enter the email address you used to sign up and we’ll
                        send you instructions to reset your password
                    </p>

                    <div className="flex flex-col gap-y-1.5 mt-8 w-full">
                        <label>Email:</label>
                        <input
                            className="w-full rounded-[8px] p-3 border border-primaryBorder"
                            type="email"
                            placeholder="Email"
                        />
                    </div>

                    <button
                        onClick={() => {
                            setPhase(3)
                        }}
                        className="mt-8 w-full rounded-[8px] py-3 text-white bg-defaultOrange hover:bg-defaultOrangeHover"
                    >
                        Reset
                    </button>

                    <div className="w-full my-5 relative flex items-center justify-center text-sm">
                        <p className="text-center bg-white px-3 z-10">Or</p>
                        <div className="h-[1.6px] w-full bg-[#DED9DD] absolute -z-0"></div>
                    </div>

                    <button className="w-full rounded-[8px] py-3 border border-[#585858] hover:bg-black/5">
                        Verify using Whatsapp
                    </button>
                    <button className="w-full mt-4 rounded-[8px] py-3 border border-[#585858] hover:bg-black/5">
                        Send SMS
                    </button>
                </div>
            ) : phase === 3 ? (
                <div className="w-[35%] flex flex-col items-center p-10 rounded-[24px] bg-white shadow-[0px_0px_34.9px_0px_rgba(31,14,28,0.05)]">
                    <h1 className="text-lg font-semibold text-center">
                        Enter OTP
                    </h1>

                    <p className="text-secondaryTextColor text-sm text-center mt-2.5 max-w-[75%]">
                        Please check your mail, and enter the 4 digit code that
                        was sent to{" "}
                        <span className="italic font-medium">
                            rosemary@gmail.com
                        </span>
                    </p>

                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        inputType="number"
                        containerStyle="gap-x-5 w-full justify-center mt-7"
                        inputStyle="border border-primaryBorder rounded-[15px] h-[50px] !w-[50px] flex-shrink-0"
                        renderInput={(props) => <input {...props} />}
                    />

                    <p className="mt-5 text-sm">
                        {time === 60
                            ? "1:00"
                            : `0:${String(time).padStart(2, "0")}`}
                    </p>

                    <p className="text-secondaryTextColor text-sm text-center mt-12 max-w-[75%]">
                        Didn't get a code?{" "}
                        <span
                            onClick={resetTime}
                            className="font-medium cursor-pointer hover:underline"
                        >
                            send again
                        </span>
                    </p>

                    <button
                        onClick={() => {
                            setPhase(4)
                        }}
                        className="mt-8 w-full rounded-[8px] py-3 text-white bg-defaultOrange hover:bg-defaultOrangeHover"
                    >
                        Verify
                    </button>
                </div>
            ) : phase === 4 ? (
                <div className="w-[35%] flex flex-col items-center p-10 rounded-[24px] bg-white shadow-[0px_0px_34.9px_0px_rgba(31,14,28,0.05)]">
                    <div className="flex flex-col gap-y-1.5 mt-8 w-full">
                        <label>New password:</label>
                        <input
                            className="w-full rounded-[8px] p-3 border border-primaryBorder"
                            type="password"
                            placeholder="New password"
                        />
                    </div>
                    <div className="flex flex-col gap-y-1.5 mt-8 w-full">
                        <label>Confirm new password:</label>
                        <input
                            className="w-full rounded-[8px] p-3 border border-primaryBorder"
                            type="password"
                            placeholder="Confirm password"
                        />
                    </div>
                    <button
                        onClick={() => {
                            setPhase(5)
                        }}
                        className="mt-8 w-full rounded-[8px] py-3 text-white bg-defaultOrange hover:bg-defaultOrangeHover"
                    >
                        Reset password
                    </button>
                </div>
            ) : phase === 5 ? (
                <div className="w-[35%] flex flex-col items-center">
                    <Lottie
                        className="max-w-[50%]"
                        loop={true}
                        animationData={Done}
                    />
                    <p className="text-lg font-medium text-center">
                        Your password has been updated successfully
                    </p>
                    <button
                        onClick={() => setPhase(1)}
                        className="mt-10 w-full text-center rounded-[8px] py-3 text-white bg-defaultOrange hover:bg-defaultOrangeHover"
                    >
                        Login
                    </button>
                </div>
            ) : null}

            {phase === 1 || phase === 5 ? null : (
                <button
                    type="button"
                    onClick={() => setPhase(1)}
                    className="flex items-center gap-x-1"
                >
                    <FaArrowLeftLong size={18} />
                    <span>Back to login</span>
                </button>
            )}
        </div>
    )
}
