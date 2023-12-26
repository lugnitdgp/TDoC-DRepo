// import { ConnectWallet } from "@thirdweb-dev/react";
import Home from "./pages/Home/Home";
import ProfilePage from './pages/ProfilePage/ProfilePage'
import Repo from './pages/Repo/Repo'
import Commit from './pages/Commit/Commit'
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:profileName" element={<ProfilePage />} />
          <Route path="/:profileName/:repoName" element={<Repo />} />
          <Route path="/:profileName/:repoName/commit" element={<Commit />} />
      </Routes>
    </Router>
  );
}

export default App;
