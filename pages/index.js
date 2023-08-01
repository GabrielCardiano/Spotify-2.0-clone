import Artist from "@/components/Artist";
import Library from "@/components/Library";
import PlaylistView from "@/components/PlaylistView";
import Search from "@/components/Search";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";

export default function Home() {
  const [view, setView] = useState('search');
  const [globalPlayListID, setGlobalPlayListID] = useState(null);
  const [globalArtistID, setGlobalArtistID] = useState(null);

  return (
    <>
      <main className='flex w-full h-screen overflow-hidden'>
        <Sidebar
          setView={setView}
          view={setView}
          setGlobalPlayListID={setGlobalPlayListID}

        />
        {view === 'search' && <Search />}
        {view === 'playlist' && <PlaylistView globalPlayListID={globalPlayListID}/>}
        {view === 'library' && <Library />}
        {view === 'artist' && <Artist  globalArtistID={globalArtistID}/>}
      </main>

      <div className='sticky z-20 bottom-0 h-24 w-full bg-red-300'>Player</div>

    </>
  )
}
