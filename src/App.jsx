import "./App.css";
import PostList from "./components/PostsList";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import PostDetail from "./components/PostDetail";

export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<PostList />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
