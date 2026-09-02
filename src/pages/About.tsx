import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';

// --- Data ---

const specialties = [
  {
    service: 'Contratos Civiles',
    who: 'Particulares y pequeñas empresas que necesitan formalizar acuerdos',
    href: '/servicios/contratos-civiles',
  },
  {
    service: 'Propiedad y Bienes Inmuebles',
    who: 'Compradores, vendedores y propietarios con asuntos de tierra o inmuebles',
    href: '/servicios/propiedad-bienes',
  },
  {
    service: 'Sucesiones y Herencias',
    who: 'Familias que necesitan gestionar el patrimonio de un familiar fallecido',
    href: '/servicios/sucesiones-herencias',
  },
  {
    service: 'Derecho de Familia',
    who: 'Parejas, padres y madres que enfrentan divorcios, custodias o pensiones',
    href: '/servicios/derecho-familia',
  },
  {
    service: 'Juicio de Amparo',
    who: 'Personas y empresas afectadas por una resolución o un acto de autoridad',
    href: '/servicios/amparos',
  },
];

const values = [
  {
    title: 'Confidencialidad absoluta',
    description: 'Lo que nos cuentes en consulta se queda entre nosotros. Siempre.',
  },
  {
    title: 'Respeto a tus tiempos',
    description:
      'Entendemos que tienes vida fuera de tu problema legal. Trabajamos con agilidad.',
  },
  {
    title: 'Honestidad aunque duela',
    description:
      'Si tu caso tiene pocas probabilidades de éxito, te lo decimos, y te ofrecemos alternativas.',
  },
  {
    title: 'Compromiso con el resultado',
    description: 'No firmamos y olvidamos. Tu caso nos importa de principio a fin.',
  },
];

const whyUs = [
  'Te atendemos sin rodeos desde el primer contacto',
  'Te explicamos tu situación jurídica en lenguaje claro',
  'Te presentamos un plan de acción concreto con costos y plazos reales',
  'Tienes acceso directo a tu abogado, no a intermediarios',
  'Nos encargamos de los trámites ante notarías, juzgados y registros en Durango',
  'Al finalizar tu proceso, recibes toda tu documentación organizada',
];

const faqs = [
  {
    q: '¿Dónde están ubicados BCC Despacho Jurídico?',
    a: 'Nos encontramos en Paseo de Navacoyan 100, Lomas del Parque, Durango, Dgo., C.P. 34100. Una zona bien conectada y accesible desde distintos puntos de la ciudad.',
  },
  {
    q: '¿Cómo puedo contactarlos?',
    a: 'Puedes llamarnos directamente al 618 149 2511, escribirnos por WhatsApp al mismo número, o llenar nuestro formulario de contacto en bccdespachojuridico.com. Respondemos en menos de 24 horas en días hábiles.',
  },
  {
    q: '¿Tienen experiencia con trámites ante el Registro Público de Durango?',
    a: 'Sí. Conocemos los requisitos y tiempos del Registro Público de la Propiedad del Estado de Durango, lo que nos permite gestionar tus trámites de manera eficiente y sin contratiempos.',
  },
  {
    q: '¿Atienden casos de municipios fuera de la ciudad de Durango?',
    a: 'Dependiendo del tipo de asunto, sí podemos atender casos en otros municipios del estado. Contáctanos para confirmar cobertura según tu situación específica.',
  },
  {
    q: '¿Cuánto cuesta la primera consulta?',
    a: 'Contáctanos directamente al 618 149 2511 para conocer las condiciones de la consulta inicial. Nuestro objetivo es que salgas con claridad sobre tu caso y lo que implica atenderlo.',
  },
  {
    q: '¿Trabajan con personas mayores o con poca experiencia en trámites legales?',
    a: 'Absolutamente. Una buena parte de nuestros clientes son adultos mayores o personas que nunca han tenido que lidiar con un proceso legal. Nos adaptamos a tu ritmo y nos aseguramos de que comprendas cada paso.',
  },
  {
    q: '¿Puedo confiar en que mi información estará protegida?',
    a: 'Sí. La confidencialidad es una obligación ética y legal para cualquier abogado en México, y en BCC la tomamos muy en serio. Tu información nunca se comparte sin tu autorización expresa.',
  },
  {
    q: '¿En qué se especializan principalmente?',
    a: 'Nos enfocamos en derecho civil y familiar: contratos civiles, propiedad y bienes, sucesiones y herencias, y derecho de familia. Son las áreas donde más podemos ayudarte con profundidad real.',
  },
];

const galleryImages = [
  {
    src: '/bcc-img-1.jpg',
    alt: 'Sala de juntas de BCC Despacho Jurídico en Paseo de Navacoyan, Durango',
    label: 'Sala de Juntas Ejecutiva',
    sub: 'Espacios diseñados para reuniones confidenciales y estratégicas',
  },
  {
    src: '/bcc-img-2.jpg',
    alt: 'Abogado de BCC Despacho Jurídico en consulta con cliente en Durango Dgo',
    label: 'Consulta con Cliente',
    sub: 'Atención personalizada en un ambiente de confianza',
  },
  {
    src: '/bcc-img-3.jpg',
    alt: 'Equipo de BCC Despacho Jurídico, especialistas en derecho civil y familiar en Durango México',
    label: 'Nuestro Equipo',
    sub: 'Especialistas en derecho civil y familiar',
  },
  {
    src: '/bcc-img-4.jpg',
    alt: 'Recepción de BCC Despacho Jurídico en Lomas del Parque, Durango',
    label: 'Recepción',
    sub: 'Atención personalizada desde el primer momento',
  },
];

// --- Variants ---

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0, 0, 0.2, 1] as [number, number, number, number] },
  },
};

// --- FAQ Accordion Item ---

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-4 flex items-center justify-between gap-4 group"
      >
        <span className="font-medium text-gray-900 group-hover:text-brand-red transition-colors">
          {q}
        </span>
        <span
          className={`text-brand-red text-xl font-light flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''
            }`}
        >
          +
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
        className="overflow-hidden"
      >
        <p className="pb-4 text-gray-600 leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}

// --- Page ---

export default function About() {
  return (
    <PageWrapper>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-red-50 opacity-60" />

        <div className="relative">
          <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">

              {/* ── H1: Hero ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                className="mb-16"
              >
                <p className="text-brand-red font-semibold uppercase tracking-widest text-sm mb-3">
                  Quiénes Somos
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  BCC Despacho Jurídico en Durango:{' '}
                  <span className="text-brand-red">Quiénes Somos y Por Qué Nos Importa Tu Caso</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  Hay algo que distingue a un buen abogado de uno excelente: no es solo cuánto
                  sabe de leyes, sino qué tan bien entiende a las personas que llegan a su puerta.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  En <strong className="text-gray-900">BCC Despacho Jurídico</strong>, llevamos
                  años resolviendo problemas legales reales para familias, parejas, propietarios y
                  emprendedores de Durango. Sabemos que detrás de cada expediente hay una historia
                 , un conflicto familiar, un patrimonio que proteger, un trámite que lleva meses
                  sin avanzar, y que lo que nuestros clientes más necesitan es un equipo que los
                  escuche, les explique con claridad y camine con ellos en cada paso del proceso.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Si estás buscando un despacho jurídico en Durango que te trate como persona y
                  no como número de caso, bienvenido. Aquí te contamos quiénes somos.
                </p>
              </motion.div>

              {/* ── H2: Origen ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100 mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
                  Un Despacho Nacido en{' '}
                  <span className="text-brand-red">Durango, para Durango</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  BCC Despacho Jurídico nació con una convicción simple: que los duranguenses
                  merecen acceso a asesoría legal de calidad, cercana, honesta y sin
                  complicaciones innecesarias.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Estamos ubicados en{' '}
                  <strong className="text-gray-800">
                    Paseo de Navacoyan 100, Lomas del Parque, Durango, Dgo. (C.P. 34100)
                  </strong>
                  , en una de las zonas más accesibles de la ciudad. Conocemos Durango de verdad:
                  sus colonias, sus instituciones, sus tiempos. Sabemos cómo trabajan los juzgados
                  familiares del estado, qué requiere el Registro Público de la Propiedad de
                  Durango para un trámite, y cuánto puede tardarse realmente un proceso si no se
                  maneja bien desde el inicio.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Esa experiencia local no se aprende en libros, se construye caso a caso, en la
                  ciudad donde vivimos y trabajamos.
                </p>
              </motion.div>

              {/* ── Gallery ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
                {galleryImages.map((img) => (
                  <div
                    key={img.src}
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-lg font-bold mb-1">{img.label}</h3>
                        <p className="text-sm text-gray-200">{img.sub}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── H2: Filosofía ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 md:p-10 text-white mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-5">
                  Nuestra Filosofía: Derecho con Claridad y Compromiso
                </h2>
                <p className="text-gray-300 leading-relaxed mb-8">
                  En BCC creemos que un cliente bien informado toma mejores decisiones. Por eso
                  nunca usamos el lenguaje legal como barrera, lo usamos como herramienta para
                  explicarte exactamente en qué posición estás, qué opciones tienes y qué puedes
                  esperar.
                </p>
                <div className="space-y-6">
                  {[
                    {
                      num: '1',
                      title: 'Escucha antes de hablar.',
                      text: 'Antes de darte una estrategia, necesitamos entender tu situación completa. Cada caso es diferente, y lo que funcionó para otro cliente puede no ser lo correcto para ti.',
                    },
                    {
                      num: '2',
                      title: 'Transparencia total desde el inicio.',
                      text: 'Nada de sorpresas en honorarios ni en plazos. Te decimos desde la primera consulta qué implica tu caso, cuánto puede costar y cuánto tiempo puede tomar, con estimados reales, no optimistas.',
                    },
                    {
                      num: '3',
                      title: 'Comunicación constante.',
                      text: 'Tu caso no se va a quedar en un cajón mientras esperas una llamada que no llega. En BCC te mantenemos informado en cada etapa del proceso.',
                    },
                  ].map((p) => (
                    <div key={p.num} className="flex gap-4">
                      <span className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                        {p.num}
                      </span>
                      <div>
                        <p className="font-semibold text-white mb-1">{p.title}</p>
                        <p className="text-gray-300 leading-relaxed text-sm">{p.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ── H2: Especialidades ── */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Áreas en las que Somos Especialistas
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Nuestro despacho se enfoca en las ramas del derecho que más impactan la vida
                  cotidiana de las familias y propietarios en Durango. No somos un despacho que
                  acepta cualquier caso, nos especializamos porque creemos que la profundidad
                  supera a la amplitud.
                </p>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {specialties.map((s) => (
                    <motion.div key={s.href} variants={cardVariants}>
                      <Link
                        to={s.href}
                        className="block bg-white rounded-xl shadow border border-gray-100 p-6 hover:shadow-md hover:border-brand-red/30 transition-all duration-300 group h-full"
                      >
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-red transition-colors">
                          {s.service}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">{s.who}</p>
                        <span className="text-brand-red text-sm font-semibold group-hover:underline">
                          Ver servicio →
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* ── H2: Valores ── */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  Nuestros Valores como Equipo
                </h2>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-60px' }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >
                  {values.map((v) => (
                    <motion.div
                      key={v.title}
                      variants={cardVariants}
                      className="bg-white rounded-xl shadow border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{v.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* ── H2: Por qué elegirnos ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                className="bg-white rounded-2xl shadow-lg p-8 md:p-10 border border-gray-100 mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  ¿Cómo Sabemos que Somos el Despacho Correcto para Ti?
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Puede que ya hayas hablado con otro abogado y te hayas ido con más dudas que
                  respuestas. O quizás es tu primera vez buscando asesoría legal y no sabes bien
                  qué esperar. En cualquiera de los dos casos, esto es lo que puedes esperar de BCC:
                </p>
                <ul className="space-y-3">
                  {whyUs.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-brand-red font-bold mt-0.5 flex-shrink-0">✔</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-600 mt-6 leading-relaxed">
                  Si quieres conocernos antes de comprometerte, puedes agendar una consulta inicial
                  sin ninguna obligación. Nos presentamos, escuchamos tu caso y te damos un
                  panorama honesto. Así de sencillo.
                </p>
              </motion.div>

              {/* ── H2: FAQ ── */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                  Preguntas Frecuentes sobre BCC Despacho Jurídico
                </h2>
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                  {faqs.map((faq) => (
                    <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                  ))}
                </div>
              </div>

              {/* ── H2: Contacto / CTA ── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                className="bg-brand-red rounded-2xl shadow-xl p-8 md:p-12 text-center"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
                  Visítanos o Contáctanos
                </h2>
                <p className="text-white text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
                  Si llegaste hasta aquí, probablemente tienes un asunto legal que resolver.
                  No tienes que llegar con todo claro. Solo necesitas dar el primer paso.
                </p>
                <div className="text-white mb-8 space-y-1 text-base">
                  <p>📍 Paseo de Navacoyan 100, Lomas del Parque, Durango, Dgo. 34100</p>
                  <p>📞 618 149 2511</p>
                  <p>🌐 bccdespachojuridico.com</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/5216181492511"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    WhatsApp
                  </a>
                  <Link
                    to="/contacto"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-brand-red rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Agendar Consulta
                  </Link>
                </div>
              </motion.div>

            </div>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}
