import React from "react";

const Error = ({ message }) => {
  return (
    <div className="flex items-center flex-col h-full justify-center gap-y-5">
      <h2 className="text-red-600 font-bold text-2xl">
        Found Error{message ? ": " + message : ""}
      </h2>
    </div>
  );
};

export default Error;
