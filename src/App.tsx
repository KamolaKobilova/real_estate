import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Components/signup/SignUp";
import SignIn from "./Components/signin/AuthSignIn";
import HomePage from "./Components/HomePage/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
