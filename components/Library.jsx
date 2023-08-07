/* eslint-disable @next/next/no-img-element */
import { displayState } from "@/atoms/displayAtoms";
import { playlistIdState } from "@/atoms/playlistAtoms";
import useSpotify from "@/hooks/useSpotify";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

function Library() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState();
  const [display, setDisplay] = useRecoilState(displayState);
  const [playlistID, setPLaylistID] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists()
        .then((data) => setPlaylists(data.body.items))
    }
  }, [session, spotifyApi])

  const goToPlayList = (playlist) => {
    setDisplay('playlist')
    setPLaylistID(playlist.id)
  }
  
  return (
    <div className="flex-grow h-screen bg-card my-2 mr-2 rounded-lg ">
      <header className="textsticky top-0 h-20 z-10 text-4xl">
      </header>
      <div className="absolute z-20 top-5 right-8 flex items-center bg-black opacity-70">
        <img
          className="rounded-full w-7 h-7"
          src={session?.user?.image}
          alt="user-picture" />

        <p className="text-sm">Logout</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      <div className="flex flex-col gap-4 px-8 h-screen overflow-y-scroll">
        <h2 className="text-xl font-bold">Playlists</h2>
        <div className="flex flex-wrap gap-9 mb-48">

          {playlists?.map((playlist) => (
            <div 
            key={playlist.id} 
            onClick={ () => goToPlayList(playlist) }
            className="cursor-pointer relative group w-56 mb-2
           shadow-xl shadow-emerald-600 hover:bg-neutral-800 rounded-md p-4">

              <div className="absolute opacity-0 group-hover:opacity-100 transition-all ease-in-out duration-200 shadow-2xl shadow-neutral-900 z-10 h-16 w-16 rounded-full flex items-center justify-center bg-green-500 top-[156px] group-hover:top-[148px] right-6">
                <PlayIcon className="h-8 w-8 text-black" />
              </div>
              <img className="w-48 h-48 mb-4" src={playlist?.images?.[0]?.url} alt="playlist-picture" />
              <p className="text-base mb-1 w-48 truncate">{playlist.name}</p>
              <p className="text-sm text-neutral-400 mb-8 w-48 truncate">By {playlist.owner.display_name}</p>
            </div>
          ))}

        </div>
      </div>

    </div>
  )
}

export default Library