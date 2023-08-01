import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function Home() {
 

  return (
    <>
      <main className='flex w-full h-screen overflow-hidden'>
        <Sidebar />
        <div>Main</div>
      </main>

      <div className='sticky z-20 bottom-0 h-24 w-full bg-red-300'>Player</div>

    </>
  )
}
