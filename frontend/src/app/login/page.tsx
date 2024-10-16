"use client"

import Image from "next/image";
import { useState, FormEvent, useEffect } from "react";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { headers } from "next/headers";

export default function LoginPage() {
  const [ isLoginSection, setIsLoginSection ] = useState(true)
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ errorLoginMessage, setErrorLoginMessage ] = useState("")
  const router = useRouter()
  const ikigaiUrl = "http://localhost:8080"


  const changeLoginSection = ( paramLogin: boolean ) => {
    console.log("changeLoginSection: ", paramLogin);
    setIsLoginSection(paramLogin)
  }

  const handleEmail = (e: any) => {
    const value = e.target.value;
    setEmail(value)
  };

  const handlePassword = (e: any) => {
    const value = e.target.value;
    setPassword(value)
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()   
      let authUrl = ""
      const dataSend = {
        email: email,
        password: password
      }
      setEmail("")
      setPassword("")
      if (isLoginSection) {
        authUrl = ikigaiUrl + "/auth/login"
      } else {
        authUrl = ikigaiUrl + "/auth/register"
      }
      axios.post(
        authUrl,
        dataSend
      )
        .then((data) => {
          console.log("data: ", data);
          let token = data.data.result.token
          localStorage.setItem("token", token)
          router.push('/home')
        })
        .catch((err) => {
          console.log("err: ", err);
          alert(err.response.data.message)
        })
    } catch (error) {
      console.log("ga masuk: ", error);
      
      alert(error)
    }
  }

  const getEventData =  async () => {
    let urlEvent = ikigaiUrl + "/event/all"
    let data = {}
    let jwtToken = "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZV9pZCI6MSwiaWF0IjoxNzI4NjMxNzg1LCJleHAiOjE3MzEyMjM3ODV9.j6zfwqlDtiCnOM_WoKS1m4ZkmR8RADFU2nbhyiUJMeQ"
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': jwtToken
    }
    axios.post(
      urlEvent,
      data, 
      {
        headers: headers
      })
      .then((data) => {
        console.log("data: ", data);
      })
      .catch((err) => {
        console.log("err: ", err);
      })
  }

  useEffect(() => {
    // getEventData()
  })
  
  const toogleButtonStyle = `
    /* Toggle A */
    input:checked ~ .dot {
      transform: translateX(100%);
      background-color: #48bb78;
    }

    /* Toggle B */
    input:checked ~ .dot {
      transform: translateX(100%);
      background-color: #48bb78;
    }
  `
  
  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div
        className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
      >
        <div
          className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
        >
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#">IKIGAI</a>
          </div>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            With the power of IKIGAI, you can now focus only on functionaries for your digital products, while leaving
            all the software things on us!
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Don't have an account?</span>
            <a href="#" className="underline">Get Started!</a>
          </p>
          <p className="mt-6 text-sm text-center text-gray-300">
            Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
          </p>
        </div>
        
        <div className="p-5 bg-white md:flex-1">
          {/* Toggle button */}
          <div className="flex items-center justify-center w-full mb-12"> 
            <style>{toogleButtonStyle}</style>
            <label htmlFor="toggleB" className="flex items-center cursor-pointer">
              <div className="relative">
                <input type="checkbox" id="toggleB" className="sr-only"
                    onClick={() => {
                      changeLoginSection(!isLoginSection)
                    }
                    }
                />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
              </div>
              <div className="ml-3 text-gray-700 font-medium">
                {
                  isLoginSection
                  ? "Register"
                  : "Login"
                }
              </div>
            </label>
          </div>

          <h3 className="my-4 text-2xl font-semibold text-gray-700">Account {isLoginSection ? "Login" : "Register"}</h3>
          <form onSubmit={submitForm} className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
              <input
                type="email"
                id="email"
                autoFocus
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 text-black"
                value={email}
                onChange={handleEmail}
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
                {
                  isLoginSection
                  ?
                  <a href="#" className="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</a>
                  : null
                }
              </div>
              <input
                type="password"
                id="password"
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200 text-black"
                value={password}
                onChange={handlePassword}
              />
            </div>
            <div>
              <a className="text-red-600">
                { errorLoginMessage }
              </a>
            </div>
            {
              isLoginSection
              ?
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                />
                  <label htmlFor="remember" className="text-sm font-semibold text-gray-500">Remember me</label>
              </div>
              :
              null
            }
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                {
                  isLoginSection
                  ?
                  "Log in"
                  :
                  "Register"
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
