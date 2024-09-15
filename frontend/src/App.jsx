import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Authentication from "./pages/Authentication.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import VideoMeetComponent from "./pages/VideoMeet.jsx";
import HomeComponent from "./pages/Homee.jsx";
import History from "./pages/History.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/homee" element={<HomeComponent />} />
          <Route path ="/history" element={<History />} />
          <Route path="/:url" element = {<VideoMeetComponent />} /> 
        </Routes>
        </AuthProvider>
      </BrowserRouter> 
    </div>
  );
}

export default App;
