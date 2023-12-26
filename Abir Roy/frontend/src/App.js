import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import Repo from './Pages/Repo/Repo';
import Commit from './Pages/Commit/Commit';

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
  )
}

export default App;