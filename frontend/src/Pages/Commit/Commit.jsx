import React, { useEffect, useState } from "react";
import Navbar from "../../Components/NavBar/Navbar";
import { useParams } from "react-router-dom";
import "./Commit.scss";

const commitData = [
  { id: 1, message: "Initial commit", author: "John Doe", date: "2023-01-01" },
  { id: 2, message: "Add feature X", author: "Jane Doe", date: "2023-01-05" },
  { id: 3, message: "Add feature X", author: "Jane Doe", date: "2023-01-05" },
  { id: 4, message: "Add feature X", author: "Jane Doe", date: "2023-01-05" },
  { id: 5, message: "Add feature X", author: "Jane Doe", date: "2023-01-05" },
  { id: 6, message: "Add feature X", author: "Jane Doe", date: "2023-01-05" },
  { id: 7, message: "Add feature X", author: "Jane Doe", date: "2023-01-05" },
  // Add more commit data as needed
];

const Commit = () => {
  const [commits, setCommits] = useState([]);
  const { profilename, reponame } = useParams();

  return (
    <div className="commit-history">
      <Navbar />
      <div className="commit-history-page">
        <h1>Commits</h1>
        <ul>
          {commitData.map((commit) => (
            <li key={commit.id} className="border-b border-gray-200 py-4">
              <div className="flex items-center mb-2">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-600 text-sm">{commit.date}</span>
              </div>
              <p className="text-lg font-semibold mb-1">{commit.message}</p>
              <p className="text-sm text-gray-700">Author: {commit.author}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Commit;
