import { colors } from '@/lib/colors';
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { shuffle } from 'lodash';
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function PlaylistView({ globalPlayListID }) {
  const { data: session } = useSession();
  const [playlistData, setPlaylistData] = useState([]);
  const [color, setColor] = useState(colors[0]);

  // console.log(playlistData);


  const API_URL = `https://api.spotify.com/v1/playlists/${globalPlayListID}`;

  useEffect(() => {
    async function fetchPlaylist() {
      if (session && session.accessToken) {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          }
        });
        const data = await response.json();
        setPlaylistData(data);
      }
    }
    fetchPlaylist();
  }, [session, API_URL]);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [globalPlayListID]);

  return (
    <div className="flex-grow h-screen">
      <header className="text-white sticky top-0 h-20 z-10 text-4xl bg-neutral-800 p-8 flex items-center font-bold">
        <div>{playlistData?.name}</div>
      </header>

      <div className="absolute z-20 top-5 right-8 flex items-center bg-black bg-opacity-70 text-white space-x-3 opacity-90 hover:opacity-80 cursor pointer rounded-full p-1 pr-2">
        <img
          src={session?.user.image}
          alt="profile-picture"
          className='rounded-full w-7 h-7' />

        <p className="text-sm">Logout</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      <div className="relative -top-20 h-screen overflow-y-scroll bg-neutral-900">
        <section className={`flex items-end space-x-7 bg-gradient-to-b to-neutral-900 ${color} h-80 text-white p-8`}>
          {/* {playlistData && <img className="h-44 w-44" src={playlistData.images[0].url} />} */}
          <div>
            <p className="text-sm font-bold">Playlist</p>
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold">{playlistData?.name}</h1>
          </div>
        </section>

        <div className='text-white px-8 flex flex-col space-y-1 pb-28'>
          {playlistData?.tracks.items.map((track, index) => {
            return (
              <div key={track.track.id}>
                <p>{track.track.name}</p>
              </div>
            )
          }
          )}
        </div>
      </div>
    </div>
  )
}

export default PlaylistView;