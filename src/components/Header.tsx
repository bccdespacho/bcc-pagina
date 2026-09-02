import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const servicioLinks = [
  { path: '/servicios', label: 'Todos los Servicios', hub: true },
  { path: '/servicios/contratos-civiles', label: 'Contratos Civiles', hub: false },
  { path: '/servicios/propiedad-bienes', label: 'Propiedad y Bienes', hub: false },
  { path: '/servicios/sucesiones-herencias', label: 'Sucesiones y Herencias', hub: false },
  { path: '/servicios/derecho-familia', label: 'Derecho de Familia', hub: false },
  { path: '/servicios/amparos', label: 'Juicio de Amparo', hub: false },
];

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname === path;
  const isServicioActive = servicioLinks.some(s => location.pathname === s.path);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServiciosOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/acerca', label: 'Acerca de Nosotros' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/BCC-Logo_h.png"
              alt="BCC Despacho Jurídico"
              className="h-12 md:h-16 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors relative ${isActive(link.path)
                  ? 'text-brand-red'
                  : 'text-gray-700 hover:text-brand-red'
                  }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-red" />
                )}
              </Link>
            ))}

            {/* Servicios dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setServiciosOpen(!serviciosOpen)}
                className={`flex items-center gap-1 font-medium transition-colors ${isServicioActive ? 'text-brand-red' : 'text-gray-700 hover:text-brand-red'
                  }`}
              >
                Servicios
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${serviciosOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {serviciosOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {servicioLinks.map((s, i) => (
                    <>
                      {i === 1 && (
                        <div key="divider" className="mx-3 my-1.5 border-t border-gray-100" />
                      )}
                      <Link
                        key={s.path}
                        to={s.path}
                        onClick={() => setServiciosOpen(false)}
                        className={`block px-5 py-2.5 text-sm transition-colors ${s.hub
                            ? 'font-semibold text-brand-red hover:bg-red-50'
                            : `font-medium ${isActive(s.path)
                              ? 'text-brand-red bg-red-50'
                              : 'text-gray-700 hover:text-brand-red hover:bg-gray-50'
                            }`
                          }`}
                      >
                        {s.label}
                      </Link>
                    </>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/contacto"
              className="px-6 py-2.5 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Contáctanos
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-brand-red transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-1 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 px-4 rounded-lg font-medium transition-colors ${isActive(link.path)
                  ? 'bg-brand-red text-white'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="px-4 pt-2 pb-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Servicios</p>
            </div>
            {servicioLinks.map((s) => (
              <Link
                key={s.path}
                to={s.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 px-6 rounded-lg text-sm font-medium transition-colors ${isActive(s.path)
                  ? 'bg-brand-red/10 text-brand-red'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {s.label}
              </Link>
            ))}

            <Link
              to="/contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-4 rounded-lg font-medium bg-brand-red text-white hover:bg-red-700 transition-colors mt-2"
            >
              Contáctanos
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
