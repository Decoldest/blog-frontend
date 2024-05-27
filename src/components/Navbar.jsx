import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-lg font-bold">
          <img
            src="path-to-your-logo.png"
            alt="Logo"
            className="h-8 inline-block mr-2"
          />
          Home
        </a>
        <div>
          <Link to={"/log-in"} className="text-gray-300 hover:text-white mx-2">
            Log In
          </Link>
          <Link to={"/sign-up"} className="text-gray-300 hover:text-white mx-2">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}
