import { useState, useEffect } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = (w) => {
    setIsMobile(w.innerWidth < 768);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", (w) => handleResize(w));
      return () => {
        window.addEventListener("resize", (w) => handleResize(w));
      };
    }
  }, []);

  return isMobile;
};

export default useIsMobile;
