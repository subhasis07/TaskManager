import React, { useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc";

import { auth,provider } from '../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import Home from './Home';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const[value,setValue]=useState('')
  const navigate = useNavigate();
  const handleClick=()=>{
    signInWithPopup(auth,provider).then((data)=>{
        setValue(data.user.email);
        localStorage.setItem("email",data.user.email);
        navigate("/home");
    })
  }

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setValue(storedEmail);
      navigate("/home"); 
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row items-center justify-center">
      {/* Left Section - Branding */}
      <div className="flex flex-col items-center text-center md:text-left md:items-start md:w-1/2 p-10">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">TaskBuddy</h1>
        <p className="text-gray-600 max-w-sm mb-6">
          Streamline your workflow and track progress effortlessly with our all-in-one task management app.
        </p>

        {value?<p className="text-green-600">Redirecting to Home...</p>: 
          <button className="flex items-center px-4 py-2 bg-white text-gray-800 rounded-lg shadow-md hover:shadow-lg transition"
          onClick={handleClick}>
            <FcGoogle className="text-xl mr-2" /> Continue with Google
          </button>
        }
      </div>

      {/* Right Section - Image */}
      <div className="md:w-1/2 flex justify-center">
        <img src="/Images/LoginIMG.png" alt="Login" className="w-full max-w-md object-contain" />
      </div>
    </div>
  )
}

export default Login