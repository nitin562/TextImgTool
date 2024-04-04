import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Button, Popover,message } from "antd";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  googleLogout,
} from "@react-oauth/google";
export default function Nav({ showModal, setArr }) {
  const [login, setlogin] = useState(sessionStorage.getItem("name")?true:false); //getting login state
  const [messageApi,contextHolder] =message.useMessage() //syntax from antd
  const handleDeleteAll = () => { //delete all text
    setArr([]);
  };
  const handleSuccess = (credentials) => {  //on successFul login
    const profile = jwtDecode(credentials.credential); //decode the credentials.credential which is actual data encoded in jwt from google
    sessionStorage.setItem("name", profile.name);
    sessionStorage.setItem("email", profile.email); //save name and email
    messageApi.info(`Welcome, ${profile.name}`) //show message of logined
    setlogin(true);
  };
  const handleFailure = (error) => { //on unsuccessFull login
    console.log(error);
    messageApi.info("Login is unsuccessfull, Try Again")
  };
  const handleLogout=()=>{ //on logout
    googleLogout() //google auth library function to logout
    setlogin(false) 
    messageApi.info("You are logout") //show message of logout
    sessionStorage.clear() // clearout session
  }
  const client =
    "407063868783-mppipsuahg2n571ufdd3rnsi04ra91f9.apps.googleusercontent.com"; //client id 
  const content=( //on hovering text icon after logined user
    <div className="w-full p-2 flex flex-col justify-center items-center cursor-default ">
      <img src="/profile.png" alt="logo" className=" w-[5rem] aspect-square"/>
      <p className="text-2xl drop-shadow-[0_0_0.5rem_rgb(249,115,22,0.5)] font-['Ubuntu'] text-white  text-center  ">{sessionStorage.getItem("name")}</p>
      <p className="text-md text-gray-400 text-center ">{sessionStorage.getItem("email")}</p>
      <Button type="primary" danger className="text-red-400 my-2" onClick={handleLogout}>Logout</Button>

    </div>
  )
  
  return (
    //Need to wrap the portion where google auth is used
    <GoogleOAuthProvider clientId={client}>
       {/*contextHolder is from antd message component for display message  */}
      {contextHolder} 
      <div className="w-full min-h-[4rem] p-3 border-b-2 flex flex-col  items-center gap-y-4 md:flex-row  border-b-white  md:items-center md:justify-end px-2 md:gap-x-8 bg-slate-900/40">
        {!login&&<div >
          {!login && (
          <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
        )}</div>}
        <div className="flex gap-x-2 justify-end">
        {login && (
          <Popover content={content} trigger="click" color="rgb(255,255,255,0.2)">
            <div className="rounded-full flex justify-center cursor-pointer items-center md:text-xl w-8 h-8 bg-green-700">
              <span className="text-white">
                {sessionStorage.getItem("name")[0]}
              </span>
            </div>
          </Popover>
        )}
        <Button
          type="primary"
          onClick={() => {
            showModal(true);
          }}
          className="w-fit h-fit hover:drop-shadow-[0_0_0.1rem_#fff]  text-white font-thin text-xl"
        >
          Add New
        </Button>
        <Button
          type="primary"
          danger
          onClick={handleDeleteAll}
          className="w-fit h-fit  text-white font-thin text-xl"
        >
          Delete All
        </Button>
        </div>
        
      </div>
    </GoogleOAuthProvider>
  );
}
