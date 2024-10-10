import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import FacebookLogo from "../assets/facebook-logo.png"
import GoogleLogo from "../assets/google-icon.svg"
import { CountryDropdown, RegionDropdown } from "react-country-region-selector"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface SignUpProps {
    setSignUp: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SignUp({ setSignUp }: SignUpProps) {
    const [country, setCountry] = useState("")
    const [region, setRegion] = useState("")
    const [togglePasswordShow, setTogglePasswordShow] = useState({
        signUp1: false,
        signUp2: false,
    })
    const navigate = useNavigate()

    function goToHome() {
        navigate("/")
    }

    function handleToggleSignUp1() {
        setTogglePasswordShow({
            signUp1: !togglePasswordShow.signUp1,
            signUp2: togglePasswordShow.signUp2,
        })
    }

    function handleToggleSignUp2() {
        setTogglePasswordShow({
            signUp1: togglePasswordShow.signUp1,
            signUp2: !togglePasswordShow.signUp2,
        })
    }

    return (
        <div className="w-[70%] flex flex-col py-10">
            <h1 className="text-4xl font-bold text-center">
                Welcome to DistressSale
            </h1>
            <p className="text-sm text-[#585858] mt-2.5 text-center">
                Shop the quality and affordable items in the comfort of your
                home.
            </p>

            <div className="w-full grid grid-cols-2 gap-x-2 gap-y-4 mt-6">
                <div className="flex flex-col gap-y-1.5">
                    <label className="">First name:</label>
                    <input
                        className="p-3 px-4 rounded-[8px] border-[#DED9DD] border-[1px] outline-none bg-white"
                        type="text"
                        placeholder="First name"
                    />
                </div>
                <div className="flex flex-col gap-y-1.5">
                    <label className="">Last name:</label>
                    <input
                        className="p-3 px-4 rounded-[8px] border-[#DED9DD] border-[1px] outline-none bg-white"
                        type="text"
                        placeholder="Last name"
                    />
                </div>
                <div className="flex flex-col gap-y-1.5">
                    <label className="">Email:</label>
                    <input
                        className="p-3 px-4 rounded-[8px] border-[#DED9DD] border-[1px] outline-none bg-white"
                        type="email"
                        placeholder="Email"
                    />
                </div>
                <div className="flex flex-col gap-y-1.5">
                    <label className="">Choose username:</label>
                    <input
                        className="p-3 px-4 rounded-[8px] border-[#DED9DD] border-[1px] outline-none bg-white"
                        type="text"
                        placeholder="Choose username"
                    />
                </div>
                <div className="w-full flex flex-col gap-y-1.5">
                    <label className="">Password</label>
                    <div className="w-full flex gap-x-2 items-center px-4 py-3 rounded-[8px] border-[#DED9DD] border-[1px] bg-white">
                        <input
                            className="outline-none w-[90%]"
                            type={
                                !togglePasswordShow.signUp1
                                    ? "password"
                                    : "text"
                            }
                            placeholder="Type"
                        />
                        {!togglePasswordShow.signUp1 ? (
                            <FaRegEye
                                onClick={handleToggleSignUp1}
                                size={20}
                                className="cursor-pointer flex-shrink-0"
                            />
                        ) : (
                            <FaRegEyeSlash
                                onClick={handleToggleSignUp1}
                                className="cursor-pointer flex-shrink-0"
                                size={20}
                            />
                        )}
                    </div>
                </div>
                <div className="w-full flex flex-col gap-y-1.5">
                    <label className="">Confirm Password</label>
                    <div className="w-full flex gap-x-2 items-center px-4 py-3 rounded-[8px] border-[#DED9DD] border-[1px] bg-white">
                        <input
                            className="outline-none w-[90%]"
                            type={
                                !togglePasswordShow.signUp2
                                    ? "password"
                                    : "text"
                            }
                            placeholder="Type"
                        />
                        {!togglePasswordShow.signUp2 ? (
                            <FaRegEye
                                onClick={handleToggleSignUp2}
                                size={20}
                                className="cursor-pointer flex-shrink-0"
                            />
                        ) : (
                            <FaRegEyeSlash
                                onClick={handleToggleSignUp2}
                                className="cursor-pointer flex-shrink-0"
                                size={20}
                            />
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-y-1.5">
                    <label className="">Country:</label>
                    <CountryDropdown
                        classes="p-3 px-4 rounded-[8px] border-[#DED9DD] border-[1px] outline-none bg-white"
                        value={country}
                        onChange={(val) => setCountry(val)}
                    />
                </div>
                <div className="flex flex-col gap-y-1.5">
                    <label className="">State/City:</label>
                    <RegionDropdown
                        classes="p-3 px-4 rounded-[8px] border-[#DED9DD] border-[1px] outline-none bg-white"
                        country={country}
                        value={region}
                        onChange={(val) => setRegion(val)}
                    />
                </div>
                <div className="flex flex-col gap-y-1.5">
                    <label className="">Street Address:</label>
                    <input
                        className="p-3 px-4 rounded-[8px] border-[#DED9DD] border-[1px] outline-none bg-white"
                        type="text"
                        placeholder="Type"
                    />
                </div>
                <div className="flex flex-col gap-y-1.5">
                    <label className="">Postal Code:</label>
                    <input
                        className="p-3 px-4 rounded-[8px] border-[#DED9DD] border-[1px] outline-none bg-white"
                        type="text"
                        placeholder="Type"
                    />
                </div>
            </div>

            <button
                onClick={goToHome}
                className="w-[70%] mx-auto py-3 rounded-[8px] mt-8 text-white bg-defaultOrange hover:bg-defaultOrangeHover"
            >
                Create account
            </button>

            <div className="mt-8 relative flex items-center justify-center">
                <p className="text-center bg-[#F5F5F5] px-3 z-10">
                    Or Sign up with
                </p>
                <div className="h-[1.6px] w-full bg-[#DED9DD] absolute -z-0"></div>
            </div>

            <div className="flex gap-x-4 items-center justify-center mt-8">
                <button
                    className="flex justify-center items-center h-[48px] px-10 gap-x-3 rounded-[8px] border border-[#6D6D6D] hover:bg-black/5"
                    type="button"
                >
                    <img
                        className="w-[39px] h-[39px]"
                        src={GoogleLogo}
                        alt="google"
                    />
                    <span>Google</span>
                </button>
                <button
                    className="flex justify-center items-center h-[48px] px-10 gap-x-3 rounded-[8px] border border-[#6D6D6D] hover:bg-black/5"
                    type="button"
                >
                    <img
                        className="w-[24px] h-[24px]"
                        src={FacebookLogo}
                        alt="google"
                    />
                    <span>Facebook</span>
                </button>
            </div>

            <p className="text-[#6D6D6D] text-center mt-5">
                Already have an account?{" "}
                <span
                    onClick={() => setSignUp(false)}
                    className="hover:underline cursor-pointer font-medium text-black"
                >
                    Log In
                </span>
            </p>

            <div className="py-10"></div>
        </div>
    )
}
