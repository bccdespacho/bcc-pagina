import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/acerca" element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
