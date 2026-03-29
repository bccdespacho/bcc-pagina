import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import PageWrapper from '../../../components/PageWrapper';

// --- Schema JSON-LD ---
const schemaJSON = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Asesoría Jurídica e Inmobiliaria BCC - Nuevo Ideal',
    url: 'https://bccdespachojuridico.com/municipios/nuevo-ideal/servicios/sucesiones-herencias',
    telephone: '+526181492511',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Emiliano Zapata 707, Zona Centro',
        addressLocality: 'Nuevo Ideal',
        addressRegion: 'Durango',
        postalCode: '34410',
        addressCountry: 'MX',
    },
    areaServed: 'Nuevo Ideal, Durango',
    serviceType: 'Sucesiones y Herencias',
    description: 'Asesoría legal en sucesiones testamentarias e intestamentarias, adjudicación de bienes y conflictos entre herederos en Nuevo Ideal.',
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://bccdespachojuridico.com/municipios/nuevo-ideal/servicios/sucesiones-herencias',
    },
    hasFAQPage: {
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: '¿Cuánto tiempo tarda una sucesión en Nuevo Ideal?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Una sucesión testamentaria con documentos completos puede resolverse en pocos meses. Una intestamentaria con varios herederos o bienes complejos puede tomar más tiempo. En BCC damos un estimado real desde la consulta inicial.',
                },
            },
            {
                '@type': 'Question',
                name: '¿Qué pasa si no hay testamento en Nuevo Ideal?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Se inicia una sucesión intestamentaria. La ley establece el orden de preferencia de los herederos. El proceso requiere acreditar el parentesco de cada heredero ante notario o juez.',
                },
            },
            {
                '@type': 'Question',
                name: '¿Es obligatorio ir a juicio para una herencia en Nuevo Ideal?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No siempre. Muchas sucesiones se resuelven ante notario sin necesidad de juzgado, especialmente cuando hay testamento y los herederos están de acuerdo.',
                },
            },
            {
                '@type': 'Question',
                name: '¿Puedo heredar una propiedad que sigue a nombre de un abuelo fallecido hace muchos años?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sí, es posible. Existen vías legales para regularizar esa situación aunque hayan pasado años. Lo importante es iniciar el proceso cuanto antes con asesoría profesional.',
                },
            },
        ],
    },
};

// --- Data ---
const cuandoNecesitas = [
    'Falleció un familiar y hay bienes que repartir: inmuebles, cuentas bancarias, vehículos',
    'El fallecido dejó testamento y hay que ejecutarlo correctamente',
    'No hay testamento y la familia no sabe cómo proceder',
    'Hay desacuerdo entre los herederos sobre cómo repartir los bienes',
    'Una propiedad sigue a nombre de alguien fallecido hace años y necesitas regularizarla',
    'Quieres planear con anticipación cómo se distribuirá tu patrimonio',
];

const tiposSucesion = [
    {
        h3: 'Sucesión Testamentaria',
        body: 'Cuando el fallecido dejó testamento, el proceso es más claro, pero no por eso automático. El testamento debe ser ejecutado ante notario o juez, los herederos notificados, los bienes inventariados y la distribución formalizada.',
        detail: 'En BCC acompañamos todo este proceso: verificamos la validez del testamento, coordinamos trámites notariales, gestionamos el inventario y aseguramos que cada heredero reciba lo suyo con la documentación en regla.',
    },
    {
        h3: 'Sucesión Intestamentaria (Sin Testamento)',
        body: 'Cuando no hay testamento, la ley establece quiénes son los herederos y en qué proporción. El proceso requiere acreditar el parentesco y seguir un procedimiento judicial o notarial para determinar a los herederos legítimos.',
        detail: 'En BCC manejamos sucesiones intestamentarias de principio a fin, reuniendo la documentación, tramitando la declaración de herederos y asegurando la correcta distribución del patrimonio.',
    },
    {
        h3: 'Adjudicación de Bienes Inmuebles',
        body: 'Uno de los asuntos más frecuentes es la adjudicación de propiedades que quedaron a nombre de familiares fallecidos. Muchas familias viven en propiedades que legalmente siguen a nombre de los abuelos, complicando ventas futuras.',
        detail: 'Regularizar esa propiedad es posible y necesario. En BCC coordinamos los trámites ante notarías, juzgados y el Registro Público de la Propiedad para que la propiedad quede a tu nombre.',
    },
    {
        h3: 'Conflictos entre Herederos',
        body: 'No todas las herencias se resuelven en armonía. Desacuerdos entre hermanos, disputas sobre valores o herederos ausentes pueden complicar significativamente el proceso.',
        detail: 'En BCC buscamos primero la vía del acuerdo, pero cuando no es posible, defendemos tus derechos ante los juzgados familiares correspondientes con firmeza.',
    },
];

const proceso = [
    {
        num: '1',
        title: 'Consulta inicial',
        desc: 'Evaluamos el caso: si hay testamento, qué bienes hay, quiénes son los herederos y la mejor vía de acción.',
    },
    {
        num: '2',
        title: 'Reunión de documentos',
        desc: 'Acta de defunción, identificaciones, actas de parentesco y documentos de los bienes (escrituras, cuentas).',
    },
    {
        num: '3',
        title: 'Declaración de herederos',
        desc: 'Se establece oficialmente ante notario o juez quiénes tienen derecho a la herencia.',
    },
    {
        num: '4',
        title: 'Inventario y Adjudicación',
        desc: 'Se inventariaron y valúan los bienes para luego formalizar su distribución entre los herederos.',
    },
    {
        num: '5',
        title: 'Inscripción de propiedades',
        desc: 'Las propiedades se inscriben a nombre de los nuevos dueños en el Registro Público correspondiente.',
    },
];

const errores = [
    {
        num: '1',
        title: 'Esperar demasiado tiempo para iniciar el proceso.',
        desc: 'La herencia no prescribe, pero entre más tiempo pasa, más difícil es reunir documentos y evitar conflictos.',
    },
    {
        num: '2',
        title: 'Repartir los bienes de palabra.',
        desc: 'Un acuerdo verbal no tiene validez legal. Ningún heredero podrá vender libremente sin el proceso sucesorio.',
    },
    {
        num: '3',
        title: 'Perder documentos importantes.',
        desc: 'Escrituras, testamentos y actas son esenciales. Recuperarlos después añade tiempo y costo al trámite.',
    },
    {
        num: '4',
        title: 'Asumir que solo el hijo mayor hereda.',
        desc: 'La ley mexicana establece con claridad quiénes y cómo heredan, y no siempre coincide con lo que se asume.',
    },
];

const checklist = [
    'Acta de defunción del fallecido',
    'Identificación oficial de todos los posibles herederos',
    'Actas de nacimiento/matrimonio que acrediten parentesco',
    'Testamento, si existe',
    'Escrituras de propiedades a nombre del fallecido',
    'Facturas de vehículos o estados de cuenta bancarios',
];

const faqs = [
    {
        q: '¿Cuánto tiempo tarda una sucesión en Nuevo Ideal?',
        a: 'Una sucesión testamentaria con documentos completos puede resolverse rápido. Una intestamentaria o con bienes complejos puede tomar meses. En BCC te damos un estimado real en tu consulta inicial.',
    },
    {
        q: '¿Qué pasa si no hay testamento?',
        a: 'La ley establece el orden de preferencia de herederos: cónyuge e hijos primero. Se requiere acreditar el parentesco ante notario o juez. Nosotros guiamos todo el trámite.',
    },
    {
        q: '¿Puedo heredar una propiedad a nombre de mi abuelo fallecido hace 20 años?',
        a: 'Sí, es posible. Existen vías legales para regularizarlo, aunque la documentación requerirá más tiempo. Consúltanos para analizar el caso.',
    },
    {
        q: '¿Es obligatorio ir a juicio para una herencia?',
        a: 'No siempre. Si hay acuerdo y en ciertos casos, puede resolverse ante notario público, lo cual suele ser más rápido.',
    },
    {
        q: '¿Qué pasa si un heredero no quiere firmar/participar?',
        a: 'Un solo heredero no puede bloquear indefinidamente el proceso. Existen mecanismos legales para avanzar, los cuales manejamos en el despacho.',
    },
    {
        q: '¿Cuánto cuesta hacer una sucesión?',
        a: 'Depende del tipo de sucesión, bienes y si es judicial o notarial. En BCC te ofrecemos un presupuesto claro desde tu primer contacto al 618 149 2511.',
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
export default function SucesionesHerenciasNI() {
    useEffect(() => {
        document.title = "Abogado de Herencias e Intestados en Nuevo Ideal | BCC";

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", "Asesoría en sucesiones, testamentos y herencias en Nuevo Ideal. Resolución de intestados y adjudicación de bienes de forma clara y legal.");
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'schema-sucesiones-herencias-ni';
        script.textContent = JSON.stringify(schemaJSON);
        document.head.appendChild(script);

        return () => {
            const existing = document.getElementById('schema-sucesiones-herencias-ni');
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
                                    Sucesiones y Herencias en Nuevo Ideal:{' '}
                                    <span className="text-brand-red">
                                        Asesoría Legal con Acompañamiento Humano
                                    </span>
                                </h1>
                                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                    Perder a un ser querido es uno de los momentos más difíciles de la vida. Lo
                                    último que una familia debería enfrentar es un proceso legal confuso, lento o
                                    lleno de conflictos por el patrimonio dejado.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                    En BCC Asesoría Jurídica e Inmobiliaria acompañamos a familias de Nuevo Ideal en
                                    procesos sucesorios testamentarios e intestamentarios, brindando claridad,
                                    certeza legal y el trato humano que requiere el momento.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                    <a
                                        href="https://wa.me/5216181492511"
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
                                        Agendar Cita
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
                                    ¿Cuándo Necesitas un Abogado de Herencias?
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Una sucesión es el proceso legal para transferir los bienes y derechos
                                    de una persona fallecida a sus legítimos herederos.
                                </p>
                                <p className="text-gray-700 font-semibold mb-4">
                                    Nuestra asesoría es clave cuando:
                                </p>
                                <ul className="space-y-3 mb-6">
                                    {cuandoNecesitas.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="w-2 h-2 rounded-full bg-brand-red mt-2.5 flex-shrink-0" />
                                            <span className="text-gray-700 leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                                    <p className="text-sm text-amber-800 leading-relaxed">
                                        <strong>Actuar a tiempo es fundamental.</strong> Retrasar una herencia complica
                                        la localización de herederos y el estado de la documentación.
                                    </p>
                                </div>
                            </motion.div>

                            {/* ── H2: Tipos de sucesión ── */}
                            <div className="mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                    Tipos de Sucesión que Atendemos
                                </h2>
                                <p className="text-gray-600 mb-10 leading-relaxed">
                                    No hay dos herencias idénticas. Conoce los esquemas legales principales:
                                </p>
                                <div className="space-y-6">
                                    {tiposSucesion.map((t, i) => (
                                        <motion.div
                                            key={t.h3}
                                            initial={{ opacity: 0, y: 24 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, margin: '-60px' }}
                                            transition={{
                                                duration: 0.4,
                                                delay: i * 0.05,
                                                ease: [0, 0, 0.2, 1] as [number, number, number, number],
                                            }}
                                            className="bg-white rounded-2xl shadow border border-gray-100 p-7 hover:shadow-md transition-shadow duration-300"
                                        >
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">{t.h3}</h3>
                                            <p className="text-gray-600 leading-relaxed mb-2">{t.body}</p>
                                            <p className="text-gray-500 text-sm leading-relaxed">{t.detail}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* ── H2: Proceso ── */}
                            <div className="mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Pasos del Proceso Sucesorio
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    En BCC te llevamos de la mano en cada etapa del trámite:
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
                                                <p className="font-bold text-gray-900 mb-1">{p.title}</p>
                                                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>

                            {/* ── H2: Errores comunes ── */}
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Errores Comunes al Tramitar Herencias
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Evita estos problemas comunes que vemos frecuentemente:
                                </p>
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

                            {/* ── H2: Checklist de documentos ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                    Documentos Básicos para Iniciar
                                </h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Reúne lo siguiente (si te falta algo, consúltanos):
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
                                    Agenda tu Asesoría en Nuevo Ideal
                                </h2>
                                <p className="text-white text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
                                    Un trámite sucesorio no tiene por qué ser abrumador. Con BCC tendrás la certeza
                                    de un proceso transparente y eficiente.
                                </p>
                                <p className="text-white/90 text-base mb-6 max-w-xl mx-auto">
                                    Protegemos y formalizamos el patrimonio familiar.
                                </p>
                                <div className="text-white mb-8 space-y-1 text-base">
                                    <p>📍 Emiliano Zapata 707, Zona Centro, 34410 Nuevo Ideal, Dgo.</p>
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
