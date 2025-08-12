import { useState, useEffect } from "react";
interface CountDownProps {
  genResetToken?: () => Promise<void>;
  time?: number;
  isResend?: boolean;
}

const CountdownTimer = ({
  genResetToken,
  time = 5,
  isResend = false,
}: CountDownProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  // const [isResend, setIsResnd] = useState<boolean>(false);
  useEffect(() => {
    const expiryTime = Date.now() + time * 60 * 1000;

    // Calculate the remaining time
    const updateTimeLeft = () => {
      const remaining = Math.max(
        0,
        Math.floor((expiryTime - Date.now()) / 1000)
      );
      setTimeLeft(remaining);
      if (remaining <= 0) {
        // setIsResnd(true);
      }
    };

    updateTimeLeft(); // Initial call
    const interval = setInterval(updateTimeLeft, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex my-4 items-center w-full justify-center">
      <span className="text-red-500 font-bold text-lg">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}{" "}
        <span className="text-black">remaining</span>
      </span>
      {isResend && (
        <button
          className="py-2 px-3 border border-[#1B5383]  text-[#1B5383] hover:bg-[#1B5383] hover:text-white rounded-2xl transition duration-300"
          onClick={genResetToken}
        >
          Resend
        </button>
      )}
    </div>
  );
};

export default CountdownTimer;
