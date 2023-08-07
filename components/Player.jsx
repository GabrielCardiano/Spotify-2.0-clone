/* eslint-disable @next/next/no-img-element */
import { currentTrackIdState, isPlayingState } from "@/atoms/songAtoms";
import useSongInfo from "@/hooks/useSongInfo";
import useSpotify from "@/hooks/useSpotify";
import { ArrowPathRoundedSquareIcon, ArrowsRightLeftIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import { BackwardIcon, ForwardIcon, PauseCircleIcon, PlayCircleIcon, SpeakerWaveIcon } from "@heroicons/react/24/solid";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack()
        .then(data => {
          console.log('Now playing: ' + data.body?.item);
          setCurrentTrackId(data.body?.item?.id);

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

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState()
      .then((data) => {
        if (data.body.is_playing) {
          spotifyApi.pause();
          setIsPlaying(false);
        } else {
          spotifyApi.play();
          setIsPlaying(true);
        }
      })
  }

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(() => {
    debounce((volume) => {
      spotifyApi.setVolume(volume)
        .catch((err) => { })
    }, 500)
  }, [])

  const muteOrUnmuteVolume = () => {
    if (volume > 0) {
      return setVolume(0);
    }
    return setVolume(50);
  }

  return (
    <div className="h-24 bg-black text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">

      {/* <--------- Player left-grid -------->  */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-12 w-12"
          src={songInfo?.album.images?.[0]?.url}
          alt="album-picture"
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* <--------- Player center-grid -------->  */}
      <div className="flex items-center justify-evenly">
        <ArrowsRightLeftIcon className="button" />
        <BackwardIcon className="button"
        // onClick={() => spotifyApi.skipToPrevious() ---API not working}
        />
        {isPlaying ?
          <PauseCircleIcon onClick={handlePlayPause} className="button w-14 h-14" /> :
          <PlayCircleIcon onClick={handlePlayPause} className="button w-14 h-14" />}
        <ForwardIcon className="button"
        // onClick={() => spotifyApi.skipToNext() ---API not working}
        />
        <ArrowPathRoundedSquareIcon className="button" />
      </div>

      {/* <--------- Player right-grid -------->  */}
      <div className="flex items-center space-x-1 md:space-x-2 justify-end pr-2">
        <SpeakerXMarkIcon
          onClick={() => muteOrUnmuteVolume()}
          className="button"
        />
        <input
          id="volume__slider"
          className="w-14 md:w-28"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          type="range"
          min={0} max=
          {100} />
        <SpeakerWaveIcon className="button" />
      </div>
    </div>
  )
}

export default Player