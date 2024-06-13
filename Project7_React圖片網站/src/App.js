import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Page404 from "./pages/Page404";
import "./styles/style.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          /*首頁，要將底下的Route包裝起來 */
          <Route index element={<Homepage />}></Route>/*視為index/ */
          <Route path="about" element={<About />}></Route>
          /*在path底下about視為/about */
          <Route path="*" element={<Page404 />}></Route> /*表其他無效網址*/
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
