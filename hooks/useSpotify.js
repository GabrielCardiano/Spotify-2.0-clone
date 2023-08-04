import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
});

function useSpotify() {
  const { data: session, status } = useSession();
  // console.log(session);

  useEffect(() => {
    if (session) {
      // If refresh access token attemt fails, redirect user to login page
      if (session.error === 'RefreshAccessTokenError') {
        signIn();
      }
      spotifyApi.setAccessToken(session.accessToken);
    }
  }, [session])

  return spotifyApi;
}

export default useSpotify