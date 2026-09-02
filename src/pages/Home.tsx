import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';

const services = [
  {
    title: 'Contratos Civiles',
    description:
      'Redacción, revisión y litigio en contratos de compraventa, arrendamiento, comodato y mutuo.',
    href: '/servicios/contratos-civiles',
  },
  {
    title: 'Propiedad y Bienes',
    description:
      'Acciones reivindicatorias, prescripción adquisitiva, servidumbres e interdictos posesorios.',
    href: '/servicios/propiedad-bienes',
  },
  {
    title: 'Sucesiones y Herencias',
    description:
      'Tramitación de herencias testamentarias e intestamentarias, y partición de bienes.',
    href: '/servicios/sucesiones-herencias',
  },
  {
    title: 'Derecho de Familia',
    description:
      'Divorcios, custodia de menores, pensiones alimenticias y trámites de estado civil.',
    href: '/servicios/derecho-familia',
  },
  {
    title: 'Juicio de Amparo',
    description:
      'Amparos directos e indirectos contra actos de autoridad, con suspensión del acto reclamado.',
    href: '/servicios/amparos',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
};

export default function Home() {
  return (
    <PageWrapper>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-red-50 opacity-60" />

        <div className="relative">
          {/* Hero */}
          <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 md:gap-14 items-center">

              {/* Texto — izquierda */}
              <div className="text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
                >
                  Despacho Jurídico en{' '}
                  <span className="text-brand-red">Durango</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
                  className="text-xl md:text-2xl text-gray-700 font-semibold mb-4"
                >
                  Los mejores abogados en Durango
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
                  className="text-base md:text-lg text-gray-600 leading-relaxed mb-10"
                >
                  Con más de 15 años de experiencia, BCC Despacho Jurídico es su aliado legal de
                  confianza en Durango. Ofrecemos soluciones integrales en derecho civil, familiar,
                  mercantil y penal con el más alto nivel de profesionalismo, ética y compromiso.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Link to="/contacto" className="btn-primary w-full sm:w-auto">
                    <span className="font-semibold">Agenda tu Consulta</span>
                  </Link>
                  <a
                    href="https://wa.me/5216181492511"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full sm:w-auto"
                  >
                    <span className="font-semibold">618 149 2511</span>
                  </a>
                </motion.div>
              </div>

              {/* Imagen cuadrada — derecha */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                className="w-full aspect-square rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src="/bcc-equipo.jpg"
                  alt="Equipo de BCC Despacho Jurídico en Durango"
                  className="w-full h-full object-cover"
                />
              </motion.div>

            </div>
          </section>


          {/* Services */}
          <section className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                  Nuestros Servicios Legales
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Ofrecemos servicios jurídicos especializados para proteger sus derechos e
                  intereses legales.
                </p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
              >
                {services.map((service, i) => (
                  <motion.div
                    key={service.href}
                    variants={cardVariants}
                    className={
                      services.length % 2 === 1 && i === services.length - 1
                        ? 'md:col-span-2'
                        : undefined
                    }
                  >
                    <Link
                      to={service.href}
                      className="block service-card group h-full hover:border-brand-red border-2 border-transparent rounded-2xl transition-all duration-300"
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-red transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{service.description}</p>
                      <span className="inline-block mt-4 text-brand-red text-sm font-semibold group-hover:underline">
                        Ver más →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Municipios / Cobertura */}
          <section className="bg-gray-50 py-16 md:py-24 border-t border-gray-100">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                  Nuestra Cobertura en Durango
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Además de nuestra sede principal en la capital, contamos con presencia en otros municipios para brindarle asesoría legal más cerca de usted.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <Link
                    to="/municipios/nuevo-ideal"
                    className="block group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:border-brand-red/30 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center flex-shrink-0 text-brand-red mb-4 md:mb-0">
                        <span className="text-2xl">🏢</span>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-brand-red transition-colors">
                          Nuevo Ideal, Durango
                        </h3>
                        <p className="text-gray-600 mb-3">
                          Asesoría Jurídica e Inmobiliaria BCC. Servicios civiles, familiares e inmobiliarios en la Zona Centro.
                        </p>
                        <span className="inline-block text-brand-red font-semibold text-sm group-hover:underline">
                          Conocer más detalles de esta oficina →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">¿Necesita Asesoría Legal?</h2>
                <p className="text-lg md:text-xl text-gray-300 mb-10">
                  Nuestro equipo de abogados expertos está listo para ayudarle. Agende su consulta
                  hoy mismo y proteja sus derechos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/5216181492511"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <span className="font-semibold">WhatsApp</span>
                  </a>
                  <a
                    href="tel:+526181492511"
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-900 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <span className="font-semibold">Llamar Ahora</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}
