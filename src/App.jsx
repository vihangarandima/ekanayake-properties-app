import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import PropertyPage from "./components/PropertyPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* The Home Page (Search) */}
        <Route path="/" element={<SearchPage />} />

        {/* The Details Page (Property) */}
        <Route path="/property/:id" element={<PropertyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
