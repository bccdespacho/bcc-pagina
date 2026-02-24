import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

export default function Contact() {
  return (
    <PageWrapper>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-red-50 opacity-60" />

        <div className="relative">
          <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="text-center mb-12 md:mb-16"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Contáctanos</h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                  Estamos aquí para ayudarle. Comuníquese directamente con nosotros para agendar
                  su consulta legal.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                className="space-y-6"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                    Información de Contacto
                  </h2>

                  <div className="space-y-5">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                      <p className="text-gray-600">
                        Paseo de Navacoyan 100
                        <br />
                        Lomas del Parque
                        <br />
                        34100 Durango, Dgo.
                      </p>
                    </div>

                    <div className="border-t border-gray-100 pt-5">
                      <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                      <a
                        href="tel:+526181492511"
                        className="text-gray-600 hover:text-brand-red transition-colors"
                      >
                        618 149 2511
                      </a>
                    </div>

                    <div className="border-t border-gray-100 pt-5">
                      <h3 className="font-semibold text-gray-900 mb-1">Horario de Atención</h3>
                      <p className="text-gray-600">
                        Lunes a Viernes: 9:00 AM – 7:00 PM
                        <br />
                        Sábado: 9:00 AM – 2:00 PM
                        <br />
                        Domingo: Cerrado
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contacto Directo</h3>
                  <div className="space-y-3">
                    <a
                      href="https://wa.me/5216181492511"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full"
                    >
                      <span className="font-semibold">WhatsApp</span>
                    </a>
                    <a href="tel:+526181492511" className="btn-secondary w-full">
                      <span className="font-semibold">Llamar Ahora</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}
