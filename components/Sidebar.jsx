import { displayState } from '@/atoms/displayAtoms';
import { playlistIdState } from '@/atoms/playlistAtoms';
import useSpotify from '@/hooks/useSpotify';
import {
  ArrowLeftOnRectangleIcon,
  BuildingLibraryIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
  RssIcon,
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import SpotifyIcon from './SpotifyIcon';

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistID, setPLaylistID] = useRecoilState(playlistIdState);
  const [display, setDisplay] = useRecoilState(displayState);

  const router = useRouter();

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists()
        .then((data) => setPlaylists(data.body.items))
    }
  }, [session, spotifyApi])

  return (
    <div
      className="bg-card m-2 rounded-lg flex-col  text-neutral-400 p-5 grow-0 text-xs lg:w-96 lg:text-sm  overflow-y-scroll scrollbar-hide 
      border-r border-neutral-800 sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex space-y-4 ">
      <div className='mt-1 mb-5'>
        <SpotifyIcon />
      </div>
      <button
        className='flex items-center space-x-2 hover:text-white'
        onClick={() => {
          localStorage.clear(); // middleware not working, wip data and redirect manually;
          router.push('/login');
        }}
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
        ${display === 'search' && 'text-white'}`}
        onClick={() => setDisplay('search')}
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
        <p>Search</p>
      </button>

      <button
        className={`flex items-center space-x-2 hover:text-white 
        ${display === 'library' && 'text-white'}`}
        onClick={() => setDisplay('library')}
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

      <section className="space-y-4 overflow-y-scroll scrollbar-hide">
        {playlists?.map((playlist) => (
          <p
            key={playlist.id}
            className='cursor-pointer hover:text-white lg:w-52 truncate'
            onClick={() => {
              setDisplay('playlist')
              setPLaylistID(playlist.id);
            }}
          >{playlist.name}
          </p>
        ))}
      </section>
    </div>
  )
}

export default Sidebar