import { useEffect, useState } from "react";

export const useWindowResizer = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateWindowSize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setIsLargeScreen(width >= 1440);
      setIsMobile(width < 768); // Assuming mobile is less than 768px
    };

    // Perform this logic only on the client
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  return { windowWidth, isLargeScreen, isMobile };
};
