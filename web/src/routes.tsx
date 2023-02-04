import { Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { GameAds } from './pages/GameAds';
import { PageNotFound } from "./pages/PageNotFound";

export function MainRoutes() {
    return (
        <Routes>
            <Route path="/" >
                <Route index element={<Home />} />
                <Route path="games/:gameId/:gameTitle/ads" element={<GameAds />} />
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    )
}