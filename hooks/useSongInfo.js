import React, { useEffect, useState } from 'react'
import useSpotify from './useSpotify';
import { currentTrackIdState } from '@/atoms/songAtoms';
import { useRecoilState } from 'recoil';

function useSongInfo() {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [songInfo, setSongInfo] = useState(null);

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentTrackId) {
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`, {
                    headers: {
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                    }
                });
                const data = await trackInfo.json();
                console.log(data);
                setSongInfo(data);
            }
        }
        fetchSongInfo();
    }, [currentTrackId, spotifyApi ])
  
  return songInfo;
}

export default useSongInfo