import { getProviders, signIn } from "next-auth/react";

function Login() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center bg-black min-h-screen w-full">
      <img className="w-52 h-52" src="https://i.imgur.com/fPuEa9V.png" alt="" />
      <button className="bg-[#18D860] text-white p-5 font-bold text-lg rounded-full"
        onClick={() => signIn('spotify', { callbackUrl: "/" })}
      >
        Login with Spotify
      </button>
    </div >
  )
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}