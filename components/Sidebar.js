import {
  HomeIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  HeartIcon,
  RssIcon,
  PlusCircleIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline'
import Spotify from 'next-auth/providers/spotify';
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import SpotifyIcon from './SpotifyIcon';

function Sidebar() {
  const { data: session } = useSession();
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    async function saveToken() {
      if (session && session.accessToken) {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          }
        });

        const data = await response.json();
        setPlaylist(data.items);
      };
    };
    saveToken();

  }, [session]);

  return (
    <div
      className="w-64 h-screen text-neutral-400 grow-0 shrink-0
       overflow-y-scroll border-r border-neutral-800 flex flex-col p-5 space-y-4 text-sm">
      <div className='mt-1 mb-5'>
        <SpotifyIcon />
      </div>
      <button
        className='flex items-center space-x-2 hover:text-white'
      // onClick={() => signOut()}
      >
        <ArrowLeftOnRectangleIcon className="w-5 h-5" />

        <p>Logout</p>
      </button>

      <button className='flex items-center space-x-2 hover:text-white'>
        <HomeIcon className="w-5 h-5" />
        <p>Home</p>
      </button>

      <button className='flex items-center space-x-2 hover:text-white'>
        <MagnifyingGlassIcon className="w-5 h-5" />
        <p>Search</p>
      </button>

      <button className='flex items-center space-x-2 hover:text-white'>
        <BuildingLibraryIcon className="w-5 h-5" />
        <p>Your Library</p>
      </button>

      <hr className='border-t-[1px] border-gray-900' />

      <button className='flex items-center space-x-2 hover:text-white'>
        <PlusCircleIcon className="w-5 h-5" />
        <p>Create Playlist</p>
      </button>

      <button className='flex items-center space-x-2 hover:text-white'>
        <HeartIcon className="w-5 h-5" />
        <p>Liked songs</p>
      </button>

      <button className='flex items-center space-x-2 hover:text-white'>
        <RssIcon className="w-5 h-5" />
        <p>Your episodes</p>
      </button>
      <hr className='border-t-[1px] border-gray-900' />

      {
        playlist.map((pl) => (
          <p key={pl.id} className='cursor-pointer hover:text-white'>{pl.name}</p>
        ))
      }
    </div>
  )
}

export default Sidebar