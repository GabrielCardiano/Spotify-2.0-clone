/* eslint-disable @next/next/no-img-element */
import { playlistIdState, playlistState } from "@/atoms/playlistAtoms";
import useSpotify from "@/hooks/useSpotify";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { shuffle } from "lodash";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from 'recoil';
import PlaylistViewer from "./PlaylistViewer";

const colorsArray = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500'
];

function Center() {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistID = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colorsArray).pop());
  }, [playlistID]);

  useEffect(() => {
    spotifyApi.getPlaylist(playlistID)
      .then((data) => setPlaylist(data.body))
      .catch((err) => console.log("Something went wrong! ", err))
  }, [spotifyApi, playlistID, setPlaylist])


  return (
    <div className="bg-card my-2 rounded-lg flex-grow h-screen overflow-y-scroll scrollbar-hide">

      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80
         cursor-pointer rounded-full p-1 pr-2">
          <img
            src={session?.user.image}
            alt="profile-picture"
            className="rounded-full w-10 h-10" />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b from ${color} to-bg-card h-80 text-white p-8`}>
        <img
          src={playlist?.images?.[0]?.url}
          alt="playlist-picture"
          className="h-44 w-44 shadow-2xl"
        />
        <div className="">
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold">{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <PlaylistViewer />
      </div>


    </div>
  )
}

export default Center