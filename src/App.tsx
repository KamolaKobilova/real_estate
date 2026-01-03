import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./Components/signup/SignUp";
import SignIn from "./Components/signin/AuthSignIn";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
