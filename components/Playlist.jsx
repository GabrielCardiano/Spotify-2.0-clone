import { playlistState } from "@/atoms/playlistAtoms";
import { useRecoilValue } from "recoil";
import Song from "./Song";

function Playlist() {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="flex flex-col px-8 space-y-1 pb-28">
      {playlist?.tracks?.items?.map((track, index) => (
        <Song key = {track.track.id} track={track} order={index} />
    ))}
    </div>
  )
}

export default Playlist;