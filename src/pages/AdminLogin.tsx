import { FormEvent, useState } from "react";
import Logo from "../assets/logo.svg";
import { FaArrowLeftLong, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import OTPInput from "react-otp-input";
import Lottie from "lottie-react";
import Done from "../assets/done-animation.json";
import { useDispatch } from "react-redux";
import authService from "../api/services/auth.service";
import { login } from "../redux/slices/authSlice";
import { toast } from "react-toastify";
import { Spinner } from "../components/common/spinner";
import Cookies from "js-cookie";

export default function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [resetData, setResetData] = useState({
    email: "",
    send_code_by: "email",
  });

  const [error, setError] = useState("");
  const [phase, setPhase] = useState(1);
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(60);
  const [newPasswordData, setNewPasswordData] = useState({
    password: "",
    confirm_password: "",
  });
  const [togglePasswordShow, setTogglePasswordShow] = useState(false);

  function handlePasswordShow() {
    setTogglePasswordShow(!togglePasswordShow);
  }

  function resetTime() {
    setTime(60);
  }

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const { email, password } = loginData;
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    // try {
    //   const response = await authService.login({
    //     email: email,
    //     password: password,
    //     login_by: "email",
    //     user_type: "admin",
    //   });

    //   if (response.status == 200) {
    //     const data = response.data;

    //     // Dispatch to Redux (optional: include token if needed)
    //     // const expiresAt = new Date(new Date().getTime() + 1 * 60 * 60 * 1000);
    //     Cookies.set("token", data.access_token);
    //     dispatch(login(data.user));
    //     toast.success("Login successful");
    //     // Redirect
    //     return setTimeout(() => {
    //       navigate("/");
    //     }, 3000);
    //   }
    // } catch (err: any) {
    //   console.error("Login error:", err.status);
    //   toast.error("Login failed");
    //   setError(() => {
    //     if (err.status == 401) {
    //       return "Invalid credentials";
    //     } else if (err.response.status == 403) {
    //       return "You are not authorized to access this page";
    //     } else if (err.response.status == 404) {
    //       return "User not found";
    //     } else {
    //       return "An error occurred. Please try again.";
    //     }
    //   });
    // } finally {
    //   setIsLoading(false);
    // }

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    const { email, send_code_by } = resetData;
    if (!email) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const response = await authService.reqPasswordReset({
        email: email,
        send_code_by: send_code_by,
      });

      if (response.status == 200) {
        toast.success("Password reset code sent");
        resetTime();
        setPhase(3);
      }
    } catch (error: any) {
      console.error("Error sending password reset code:", error);

      if (error.response?.status === 404) {
        toast.error("Email not found");
      } else {
        toast.error("Error sending password reset code");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmReset = async (e: FormEvent) => {
    e.preventDefault();
    if (newPasswordData.password !== newPasswordData.confirm_password) {
      toast.error("Passwords do not match");
      return;
    }
    const { verification_code, password } = {
      verification_code: otp,
      password: newPasswordData.password,
    };
    if (!verification_code || !password) {
      setError("Please fill in all fields");
      return;
    }
    setIsLoading(true);
    try {
      const response = await authService.doPassReset({
        verification_code: verification_code,
        password: password,
      });
      if (response.status == 200) {
        toast.success("Password reset successful");
        setPhase(5);
      }
    } catch (error: any) {
      console.error("Error confirming password reset:", error);
      if (error.response?.status === 400) {
        toast.error("Invalid verification code");
      } else {
        toast.error("Error confirming password reset");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-y-5 justify-center items-center bg-[#F5F5F5]">
      {phase !== 5 ? (
        <img src={Logo} alt="Logo" className="h-[50px] w-auto" />
      ) : null}
      {phase === 1 ? (
        <>
          <form
            onSubmit={handleLogin}
            className="w-full md:w-[35%] flex flex-col items-center p-10 rounded-[24px] bg-white shadow-[0px_0px_34.9px_0px_rgba(31,14,28,0.05)]"
          >
            <div className="flex flex-col gap-y-1.5 mt-8 w-full">
              <label>Email:</label>
              <input
                className="w-full rounded-[8px] p-3 border border-primaryBorder"
                type="email"
                name="email"
                autoComplete="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Email"
              />
            </div>
            <div className="w-full flex flex-col gap-y-1.5 mt-4">
              <label className="">Password:</label>
              <div className="w-full flex gap-x-2 items-center px-4 py-3 rounded-[8px] border-primaryBorder border-[1px] bg-white">
                <input
                  className="outline-none w-[95%]"
                  value={loginData.password}
                  name="password"
                  autoComplete="current-password"
                  onChange={handleLoginChange}
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
              type="submit"
              className="mt-8 w-full flex justify-center items-center rounded-[8px] py-3 text-white bg-defaultOrange hover:bg-defaultOrangeHover"
            >
              {isLoading ? <Spinner /> : "Login"}
            </button>
          </form>
          {error && (
            <>
              <p className="text-red-500 text-sm mt-2">{error}</p>
            </>
          )}
        </>
      ) : phase === 2 ? (
        <div className="w-full md:w-[35%] flex flex-col items-center p-10 rounded-[24px] bg-white shadow-[0px_0px_34.9px_0px_rgba(31,14,28,0.05)]">
          <h1 className="text-lg text-center font-semibold">
            Reset your password
          </h1>

          <p className="text-secondaryTextColor text-sm text-center mt-2.5 max-w-[75%]">
            Enter the email address you used to sign up and we’ll send you
            instructions to reset your password
          </p>

          <div className="flex flex-col gap-y-1.5 mt-8 w-full">
            <label htmlFor="email">Email:</label>
            <input
              className="w-full rounded-[8px] p-3 border border-primaryBorder"
              type="email"
              value={resetData.email}
              onChange={(e) =>
                setResetData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              name="email"
              placeholder="Email"
            />
          </div>

          <button
            onClick={handleResetPassword}
            className="mt-8 w-full flex justify-center items-center rounded-[8px] py-3 text-white bg-defaultOrange hover:bg-defaultOrangeHover"
          >
            {isLoading ? <Spinner /> : "Reset"}
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
          <h1 className="text-lg font-semibold text-center">Enter OTP</h1>

          <p className="text-secondaryTextColor text-sm text-center mt-2.5 max-w-[75%]">
            Please check your mail, and enter the 4 digit code that was sent to{" "}
            <span className="italic font-medium">{resetData.email}</span>
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
            {time === 60 ? "1:00" : `0:${String(time).padStart(2, "0")}`}
          </p>

          <p className="text-secondaryTextColor text-sm text-center mt-12 max-w-[75%]">
            Didn't get a code?{" "}
            <span
              onClick={handleResetPassword}
              className="font-medium cursor-pointer hover:underline"
            >
              {isLoading ? <Spinner /> : "Send again"}
            </span>
          </p>

          <button
            onClick={() => {
              setPhase(4);
            }}
            className="mt-8 w-full flex justify-center items-center rounded-[8px] py-3 text-white bg-defaultOrange hover:bg-defaultOrangeHover"
          >
            {isLoading ? <Spinner /> : "Verify"}
          </button>
        </div>
      ) : phase === 4 ? (
        <div className="w-[35%] flex flex-col items-center p-10 rounded-[24px] bg-white shadow-[0px_0px_34.9px_0px_rgba(31,14,28,0.05)]">
          <div className="flex flex-col gap-y-1.5 mt-8 w-full">
            <label>New password:</label>
            <input
              className="w-full rounded-[8px] p-3 border border-primaryBorder"
              type="password"
              value={newPasswordData.password}
              onChange={(e) =>
                setNewPasswordData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              name="password"
              placeholder="New password"
            />
          </div>
          <div className="flex flex-col gap-y-1.5 mt-8 w-full">
            <label>Confirm new password:</label>
            <input
              className="w-full rounded-[8px] p-3 border border-primaryBorder"
              value={newPasswordData.confirm_password}
              onChange={(e) =>
                setNewPasswordData((prev) => ({
                  ...prev,
                  confirm_password: e.target.value,
                }))
              }
              type="password"
              placeholder="Confirm password"
            />
          </div>
          <button
            onClick={handleConfirmReset}
            className="mt-8 w-full flex justify-center items-center rounded-[8px] py-3 text-white bg-defaultOrange hover:bg-defaultOrangeHover"
          >
            {isLoading ? <Spinner /> : "Reset Password"}
          </button>
        </div>
      ) : phase === 5 ? (
        <div className="w-[35%] flex flex-col items-center">
          <Lottie className="max-w-[50%]" loop={true} animationData={Done} />
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
  );
}
