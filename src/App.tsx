import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Servicios from './pages/Servicios';
import ContratosCiviles from './pages/servicios/ContratosCiviles';
import PropiedadBienes from './pages/servicios/PropiedadBienes';
import SucesionesHerencias from './pages/servicios/SucesionesHerencias';
import DerechoFamilia from './pages/servicios/DerechoFamilia';
import Amparos from './pages/servicios/Amparos';
import NuevoIdeal from './pages/municipios/NuevoIdeal';
import ContratosCivilesNI from './pages/municipios/servicios/ContratosCivilesNI';
import PropiedadBienesNI from './pages/municipios/servicios/PropiedadBienesNI';
import SucesionesHerenciasNI from './pages/municipios/servicios/SucesionesHerenciasNI';
import DerechoFamiliaNI from './pages/municipios/servicios/DerechoFamiliaNI';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/acerca" element={<About />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/servicios/contratos-civiles" element={<ContratosCiviles />} />
        <Route path="/servicios/propiedad-bienes" element={<PropiedadBienes />} />
        <Route path="/servicios/sucesiones-herencias" element={<SucesionesHerencias />} />
        <Route path="/servicios/derecho-familia" element={<DerechoFamilia />} />
        <Route path="/servicios/amparos" element={<Amparos />} />
        <Route path="/municipios/nuevo-ideal" element={<NuevoIdeal />} />

        {/* Nuevo Ideal Servicios */}
        <Route path="/municipios/nuevo-ideal/servicios/contratos-civiles" element={<ContratosCivilesNI />} />
        <Route path="/municipios/nuevo-ideal/servicios/propiedad-bienes" element={<PropiedadBienesNI />} />
        <Route path="/municipios/nuevo-ideal/servicios/sucesiones-herencias" element={<SucesionesHerenciasNI />} />
        <Route path="/municipios/nuevo-ideal/servicios/derecho-familia" element={<DerechoFamiliaNI />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
