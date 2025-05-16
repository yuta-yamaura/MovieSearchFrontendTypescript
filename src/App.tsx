import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieSearch } from "./components/organisms/MovieSearch/MovieSearch";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<MovieSearch />} />
          <Route path="/:year" element={<MovieSearch />} />
          <Route path="/:year/:query" element={<MovieSearch />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
