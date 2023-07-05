import React from "react";

const Error = ({ message }) => {
  return (
    <div className="flex items-center flex-col justify-center h-screen gap-y-5">
      <h2 className="text-red-600 font-bold text-2xl">
        Found Error{message ? ": " + message : ""}
      </h2>
      <a href="/" className="font-semibold bg-blue-500 p-2 rounded-lg text-white">
        Return Home
      </a>
    </div>
  );
};

export default Error;
