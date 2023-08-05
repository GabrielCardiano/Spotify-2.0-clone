/* eslint-disable @next/next/no-img-element */
import { currentTrackIdState, isPlayingState } from "@/atoms/songAtoms";
import useSongInfo from "@/hooks/useSongInfo";
import useSpotify from "@/hooks/useSpotify";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50)

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack()
        .then(data => {
          console.log('Now playing: ' + data.body?.item);
          set(data.body?.item?.id);

          spotifyApi.getMyCurrentPlaybackState()
            .then((data) => setIsPlaying(data.body?.is_playing))
        });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  useEffect

  return (
    <div className="">
      <div>
        <img
          className="hidden md:inline h-10 w-10"
          src={songInfo?.album.images?.[0]?.url}
          alt="album-picture" />
      </div>
    </div>
  )
}

export default Player