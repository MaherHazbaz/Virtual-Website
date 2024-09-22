import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AnimeLoader from "./Components/AnimeLoader";

// Lazy load components
const Home = lazy(() => import("./Pages/Home"));
const DatePlam = lazy(() => import("./Pages/DatePlam"));
const FernGrass = lazy(() => import("./Pages/FernGrass"));
const Chirpine = lazy(() => import("./Pages/Chirpine"));
const AloeVera = lazy(() => import("./Pages/Aloevera"));
const Neem = lazy(() => import("./Pages/Neem"));
const Lupine = lazy(() => import("./Pages/Lupine"));
const Rosemary = lazy(() => import("./Pages/Rosemary"));
const Lavender = lazy(() => import("./Pages/Lavender"));
const Basil = lazy(() => import("./Pages/Basil"));
const Thyme = lazy(() => import("./Pages/Thyme"));
const Echinacea = lazy(() => import("./Pages/Echinacea"));
const Dandelion = lazy(() => import("./Pages/Dandelion"));

const App = () => {
  return (
    <Suspense fallback={<AnimeLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/datepalm" element={<DatePlam />} />
        <Route path="/ferngrass" element={<FernGrass />} />
        <Route path="/chirpine" element={<Chirpine />} />
        <Route path="/aloevera" element={<AloeVera />} />
        <Route path="/neem" element={<Neem />} />
        <Route path="/lupine" element={<Lupine />} />
        <Route path="/rosemary" element={<Rosemary />} />
        <Route path="/lavender" element={<Lavender />} />
        <Route path="/basil" element={<Basil />} />
        <Route path="/thyme" element={<Thyme />} />
        <Route path="/echinacea" element={<Echinacea />} />
        <Route path="/dandelion" element={<Dandelion />} />
      </Routes>
    </Suspense>
  );
};

export default App;
