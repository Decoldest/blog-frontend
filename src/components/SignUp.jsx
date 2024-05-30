import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    postSignUp("https://blog-api-ryanwong.fly.dev/sign-up", {
      username,
      password,
    }).then((response) => {
      handleSignUpResponse(response);
    });
  };

  async function postSignUp(
    url = "https://blog-api-ryanwong.fly.dev/sign-up",
    data,
  ) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }
  function handleSignUpResponse(response) {
    if (response.info && response.info.message) {
      setError(response.info.message);
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (error) {
                  setError(null);
                }
              }}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) {
                  setError(null);
                }
              }}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
