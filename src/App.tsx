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
