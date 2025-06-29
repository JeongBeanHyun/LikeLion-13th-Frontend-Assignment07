import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DailyBoxOffice from "./components/DailyBoxOffice";
import Movie from "./components/Movie";
import GlobalStyle from "./GlobalStyle";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      {/* <nav>
        <ul>
          <li>
            <Link to="/">박스오피스</Link>
          </li>
          <li>
            <Link to="/search">영화 검색</Link>
          </li>
        </ul>
      </nav> */}

      <Routes>
        <Route path="/" element={<DailyBoxOffice />} />
        <Route path="/search" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
