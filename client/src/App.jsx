import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Layout from "./components/Layout/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostQuestion from "./pages/PostQuestion";
import Home from "./pages/Home";
import QuestionDetail from "./pages/QuestionDetail";
import HowItWorks from "./pages/HowItWorks";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public pages */}
        <Route
          path="/"
          element={!user ? <Landing /> : <Navigate to="/home" />}
        />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/home" />}
        />

        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/home" />}
        />

        <Route path="/how-it-works" element={<HowItWorks />} />

        {/* Protected pages */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* FIX: Add AskQuestion route */}
        <Route
          path="/AskQuestion"
          element={
            <ProtectedRoute>
              <PostQuestion />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post-question"
          element={
            <ProtectedRoute>
              <PostQuestion />
            </ProtectedRoute>
          }
        />

        <Route
          path="/questions/:id"
          element={
            <ProtectedRoute>
              <QuestionDetail />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
