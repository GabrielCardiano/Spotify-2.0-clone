import Player from "@/components/Player";
import Sidebar from "@/components/Sidebar";
import { getSession } from "next-auth/react"
import PlaylistViewer from "@/components/PlaylistViewer";
import Search from "@/components/Search";
import Library from "@/components/Library";
import Artist from "@/components/Artist";
import { useRecoilValue } from "recoil";
import { displayState } from "@/atoms/displayAtoms";

export default function Home() {
  const display = useRecoilValue(displayState); // ['search', 'library', 'playlist', 'artist']

  return (
    <div>
      <main className='flex w-full h-screen overflow-hidden'>
        <Sidebar />
        {display === 'search' && <Search /> }
        {display === 'library' && <Library /> }
        {display === 'playlist' && <PlaylistViewer /> }
        {display === 'artist' && <Artist /> }
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