import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LecturePage from "./Lecture";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/:lectureId" element={<LecturePage />} />
      </Routes>
    </Router>
  );
}

export default App;
