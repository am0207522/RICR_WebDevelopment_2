import React from "react";

const Login = () => {
  return (
    <>
      <div className="h-[90vh] bg-linear-to-r from-(--secondary) to-(--primary) grid grid-cols-2">
        <div>
          <img src={deliveryboy} alt="" className="rotate-y-180" />
        </div>
        <div className="w-md bg-(--background) rounded shadow">
          Welocme Back
        </div>
      </div>
    </>
  )
}

export default Login;
