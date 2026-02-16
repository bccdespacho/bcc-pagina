import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-red-50 opacity-60"></div>

      <div className="relative">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 md:mb-16 fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Contáctanos
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Estamos aquí para ayudarle. Comuníquese directamente con nosotros para agendar su consulta legal.
              </p>
            </div>

            <div className="space-y-6 fade-in">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Información de Contacto
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-brand-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                      <p className="text-gray-600">
                        Paseo de Navacoyan 100<br />
                        Lomas del Parque<br />
                        34100 Durango, Dgo.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-brand-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                      <a href="tel:+526181492511" className="text-gray-600 hover:text-brand-red transition-colors">
                        618 149 2511
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-red/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-brand-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Horario de Atención</h3>
                      <p className="text-gray-600">
                        Lunes a Viernes: 9:00 AM - 7:00 PM<br />
                        Sábado: 9:00 AM - 2:00 PM<br />
                        Domingo: Cerrado
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Contacto Directo
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://wa.me/5216181492511"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary group w-full"
                  >
                    <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                    <span className="font-semibold">WhatsApp</span>
                  </a>
                  <a
                    href="tel:+526181492511"
                    className="btn-secondary group w-full"
                  >
                    <Phone className="w-5 h-5 transition-transform group-hover:scale-110" />
                    <span className="font-semibold">Llamar Ahora</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
