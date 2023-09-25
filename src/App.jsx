import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Movies from "./pages/movies/Movies";
import Shows from "./pages/shows/Shows";
import Search from "./pages/Search";
import MovieDetails from "./pages/movies/MovieDetails";
import TvDetails from "./pages/shows/TvDetails";
import AuthProvider from "./context/useAuth";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Layout>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/movies" element={<Movies />} />
						<Route path="/shows" element={<Shows />} />
						<Route path="/search" element={<Search />} />
						<Route path="/movie/:id" element={<MovieDetails />} />
						<Route path="/tv/:id" element={<TvDetails />} />
					</Routes>
				</Layout>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
