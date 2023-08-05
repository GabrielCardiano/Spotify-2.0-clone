/* eslint-disable @next/next/no-img-element */
import { currentTrackIdState, isPlayingState } from "@/atoms/songAtoms";
import useSpotify from "@/hooks/useSpotify";
import { millisToMinutesAndSeconds } from "@/lib/time";
import { useRecoilState } from "recoil";

function Song({ track, order }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

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
    // onClick={playSong}
    >

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