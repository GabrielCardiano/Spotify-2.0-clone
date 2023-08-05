/* eslint-disable @next/next/no-img-element */
import useSpotify from "@/hooks/useSpotify";
import { millisToMinutesAndSeconds } from "@/lib/time";

function Song({ track, order }) {
  const spotifyApi = useSpotify();

  console.log(track);

  return (
    <div className="grid grid-cols-2 text-neutral-400 py-4 px-5 hover:bg-gray-900 rounded-lg">
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>

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
        <p className="hover:cursor-pointer hover:underline hover:text-white hidden md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song