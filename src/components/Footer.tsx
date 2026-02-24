import { MessageCircle, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6">
            <div>
              <div className="mb-6">
                <img
                  src="/BCC-Logo_h_copy.png"
                  alt="BCC Despacho Jurídico"
                  className="h-16 md:h-20 w-auto"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-1">Dirección</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Paseo de Navacoyan 100<br />
                  Lomas del Parque<br />
                  34100 Durango, Dgo.
                </p>
              </div>

              <div>
                <p className="font-semibold mb-1">Teléfono</p>
                <a href="tel:+526181492511" className="text-gray-300 hover:text-brand-red transition-colors text-sm">
                  618 149 2511
                </a>
              </div>

              <div className="pt-2">
                <p className="font-semibold mb-3">Síguenos</p>
                <div className="flex gap-4">
                  <a
                    href="https://wa.me/526181492511"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-brand-red flex items-center justify-center transition-colors duration-300 group"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://www.facebook.com/bccdespacho"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-brand-red flex items-center justify-center transition-colors duration-300 group"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://www.instagram.com/bcc_despacho_juridico/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-brand-red flex items-center justify-center transition-colors duration-300 group"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
                  </a>
                  <a
                    href="https://www.pinterest.com/bccdespachodgo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-800 hover:bg-brand-red flex items-center justify-center transition-colors duration-300 group"
                    aria-label="Pinterest"
                  >
                    <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.182-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .858-.545 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.525-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="h-64 md:h-80 lg:h-full min-h-[300px] rounded-lg overflow-hidden shadow-xl border-2 border-gray-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3617.8!2d-104.65!3d24.02!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x869bb7e6c6e6c6c6%3A0x6c6c6c6c6c6c6c6c!2sPaseo%20de%20Navacoyan%20100%2C%20Lomas%20del%20Parque%2C%2034100%20Durango%2C%20Dgo.!5e0!3m2!1ses!2smx!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación BCC Despacho Jurídico"
            ></iframe>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} BCC Despacho Jurídico. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
