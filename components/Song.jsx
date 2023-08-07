/* eslint-disable @next/next/no-img-element */
import { isPlayingState } from "@/atoms/songAtoms";
import useSpotify from "@/hooks/useSpotify";
import { millisToMinutesAndSeconds } from "@/lib/time";
import { HeartIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useRecoilState } from "recoil";

function Song({ track, order }) {
  const spotifyApi = useSpotify();
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [hover, setHover] = useState(false);

  // console.log(track);

  // sync player with a nearby Spotify Device - need a premius account register
  const playSong = () => {
    setCurrentTrackId(track.track.id);
    setIsPlaying(true);
    spotifyApi.play({ uris: [track.track.uri] })
  }

  return (
    <div
      className="grid grid-cols-2 text-neutral-400 py-4 px-5 hover:bg-gray-600 rounded-lg"
      // onClick={playSong}  // play or pause song
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >

      <div className="flex items-center space-x-4" >
        {hover ?
          <PlayIcon className="w-5 h-5 cursor-pointer" /> : <p className="w-5 h-5">{order + 1}</p>}

        <img
          className="w-10 h-10"
          src={track.track.album.images[0].url}
          alt="album-picture" />

        <div>
          <p className="w-36 hover:cursor-pointer hover:underline lg:w-64 truncate text-white">{track.track.name}</p>
          <p className="w-40 hover:cursor-pointer hover:underline hover:text-white">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hover:cursor-pointer hover:underline hover:text-white hidden md:inline w-64 truncate">{track.track.album.name}</p>
        {hover && <HeartIcon  className="w-5 h-5" />}
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song