import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/home";
import Show from "./pages/show";
import ShowRequests from "./pages/showRequests";
import NewCampaign from "./pages/newCampaign";
import NewRequest from "./pages/newRequest";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/campaigns/new" element={<NewCampaign />} />
          <Route exact path="/campaigns/:address" element={<Show />} />
          <Route exact path="/campaigns/:address/requests" element={<ShowRequests />} />
          <Route exact path="/campaigns/:address/requests/new" element={<NewRequest />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
