/* eslint-disable @next/next/no-img-element */
import { colorsArray } from "@/lib/colors";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { shuffle } from "lodash";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Center() {
  const { data: session } = useSession();
  const [color, setColor] = useState(null)

  useEffect(() => {
    setColor(shuffle(colorsArray).pop());
  }, []);

  return (
    <div className="flex-grow">

      <header className="absolute top-5 right-8">
        <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
          <img
            src={session?.user.image}
            alt="profile-picture"
            className="rounded-full w-10 h-10" />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
        {/* <img src={} alt=""/> */}
        <h1>show me</h1>
      </section>


    </div>
  )
}

export default Center