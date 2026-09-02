import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';
import PageWrapper from '../components/PageWrapper';

// --- Data ---

const serviceAreas = [
    {
        h3: 'Contratos Civiles',
        href: '/servicios/contratos-civiles',
        body: 'Un contrato bien redactado te protege. Uno mal hecho puede costarte tiempo, dinero y dolores de cabeza innecesarios. En BCC te ayudamos a redactar, revisar y formalizar todo tipo de contratos civiles en Durango: compraventas, arrendamientos, contratos de servicios, préstamos entre particulares y más.',
        aside: 'Si estás a punto de firmar algo importante, o alguien te está pidiendo que lo hagas, primero déjanos revisarlo. Lo que parece un simple papel puede tener implicaciones legales serias que conviene conocer antes, no después.',
    },
    {
        h3: 'Propiedad y Bienes Inmuebles',
        href: '/servicios/propiedad-bienes',
        body: 'Comprar, vender o regularizar una propiedad en Durango implica varios pasos legales que, si no se hacen bien, pueden generar problemas graves más adelante. Desde la revisión del título de propiedad hasta los trámites ante el Registro Público de la Propiedad del Estado de Durango, en BCC manejamos todo el proceso.',
        aside: 'También atendemos conflictos de posesión, aclaraciones de límites, donaciones de inmuebles y cualquier asunto donde esté involucrado un bien raíz.',
    },
    {
        h3: 'Sucesiones y Herencias',
        href: '/servicios/sucesiones-herencias',
        body: 'Gestionar el patrimonio de un familiar que falleció es uno de los trámites más sensibles que existe, y también uno de los más fáciles de complicar si no se maneja con conocimiento. En BCC acompañamos a las familias duranguenses en todo el proceso de sucesión, ya sea por testamento o sin él.',
        aside: 'Nos encargamos de los trámites ante notarías y juzgados en Durango, mantenemos informada a la familia en cada etapa y nos aseguramos de que el patrimonio quede bien distribuido y debidamente documentado.',
    },
    {
        h3: 'Derecho de Familia',
        href: '/servicios/derecho-familia',
        body: 'Los asuntos de familia son los más delicados de todos porque involucran emociones, hijos y decisiones que impactan el futuro de todos. En BCC manejamos divorcios, custodias, pensiones alimenticias, reconocimiento de paternidad, adopciones y otros asuntos familiares con la discreción y sensibilidad que merecen.',
        aside: 'Siempre buscamos la solución más ágil y menos traumática posible, pero cuando hay que defender tus derechos en un juzgado, también estamos preparados para hacerlo.',
    },
    {
        h3: 'Juicio de Amparo',
        href: '/servicios/amparos',
        body: 'Cuando una autoridad, un juez o una dependencia emite una resolución que te perjudica, el amparo es la vía para que la justicia federal la revise. En BCC tramitamos amparos directos e indirectos en materia civil, mercantil, familiar y administrativa, y solicitamos la suspensión del acto reclamado para frenar el daño mientras se resuelve tu caso.',
        aside: 'Los plazos del amparo son cortos y empiezan a correr desde que te notifican. Si acabas de recibir una resolución que te afecta, consúltanos cuanto antes para revisar si todavía estás a tiempo.',
    },
];

const comparativa = [
    { feature: 'Enfoque', generalista: 'Amplio, varios temas', bcc: 'Civil, familiar y amparo en Durango' },
    { feature: 'Conocimiento local', generalista: 'Variable', bcc: 'Juzgados, notarías y registros de Durango' },
    { feature: 'Profundidad en el caso', generalista: 'Media', bcc: 'Alta, tu caso se trabaja a fondo' },
    { feature: 'Comunicación', generalista: 'Depende del despacho', bcc: 'Directa, constante y sin intermediarios' },
];

const proceso = [
    { num: '1', title: 'Consulta inicial', desc: 'Escuchamos tu caso completo y te damos una evaluación honesta de tu situación.' },
    { num: '2', title: 'Revisión de documentos', desc: 'Analizamos lo que tienes y detectamos lo que falta o lo que hay que corregir.' },
    { num: '3', title: 'Estrategia y presupuesto', desc: 'Te presentamos un plan claro con opciones, costos y tiempos reales.' },
    { num: '4', title: 'Ejecución', desc: 'Nos encargamos de los trámites, diligencias y gestiones necesarias.' },
    { num: '5', title: 'Cierre documentado', desc: 'Recibes toda tu documentación en orden al finalizar el proceso.' },
];

const faqs = [
    {
        q: '¿Puedo contratar más de un servicio al mismo tiempo?',
        a: 'Sí. Hay casos que combinan varias áreas, por ejemplo, una sucesión que incluye bienes inmuebles, o un divorcio que implica la división de propiedades. Manejamos ambas partes de manera integrada.',
    },
    {
        q: '¿Cuánto tiempo toma resolver un caso típico?',
        a: 'Depende del tipo de asunto y su complejidad. Un contrato puede resolverse en días. Una sucesión sin testamento puede tomar varios meses. Siempre te damos un estimado real desde el inicio, no uno optimista.',
    },
    {
        q: '¿Qué documentos necesito para empezar?',
        a: 'Varía según el servicio. En términos generales: identificación oficial, documentos relacionados con el asunto (escrituras, actas, contratos previos) y cualquier comunicación relevante. No te preocupes si no tienes todo, con lo que tengas podemos orientarte.',
    },
    {
        q: '¿Trabajan con clientes que están en otros municipios de Durango?',
        a: 'Sí, dependiendo del tipo de caso podemos atender asuntos en municipios del estado. Consúltanos directamente para confirmar cobertura.',
    },
    {
        q: '¿Puedo resolver mi problema sin ir a juicio?',
        a: 'En la mayoría de los casos civiles y familiares, sí. Privilegiamos siempre las vías más ágiles y menos costosas, acuerdos, mediación, trámites notariales. El juicio es el último recurso, no el primero.',
    },
    {
        q: '¿Tienen disponibilidad para urgencias?',
        a: 'Sí. Si tu situación es urgente, una fecha límite, una diligencia inminente o una situación familiar crítica, contáctanos directamente al 618 149 2511 y buscamos atenderte lo antes posible.',
    },
    {
        q: '¿Cómo sé cuál de sus servicios necesito?',
        a: 'No siempre es obvio, y no tienes por qué saberlo antes de llamarnos. En la consulta inicial te ayudamos a identificar exactamente qué tipo de asunto tienes y cuál es la mejor ruta para resolverlo.',
    },
    {
        q: '¿Puedo agendar una cita en línea?',
        a: 'Sí, puedes escribirnos por WhatsApp al 618 149 2511 o visitarnos en bccdespachojuridico.com para enviar un mensaje de contacto. Respondemos en menos de 24 horas en días hábiles.',
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

// --- FAQ Accordion ---

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

export default function Servicios() {
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
                                    BCC Despacho Jurídico · Durango
                                </p>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Servicios Jurídicos en Durango:{' '}
                                    <span className="text-brand-red">
                                        Todo lo que BCC Puede Hacer por Ti
                                    </span>
                                </h1>
                                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                    No todos los problemas legales son iguales, y no todos los abogados están
                                    preparados para resolverlos bien. En BCC Despacho Jurídico nos especializamos
                                    en las áreas del derecho civil y familiar que más afectan a las familias y
                                    propietarios de Durango, y lo hacemos con profundidad, no a medias.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Si tienes un conflicto por una propiedad, necesitas formalizar un contrato,
                                    estás pasando por una separación, debes gestionar la herencia de un familiar o
                                    necesitas impugnar una resolución de autoridad con un juicio de amparo,
                                    estás en el lugar correcto.
                                </p>
                            </motion.div>

                            {/* ── H2: ¿Qué tipo de problema tienes? ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    ¿Qué Tipo de Problema Legal Tienes?
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    A veces la gente llega a nuestro despacho sin saber exactamente qué tipo de
                                    asunto tiene, solo sabe que algo no está bien y que necesita orientación. Eso
                                    está perfectamente bien. Una de las primeras cosas que hacemos en consulta es
                                    ayudarte a identificar la naturaleza de tu problema y qué rama del derecho aplica.
                                </p>
                                <p className="text-gray-600 mb-5">
                                    La mayoría de los casos que atendemos caen en alguna de estas cinco categorías:
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        { text: 'Necesito firmar o revisar un contrato y quiero hacerlo bien', href: '/servicios/contratos-civiles' },
                                        { text: 'Tengo un asunto con una propiedad o terreno, compra, venta, regularización o conflicto', href: '/servicios/propiedad-bienes' },
                                        { text: 'Falleció un familiar y hay que repartir o gestionar su patrimonio', href: '/servicios/sucesiones-herencias' },
                                        { text: 'Tengo un asunto familiar, divorcio, custodia, pensión alimenticia u otro', href: '/servicios/derecho-familia' },
                                        { text: 'Una autoridad o un juez emitió una resolución que me perjudica y quiero impugnarla', href: '/servicios/amparos' },
                                    ].map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                to={item.href}
                                                className="flex items-start gap-3 group"
                                            >
                                                <span className="w-2 h-2 rounded-full bg-brand-red mt-2.5 flex-shrink-0 group-hover:scale-125 transition-transform" />
                                                <span className="text-gray-700 group-hover:text-brand-red transition-colors leading-relaxed">
                                                    {item.text}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-500 text-sm mt-6">
                                    Si no estás seguro, llámanos al{' '}
                                    <a href="tel:+526181492511" className="text-brand-red font-semibold hover:underline">
                                        618 149 2511
                                    </a>{' '}
                                    y te orientamos sin costo.
                                </p>
                            </motion.div>

                            {/* ── H2: Áreas de práctica ── */}
                            <div className="mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                    Nuestras Áreas de Práctica
                                </h2>
                                <p className="text-gray-600 mb-10 leading-relaxed">
                                    Cada área que atendemos requiere un conocimiento específico del derecho local, de
                                    los trámites en Durango y de los tiempos reales del sistema judicial. Aquí es
                                    donde nuestra especialización hace la diferencia.
                                </p>

                                <div className="space-y-8">
                                    {serviceAreas.map((s, i) => (
                                        <motion.div
                                            key={s.href}
                                            initial={{ opacity: 0, y: 24 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-60px' }}
                                            transition={{
                                                duration: 0.45,
                                                delay: i * 0.05,
                                                ease: [0, 0, 0.2, 1] as [number, number, number, number],
                                            }}
                                            className="bg-white rounded-2xl shadow border border-gray-100 p-8 hover:shadow-md transition-shadow duration-300"
                                        >
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{s.h3}</h3>
                                            <p className="text-gray-600 leading-relaxed mb-3">{s.body}</p>
                                            <p className="text-gray-500 text-sm leading-relaxed mb-4">{s.aside}</p>
                                            <Link
                                                to={s.href}
                                                className="inline-flex items-center text-brand-red font-semibold text-sm hover:underline"
                                            >
                                                Conoce más sobre {s.h3} →
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* ── H2: ¿Por qué un especialista? ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 md:p-10 text-white mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    ¿Por Qué es Importante Elegir un Especialista?
                                </h2>
                                <p className="text-gray-300 leading-relaxed mb-8">
                                    Hay abogados generalistas que aceptan cualquier tipo de caso. Eso no es
                                    necesariamente malo, pero sí implica que ningún tema se trabaja con la misma
                                    profundidad. En BCC elegimos enfocarnos en derecho civil y familiar porque es
                                    donde tenemos más experiencia, mejores resultados y mayor conocimiento del
                                    contexto local en Durango.
                                </p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-700">
                                                <th className="text-left py-3 pr-6 text-gray-400 font-medium">Característica</th>
                                                <th className="text-left py-3 pr-6 text-gray-400 font-medium">Generalista</th>
                                                <th className="text-left py-3 text-brand-red font-semibold">BCC Despacho Jurídico</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {comparativa.map((row) => (
                                                <tr key={row.feature} className="border-b border-gray-700/50 last:border-0">
                                                    <td className="py-3 pr-6 text-gray-300 font-medium">{row.feature}</td>
                                                    <td className="py-3 pr-6 text-gray-400">{row.generalista}</td>
                                                    <td className="py-3 text-white">{row.bcc}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-gray-400 text-sm mt-6">
                                    El derecho es amplio. La especialización importa, especialmente cuando está en
                                    juego tu patrimonio, tu familia o tu tranquilidad.
                                </p>
                            </motion.div>

                            {/* ── H2: Nuestro proceso ── */}
                            <div className="mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Nuestro Proceso en Cualquier Área
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Sin importar el tipo de servicio que necesites, el proceso en BCC siempre sigue
                                    esta estructura:
                                </p>
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-60px' }}
                                    className="space-y-4"
                                >
                                    {proceso.map((p) => (
                                        <motion.div
                                            key={p.num}
                                            variants={cardVariants}
                                            className="flex gap-5 bg-white rounded-xl border border-gray-100 shadow p-6"
                                        >
                                            <span className="w-9 h-9 rounded-full bg-brand-red text-white font-bold flex items-center justify-center flex-shrink-0 text-base mt-0.5">
                                                {p.num}
                                            </span>
                                            <div>
                                                <h3 className="font-bold text-gray-900 mb-1">{p.title}</h3>
                                                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                                <p className="text-gray-500 text-sm mt-6 text-center">
                                    En cada etapa sabes qué está pasando con tu caso. Sin sorpresas, sin silencio, sin letra chica.
                                </p>
                            </div>

                            {/* ── H2: FAQ ── */}
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                                    Preguntas Frecuentes sobre Nuestros Servicios
                                </h2>
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                                    {faqs.map((faq) => (
                                        <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                                    ))}
                                </div>
                            </div>

                            {/* ── H2: CTA ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                                className="bg-brand-red rounded-2xl shadow-xl p-8 md:p-12 text-center"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
                                    ¿No Sabes por Dónde Empezar? Nosotros Te Orientamos
                                </h2>
                                <p className="text-white text-lg mb-6 max-w-2xl mx-auto leading-relaxed">
                                    No tienes que llegar con tu caso resuelto. Llega con tu problema, y nosotros
                                    te ayudamos a entenderlo, ordenarlo y encontrar la mejor salida.
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
                                        className="inline-flex items-center justify-center px-8 py-4 bg-black text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        WhatsApp
                                    </a>
                                    <Link
                                        to="/contacto"
                                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-brand-red rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
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
