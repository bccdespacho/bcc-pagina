import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import PageWrapper from '../../../components/PageWrapper';

// --- Schema JSON-LD ---
const schemaJSON = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Asesoría Jurídica e Inmobiliaria BCC - Nuevo Ideal',
    url: 'https://bccdespachojuridico.com/municipios/nuevo-ideal/servicios/derecho-familia',
    telephone: '+526778711030',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Emiliano Zapata 707, Zona Centro',
        addressLocality: 'Nuevo Ideal',
        addressRegion: 'Durango',
        postalCode: '34410',
        addressCountry: 'MX',
    },
    areaServed: 'Nuevo Ideal, Durango',
    serviceType: 'Derecho de Familia',
    description: 'Asesoría legal en divorcios, custodia de menores, pensiones alimenticias, reconocimiento de paternidad y violencia familiar en Nuevo Ideal.',
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://bccdespachojuridico.com/municipios/nuevo-ideal/servicios/derecho-familia',
    },
    hasFAQPage: {
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: '¿Cuánto tarda un divorcio en Nuevo Ideal?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Un divorcio de mutuo acuerdo ante notario puede resolverse en semanas. Ante juez con acuerdo puede tomar algunos meses. Un divorcio contencioso puede extenderse más.',
                },
            },
            {
                '@type': 'Question',
                name: '¿Puedo divorciarme aunque mi pareja no quiera en México?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sí. Existe el divorcio incausado que permite a cualquiera pedir el divorcio sin acuerdo de la otra parte. Lo que se discute ante el juez es custodia, pensión y bienes.',
                },
            },
            {
                '@type': 'Question',
                name: '¿Qué pasa si mi ex no paga la pensión alimenticia en Nuevo Ideal?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'El incumplimiento tiene consecuencias legales serias, desde embargo de bienes y salario hasta constituir un delito. En BCC te asesoramos para hacer cumplir este derecho de tus hijos.',
                },
            },
        ],
    },
};

// --- Data ---
const cuandoNecesitas = [
    'Quieres divorciarte y buscas el proceso más conveniente para tu caso y patrimonio',
    'Hay conflicto sobre quién tendrá la custodia de tus hijos y bajo qué condiciones',
    'Tu ex pareja no está cumpliendo con la pensión alimenticia acordada o determinada por juez',
    'Necesitas establecer o modificar formalmente una pensión alimenticia',
    'Requieres reconocer o demandar legalmente la paternidad de un hijo',
    'Estás en una situación de violencia familiar y necesitas medidas de protección urgentes',
];

const servicios = [
    {
        h3: 'Divorcio en Nuevo Ideal',
        body: 'El divorcio en México tiene distintas vías, y no todas implican un juicio largo. En BCC te orientamos sobre la mejor opción para tu situación:',
        variantes: [
            {
                titulo: 'Ante notario (mutuo acuerdo)',
                desc: 'Si hay acuerdo total, sin menores y sin bienes en disputa, puede tramitarse rápidamente ante notario público.',
            },
            {
                titulo: 'Ante juez con acuerdo',
                desc: 'Cuando hay hijos o bienes, pero existe acuerdo, se somete un convenio ante el juez familiar regulando custodia, pensión y bienes.',
            },
            {
                titulo: 'Divorcio incausado (unilateral)',
                desc: 'Si no hay acuerdo para divorciarse, cualquiera puede solicitarlo. El juez concede el divorcio y se inicia proceso para resolver temas accesorios (hijos y bienes).',
            },
        ],
        detail: 'Analizamos tu caso y te proponemos la vía más rápida, económica y segura para ti y tu familia.',
    },
    {
        h3: 'Custodia y Convivencia',
        body: 'La ley privilegia siempre el interés superior del menor. Te asesoramos para lograr un esquema que funcione en la práctica y proteja el bienestar de tus hijos.',
        bullets: [
            'Establecimiento de custodia exclusiva o compartida',
            'Definición de regímenes de visitas (convivencia) claros y viables',
            'Modificación de convenios cuando las circunstancias cambian',
            'Defensa legal ante incumplimientos de regímenes de visita',
        ],
        detail: 'Buscamos siempre el acuerdo, pero litigamos con firmeza en los juzgados si tus derechos o los de tus hijos se ven vulnerados.',
    },
    {
        h3: 'Pensión Alimenticia',
        body: 'Es una obligación ineludible. Ayudamos a fijar pensiones justas que cubran las necesidades reales de los menores, proporcionales a los ingresos del deudor.',
        bullets: [
            'Fijación inicial de pensión alimenticia',
            'Ejecución forzosa cuando hay incumplimiento (embargos, descuentos)',
            'Juicios de modificación (aumento o reducción) de pensión',
            'Reclamo de pensiones atrasadas',
        ],
        detail: 'El impago alimentario tiene severas consecuencias legales. En BCC te ayudamos a hacer valer el derecho de tus hijos.',
    },
    {
        h3: 'Violencia Familiar y Medidas de Protección',
        body: 'Tu seguridad y la de los tuyos es prioridad. Te asistimos para solicitar con carácter de urgencia las medidas de protección y restricción contempladas por la ley.',
        detail: 'Brindamos acompañamiento en la denuncia y proceso. No enfrentes estas situaciones sin respaldo legal. Atención urgente.',
        urgente: true,
    },
];

const comoTrabajamos = [
    {
        titulo: 'Escucha atenta y empatía',
        desc: 'Los asuntos familiares son delicados. Te escuchamos sin juzgar para entender a fondo la situación.',
    },
    {
        titulo: 'Claridad desde el inicio',
        desc: 'Te explicamos los tiempos, costos y escenarios posibles con total franqueza.',
    },
    {
        titulo: 'Prioridad al acuerdo',
        desc: 'La mediación suele ser la vía menos desgastante, especialmente cuando hay menores involucrados.',
    },
    {
        titulo: 'Litigio firme',
        desc: 'Si la contraparte no cede o actúa de mala fe, defendemos tus intereses con todas las herramientas legales en los tribunales.',
    },
];

const errores = [
    {
        num: '1',
        title: 'Llegar a acuerdos solo de palabra.',
        desc: 'Un acuerdo verbal sobre pensión o visitas no se puede exigir legalmente si se incumple. Todo debe formalizarse ante juez.',
    },
    {
        num: '2',
        title: 'Involucrar a los hijos en el conflicto.',
        desc: 'Además del daño emocional, los jueces sancionan duramente usar a los menores como moneda de cambio o alinearlos contra el otro padre.',
    },
    {
        num: '3',
        title: 'Esperar demasiado para actuar.',
        desc: 'Ignorar problemas de impago de pensión o incumplimiento de visitas solo agrava la situación. La asesoría temprana ahorra problemas.',
    },
    {
        num: '4',
        title: 'Exponer el proceso en redes sociales.',
        desc: 'Las publicaciones pueden y suelen ser utilizadas como prueba en contra durante los juicios familiares.',
    },
];

const checklist = [
    'Acta de matrimonio (si aplica)',
    'Actas de nacimiento de los hijos',
    'Identificaciones oficiales',
    'Convenios o acuerdos previos firmados (si existen)',
    'Documentación de bienes en común (escrituras, facturas)',
    'Comprobantes de ingresos (tuyos y conocidos de la contraparte)',
    'Evidencias relevantes (mensajes, correos, reportes en casos de violencia)',
];

const faqs = [
    {
        q: '¿Cuánto tarda un proceso de divorcio en Nuevo Ideal?',
        a: 'Varía según la vía. Un mutuo acuerdo notarial es rápido (semanas). Un proceso judicial con acuerdo puede tomar un par de meses, y un divorcio contencioso (con pelea por bienes o custodia) puede durar considerablemente más. BCC te dará expectativas reales al evaluar tu situación.',
    },
    {
        q: '¿Puede forzarme mi pareja a seguir casados si yo no quiero?',
        a: 'No. En México impera el divorcio incausado. Basta con que uno lo solicite para que el juez decrete la disolución del vínculo, procediendo luego a resolver los temas de hijos y bienes.',
    },
    {
        q: '¿La madre siempre se queda con los hijos?',
        a: 'No, la ley no hace distinciones de género. El principio rector es el "interés superior del menor". La custodia se otorga a quien ofrezca las mejores condiciones integrales, e incluso se puede fijar custodia compartida.',
    },
    {
        q: '¿Qué pasa si el otro padre no tiene ingresos fijos comprobables?',
        a: 'La obligación alimentaria subsiste. Los jueces tienen mecanismos para estimar ingresos basados en el nivel de vida y establecer una pensión, que suele fijarse en salarios mínimos o UMAS.',
    },
    {
        q: '¿Me ayudan en situaciones de emergencia por violencia?',
        a: 'Sí. Acudimos a las instancias correspondientes para solicitar medidas de protección urgentes, como la separación del agresor del domicilio o la restricción de acercamiento. Es vital actuar rápido.',
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
export default function DerechoFamiliaNI() {
    useEffect(() => {
        document.title = "Abogado Familiar en Nuevo Ideal: Divorcios, Custodia y Pensión";

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", "Asesoría experta en derecho familiar en Nuevo Ideal: divorcios, pensiones alimenticias, custodia de menores y violencia familiar. Atención discreta y humana.");
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'schema-derecho-familia-ni';
        script.textContent = JSON.stringify(schemaJSON);
        document.head.appendChild(script);

        return () => {
            const existing = document.getElementById('schema-derecho-familia-ni');
            if (existing) document.head.removeChild(existing);
        };
    }, []);

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
                                    Servicios · Asesoría Jurídica BCC Nuevo Ideal
                                </p>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Derecho Familiar en Nuevo Ideal:{' '}
                                    <span className="text-brand-red">
                                        Divorcios, Custodias y Pensiones con Disposición y Profesionalismo
                                    </span>
                                </h1>
                                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                    Los problemas de familia causan un desgaste emocional profundo. Saber que cuentas
                                    con el respaldo legal correcto es el primer paso para protegerte a ti y a tus hijos.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    En BCC Asesoría Jurídica e Inmobiliaria en Nuevo Ideal, tratamos cada caso con la
                                    delicadeza humana necesaria, pero con la total firmeza legal que los juzgados requieren.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/5216778711030"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center px-7 py-3.5 bg-brand-red text-white rounded-xl font-semibold shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-300"
                                    >
                                        Consulta Gratuita por WhatsApp
                                    </a>
                                    <Link
                                        to="/contacto"
                                        className="inline-flex items-center justify-center px-7 py-3.5 border-2 border-brand-red text-brand-red rounded-xl font-semibold hover:bg-brand-red hover:text-white transition-all duration-300"
                                    >
                                        Agendar Cita en Oficina
                                    </Link>
                                </div>
                            </motion.div>

                            {/* ── H2: ¿Cuándo necesitas abogado? ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    ¿Cuándo Necesitas un Abogado de Familia?
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Muchas veces se posponen estas decisiones buscando evitar conflictos, pero el
                                    retraso suele agravar la situación. Es momento de actuar si:
                                </p>
                                <ul className="space-y-3">
                                    {cuandoNecesitas.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="w-2 h-2 rounded-full bg-brand-red mt-2.5 flex-shrink-0" />
                                            <span className="text-gray-700 leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* ── H2: Nuestros servicios ── */}
                            <div className="mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                    Nuestros Servicios en Materia Familiar
                                </h2>
                                <p className="text-gray-600 mb-10 leading-relaxed">
                                    Asistencia legal integral en los momentos que más importa.
                                </p>
                                <div className="space-y-6">
                                    {servicios.map((s, i) => (
                                        <motion.div
                                            key={s.h3}
                                            initial={{ opacity: 0, y: 24 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-60px' }}
                                            transition={{
                                                duration: 0.4,
                                                delay: i * 0.05,
                                                ease: [0, 0, 0.2, 1] as [number, number, number, number],
                                            }}
                                            className={`bg-white rounded-2xl shadow border p-7 hover:shadow-md transition-shadow duration-300 ${s.urgente ? 'border-red-200' : 'border-gray-100'
                                                }`}
                                        >
                                            {s.urgente && (
                                                <span className="inline-block mb-3 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full uppercase tracking-wide">
                                                    Atención urgente disponible
                                                </span>
                                            )}
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">{s.h3}</h3>
                                            <p className="text-gray-600 leading-relaxed mb-3">{s.body}</p>

                                            {s.variantes && (
                                                <div className="space-y-3 mb-3">
                                                    {s.variantes.map((v) => (
                                                        <div key={v.titulo} className="pl-4 border-l-2 border-brand-red/30">
                                                            <p className="text-sm font-semibold text-gray-800 mb-0.5">{v.titulo}</p>
                                                            <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {s.bullets && (
                                                <ul className="space-y-2 mb-3">
                                                    {s.bullets.map((b) => (
                                                        <li key={b} className="flex items-start gap-2 text-sm text-gray-600">
                                                            <span className="text-brand-red font-bold flex-shrink-0 mt-0.5">✔</span>
                                                            {b}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            <p className="text-gray-500 text-sm leading-relaxed">{s.detail}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* ── H2: ¿Cómo trabajamos? ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-xl p-8 md:p-10 mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    Cómo te Apoyamos en BCC
                                </h2>
                                <div className="space-y-5">
                                    {comoTrabajamos.map((p, i) => (
                                        <div key={p.titulo} className="flex gap-4">
                                            <span className="w-7 h-7 rounded-full bg-brand-red text-white font-bold flex items-center justify-center flex-shrink-0 text-sm mt-0.5">
                                                {i + 1}
                                            </span>
                                            <div>
                                                <p className="font-bold text-white mb-1">{p.titulo}</p>
                                                <p className="text-gray-300 text-sm leading-relaxed">{p.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* ── H2: Errores comunes ── */}
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Errores Frecuentes que Debes Evitar
                                </h2>
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-60px' }}
                                    className="space-y-4"
                                >
                                    {errores.map((e) => (
                                        <motion.div
                                            key={e.num}
                                            variants={cardVariants}
                                            className="flex gap-5 bg-white rounded-xl border border-red-100 shadow-sm p-6"
                                        >
                                            <span className="w-9 h-9 rounded-full bg-brand-red text-white font-bold flex items-center justify-center flex-shrink-0 text-base mt-0.5">
                                                {e.num}
                                            </span>
                                            <div>
                                                <p className="font-bold text-gray-900 mb-1">{e.title}</p>
                                                <p className="text-gray-600 text-sm leading-relaxed">{e.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* ── H2: Checklist ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                    Documentos Básicos
                                </h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Para tu primera asesoría es útil (aunque no indispensable) tener:
                                </p>
                                <ul className="space-y-3">
                                    {checklist.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="text-brand-red font-bold flex-shrink-0">✔</span>
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* ── H2: FAQ ── */}
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                                    Preguntas Frecuentes
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
                                    Agenda tu Asesoría en Familia
                                </h2>
                                <p className="text-white text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
                                    Recibe consejo especializado para tomar las decisiones que resguardarán el bienestar
                                    tuyo y de tus hijos.
                                </p>
                                <div className="text-white mb-8 space-y-1 text-base">
                                    <p>📍 Emiliano Zapata 707, Zona Centro, 34410 Nuevo Ideal, Dgo.</p>
                                    <p>📞 677 871 1030</p>
                                    <p>🌐 bccdespachojuridico.com</p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <a
                                        href="https://wa.me/5216778711030"
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
                                <div className="mt-8 pt-6 border-t border-white/20">
                                    <Link
                                        to="/municipios/nuevo-ideal"
                                        className="text-white/80 text-sm hover:text-white transition-colors hover:underline"
                                    >
                                        ← Volver a inicio Nuevo Ideal
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
