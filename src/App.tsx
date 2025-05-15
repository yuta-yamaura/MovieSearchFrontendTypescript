import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieSearch } from "./components/organisms/MovieSearch/MovieSearch";
import { MovieSearchYear } from "./components/organisms/MovieSearch/MovieSearchYear";
import { MovieSearchQuery } from "./components/organisms/MovieSearch/MovieSearchQuery";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<MovieSearch />} />
          <Route path="/:year" element={<MovieSearchYear />} />
          <Route path="/:year/:query" element={<MovieSearchQuery />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
