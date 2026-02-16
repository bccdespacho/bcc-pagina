import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/acerca', label: 'Acerca de Nosotros' },
    { path: '/contacto', label: 'Contáctanos' },
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
            {navLinks.map((link) => {
              const isContacto = link.path === '/contacto';

              if (isContacto) {
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="px-6 py-2.5 bg-brand-red text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    {link.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium transition-colors relative ${
                    isActive(link.path)
                      ? 'text-brand-red'
                      : 'text-gray-700 hover:text-brand-red'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-red"></span>
                  )}
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-brand-red transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 space-y-3 animate-fade-in">
            {navLinks.map((link) => {
              const isContacto = link.path === '/contacto';

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-2 px-4 rounded-lg font-medium transition-colors ${
                    isContacto
                      ? 'bg-brand-red text-white hover:bg-red-700'
                      : isActive(link.path)
                      ? 'bg-brand-red text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
}
