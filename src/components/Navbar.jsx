import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./AuthContext";

export default function Navbar() {
  const authUser = useContext(AuthContext);
  const { logout } = useContext(AuthContext);

  function handleLogout() {
    logout();
  }

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

        {authUser.auth.username ? (
          <div className="flex items-center">
            <h3 className="text-gray-300 hover:text-white mx-2">
              {authUser.auth.username}
            </h3>
            <button
              className="text-gray-300 hover:text-white mx-2"
              onClick={() => handleLogout()}
            >
              Sign Out<output></output>
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <Link
              to={"/log-in"}
              className="text-gray-300 hover:text-white mx-2"
            >
              Log In
            </Link>
            <Link
              to={"/sign-up"}
              className="text-gray-300 hover:text-white mx-2"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
