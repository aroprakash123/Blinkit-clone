import React from "react";
import Footer from "../pages/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex-grow p-10">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p>Your data is safe and protected.</p>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;