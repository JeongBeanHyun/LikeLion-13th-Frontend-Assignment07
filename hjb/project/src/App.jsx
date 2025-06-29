import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import DailyBoxOffice from "./components/DailyBoxOffice";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">박스오피스</Link>
          </li>
          <li>
            <Link to="/search">영화 검색</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<DailyBoxOffice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
