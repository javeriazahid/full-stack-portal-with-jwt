import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen flex items-center justify-center bg-black overflow-hidden font-sans">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40 z-0"
      >
        <source src="https://videos.pexels.com/video-files/7055339/7055339-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="z-10 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-amber-200 drop-shadow-md tracking-normal">
          Welcome to TEU Registration Portal
        </h1>
        <p className="text-xl md:text-2xl mt-4 text-yellow-100 drop-shadow-sm">
          Shaping Minds, Building Futures
        </p>

        <button
          onClick={() => navigate("/register")}
          className="mt-8 px-8 py-3 bg-blue-500 hover:bg-indigo-600 text-white rounded-2xl shadow-lg text-lg transition duration-300 ease-in-out"
        >
          Click for Registration
        </button>
      </div>
    </div>
  );
}
