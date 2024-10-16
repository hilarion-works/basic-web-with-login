"use client"

import { useRouter, redirect } from "next/navigation"
import { useEffect } from "react";
// import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter()
  const logoutAccount = () => {
    localStorage.removeItem("token")
    router.push(`/`)
    // window.location.href = "/"

  }
  return (
    <header className="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">
      <div className="flex items-center justify-between mb-4 md:mb-0">
        <h1 className="leading-none text-2xl text-grey-darkest">
        <a className="no-underline text-grey-darkest hover:text-black" href="#">
          Ikigai
        </a>
        </h1>
        <a className="text-black hover:text-orange md:hidden" href="#">
        <i className="fa fa-2x fa-bars"></i>
        </a>
      </div>
      <nav>
        <ul className="list-reset md:flex md:items-center">
          <li className="md:ml-4">
            <a className="block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0" href="#" onClick={() => {logoutAccount()}}>
            Logout
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}