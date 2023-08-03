import {
  ArrowLeftOnRectangleIcon,
  BuildingLibraryIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  RssIcon,
} from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import SpotifyIcon from './SpotifyIcon';

function Sidebar({ view, setView, setGlobalPlayListID }) {
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);

  return (
    <div
      className="w-64 h-screen text-neutral-400 grow-0 shrink-0
       overflow-y-scroll scrollbar-hide border-r border-neutral-800 flex flex-col p-5 space-y-4 text-sm hidden md:inline-flex">
      <div className='mt-1 mb-5'>
        <SpotifyIcon />
      </div>
      <button
        className='flex items-center space-x-2 hover:text-white'
        onClick={ () => signOut()}
      >
        <ArrowLeftOnRectangleIcon className="w-5 h-5" />

        <p>Logout</p>
      </button>

      <button className='flex items-center space-x-2 hover:text-white'>
        <HomeIcon className="w-5 h-5" />
        <p>Home</p>
      </button>

      <button
        className={`flex items-center space-x-2 hover:text-white 
        ${view === 'search' ? 'text-white' : null}`}
        onClick={() => setView('search')}
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
        <p>Search</p>
      </button>

      <button
        className={`flex items-center space-x-2 hover:text-white 
        ${view === 'library' ? 'text-white' : null}`}
        onClick={() => setView('library')}
      >
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

      <div>PLaylist name...</div>
      <div>PLaylist name...</div>
      <div>PLaylist name...</div>
      <div>PLaylist name...</div>
      <div>PLaylist name...</div>
      <div>PLaylist name...</div>
      <div>PLaylist name...</div>

      {/* {
        playlists?.map((playlist) => (
          <p
            key={playlist.id}
            className='cursor-pointer hover:text-white w-52'
            onClick={() => {
              setView('playlist');
              setGlobalPlayListID(playlist.id)
            }}
          >{playlist.name}
          </p>
        ))
      } */}
    </div>
  )
}

export default Sidebar