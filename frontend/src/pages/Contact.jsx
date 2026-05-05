import React from "react";
import Footer from "../pages/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex-grow p-10">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p>Reach us anytime for help.</p>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;