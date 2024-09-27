import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//code.tidio.co/vtukjkuycftijqmukfpjphwon5nncvqd.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up the script on unmount
    };
  }, []);

  return null; // No visible UI for the component
};

export default Chatbot;
