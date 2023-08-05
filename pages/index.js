import Center from "@/components/Center";
import Player from "@/components/Player";
import Sidebar from "@/components/Sidebar";
import { getSession } from "next-auth/react"

export default function Home() {
  return (
    <div>
      <main className='flex w-full h-screen overflow-hidden'>
        <Sidebar />
        <Center />
      </main>

      <div className='sticky z-20 bottom-0 h-24 w-full'>
        <Player />
      </div>

    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}