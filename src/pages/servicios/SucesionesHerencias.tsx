import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import PageWrapper from '../../components/PageWrapper';

// --- Schema JSON-LD ---

const schemaJSON = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'BCC Despacho Jurídico',
    url: 'https://bccdespachojuridico.com',
    telephone: '+526181492511',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'Paseo de Navacoyan 100',
        addressLocality: 'Durango',
        addressRegion: 'Durango',
        postalCode: '34100',
        addressCountry: 'MX',
    },
    areaServed: 'Durango, México',
    serviceType: 'Sucesiones y Herencias',
    description:
        'Asesoría legal en sucesiones testamentarias e intestamentarias, adjudicación de bienes, conflictos entre herederos y planeación patrimonial en Durango.',
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://bccdespachojuridico.com/servicios/sucesiones-herencias',
    },
    hasFAQPage: {
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: '¿Cuánto tiempo tarda una sucesión en Durango?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Una sucesión testamentaria con documentos completos puede resolverse en pocos meses. Una intestamentaria con varios herederos o bienes complejos puede tomar más tiempo. En BCC damos un estimado real desde la consulta inicial.',
                },
            },
            {
                '@type': 'Question',
                name: '¿Qué pasa si no hay testamento en Durango?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Se inicia una sucesión intestamentaria. La ley establece el orden de preferencia de los herederos. El proceso requiere acreditar el parentesco de cada heredero ante notario o juez.',
                },
            },
            {
                '@type': 'Question',
                name: '¿Es obligatorio ir a juicio para una herencia en Durango?',
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
    'Falleció un familiar y hay bienes que repartir, inmuebles, cuentas bancarias, vehículos, negocios',
    'El fallecido dejó testamento y hay que ejecutarlo correctamente',
    'No hay testamento y la familia no sabe cómo proceder',
    'Hay desacuerdo entre los herederos sobre cómo repartir los bienes',
    'Una propiedad sigue a nombre de alguien fallecido hace años y necesitas regularizarla',
    'Quieres planear con anticipación cómo se distribuirá tu patrimonio cuando faltes',
];

const tiposSucesion = [
    {
        h3: 'Sucesión Testamentaria',
        body: 'Cuando el fallecido dejó testamento, el proceso es más claro, pero no por eso automático. El testamento debe ser ejecutado ante notario o ante un juez según el caso, los herederos deben ser notificados, los bienes deben ser inventariados y la distribución debe formalizarse correctamente.',
        detail: 'En BCC acompañamos todo este proceso: verificamos la validez del testamento, coordinamos con la notaría correspondiente en Durango, gestionamos el inventario de bienes y aseguramos que cada heredero reciba lo que le corresponde con la documentación en regla.',
    },
    {
        h3: 'Sucesión Intestamentaria (Sin Testamento)',
        body: 'Cuando no hay testamento, lo que en México se llama sucesión intestamentaria, la ley establece quiénes son los herederos y en qué proporción heredan. El proceso es más largo porque requiere acreditar el parentesco de cada heredero y hay que seguir un procedimiento judicial o notarial para determinar quiénes tienen derecho a la herencia.',
        detail: 'En BCC manejamos sucesiones intestamentarias de principio a fin, reuniendo la documentación necesaria, tramitando la declaración de herederos y asegurando que el patrimonio quede correctamente distribuido y documentado.',
    },
    {
        h3: 'Adjudicación de Bienes Inmuebles por Herencia',
        body: 'Uno de los asuntos más frecuentes que atendemos es la adjudicación de propiedades que quedaron a nombre de un familiar fallecido, a veces hace décadas. Muchas familias en Durango viven en casas que legalmente siguen a nombre de los abuelos o de un padre fallecido, lo que complica futuras ventas, trámites o transmisiones.',
        detail: 'Regularizar esa propiedad mediante el proceso sucesorio correcto es posible y necesario. En BCC coordinamos los trámites ante notarías, el Poder Judicial del Estado de Durango y el Registro Público de la Propiedad para que la propiedad quede a nombre de quien corresponde.',
    },
    {
        h3: 'Conflictos entre Herederos',
        body: 'No todas las herencias se resuelven en armonía. Cuando hay desacuerdos entre hermanos, disputas sobre el valor de los bienes, herederos que no quieren participar en el proceso, o alguien que reclama derechos que no le corresponden, el proceso puede complicarse significativamente.',
        detail: 'En BCC buscamos siempre la vía del acuerdo y la mediación, es más rápida, menos costosa y menos desgastante para todos. Pero cuando no es posible, defendemos tus derechos ante el juzgado familiar del estado de Durango con firmeza y preparación.',
    },
    {
        h3: 'Herencias con Bienes en Durango y Otros Estados',
        body: 'Cuando el patrimonio del fallecido incluye bienes en más de un estado de la república, el proceso sucesorio se vuelve más complejo, hay que coordinar trámites en distintas jurisdicciones.',
        detail: 'En BCC manejamos estos casos y coordinamos con abogados en otras plazas cuando es necesario para que el proceso avance sin contratiempos.',
    },
];

const proceso = [
    {
        num: '1',
        title: 'Consulta inicial',
        desc: 'Evaluamos el caso: si hay testamento, qué bienes hay, quiénes son los posibles herederos y cuál es la mejor vía, notarial o judicial.',
    },
    {
        num: '2',
        title: 'Reunión de documentos',
        desc: 'Acta de defunción, identificaciones de herederos, actas que acrediten parentesco y documentos de los bienes (escrituras, facturas, estados de cuenta).',
    },
    {
        num: '3',
        title: 'Declaración de herederos',
        desc: 'Ante notario o juez, según el caso, se establece oficialmente quiénes tienen derecho a la herencia.',
    },
    {
        num: '4',
        title: 'Inventario de bienes',
        desc: 'Se identifican y valúan todos los bienes que forman parte de la herencia.',
    },
    {
        num: '5',
        title: 'Adjudicación',
        desc: 'Se formaliza la distribución de los bienes entre los herederos, con los documentos que acrediten la transferencia de cada bien.',
    },
    {
        num: '6',
        title: 'Inscripción y actualización de registros',
        desc: 'Las propiedades se inscriben a nombre de los nuevos propietarios en el Registro Público de Durango, los vehículos se retitulan, las cuentas se transfieren.',
    },
];

const errores = [
    {
        num: '1',
        title: 'Esperar demasiado tiempo para iniciar el proceso.',
        desc: 'La herencia no prescribe, pero entre más tiempo pasa, más difícil es reunir documentos, localizar a herederos y evitar conflictos. Actuar pronto facilita todo.',
    },
    {
        num: '2',
        title: 'Repartir los bienes de palabra entre la familia.',
        desc: 'Un acuerdo verbal entre herederos no tiene validez legal. Si la propiedad sigue a nombre del fallecido, ningún heredero puede venderla, hipotecarla o transmitirla sin haber hecho el proceso correcto.',
    },
    {
        num: '3',
        title: 'Perder documentos importantes.',
        desc: 'Las escrituras, el testamento, las actas de nacimiento y los estados de cuenta son esenciales. Si se pierden, recuperarlos puede tomar mucho tiempo y costo adicional.',
    },
    {
        num: '4',
        title: 'Asumir que solo el hijo mayor hereda.',
        desc: 'La ley mexicana establece con claridad quiénes son los herederos y en qué proporción, y no siempre coincide con lo que la familia asume. Conocer tus derechos desde el inicio evita sorpresas.',
    },
    {
        num: '5',
        title: 'No incluir todos los bienes en la herencia.',
        desc: 'Algunos herederos olvidan incluir cuentas bancarias, créditos por cobrar, vehículos o partes de negocios. Todo el patrimonio debe inventariarse correctamente.',
    },
    {
        num: '6',
        title: 'Intentar hacer el trámite sin asesoría para "ahorrar".',
        desc: 'Un error en el proceso sucesorio puede costar mucho más que los honorarios de un abogado, desde tener que repetir trámites hasta perder derechos sobre bienes importantes.',
    },
];

const checklist = [
    'Acta de defunción del fallecido',
    'Identificación oficial de todos los posibles herederos',
    'Actas de nacimiento que acrediten parentesco (hijos, nietos) o acta de matrimonio (cónyuge)',
    'Testamento, si existe (o información sobre si fue otorgado ante notario en Durango)',
    'Escrituras de propiedades inmuebles a nombre del fallecido',
    'Facturas de vehículos registrados a su nombre',
    'Estados de cuenta bancarios si los hay',
    'Documentos de cualquier negocio, crédito o bien adicional',
    'RFC del fallecido si está disponible',
    'Documentos del INFONAVIT o FOVISSSTE si aplica',
];

const faqs = [
    {
        q: '¿Cuánto tiempo tarda una sucesión en Durango?',
        a: 'Una sucesión testamentaria con documentos completos puede resolverse en pocos meses. Una intestamentaria con varios herederos o bienes complejos puede tomar más tiempo. En BCC te damos un estimado real desde la consulta inicial, nunca uno optimista que después resulte incumplible.',
    },
    {
        q: '¿Qué pasa si no hay testamento en Durango?',
        a: 'Se inicia una sucesión intestamentaria. La ley establece el orden de preferencia de los herederos: primero hijos y cónyuge, luego padres, luego hermanos, y así sucesivamente. El proceso requiere acreditar el parentesco de cada heredero ante notario o juez. Nosotros te guiamos en todo el trámite.',
    },
    {
        q: '¿Puedo heredar una propiedad que sigue a nombre de un abuelo fallecido hace 20 años?',
        a: 'Sí, es posible. Aunque el tiempo complica la reunión de documentos, existen vías legales para regularizar esa situación. Lo importante es empezar cuanto antes. Consúltanos y analizamos tu caso específico.',
    },
    {
        q: '¿Es obligatorio ir a juicio para una herencia en Durango?',
        a: 'No siempre. Muchas sucesiones se resuelven ante notario sin necesidad de ir a juzgado, especialmente cuando hay testamento y los herederos están de acuerdo. El proceso judicial aplica principalmente en sucesiones intestamentarias complejas o cuando hay conflictos entre herederos.',
    },
    {
        q: '¿Qué pasa si uno de los herederos no quiere participar en el proceso?',
        a: 'Es un caso frecuente y tiene solución legal. Un heredero no puede bloquear indefinidamente el proceso sucesorio. En BCC manejamos estas situaciones y te explicamos cuáles son tus opciones para avanzar.',
    },
    {
        q: '¿Puedo desheredar a alguien en México?',
        a: 'En México existen los llamados "herederos forzosos", principalmente hijos, cónyuge y ascendientes en algunos casos, a quienes la ley protege con una parte mínima de la herencia llamada "legítima". Desheredarlos completamente es posible solo bajo causas muy específicas establecidas en la ley. Te explicamos las opciones en consulta.',
    },
    {
        q: '¿Cuánto cuesta hacer una sucesión en Durango?',
        a: 'El costo depende del tipo de sucesión, el número de herederos, la cantidad y tipo de bienes, y si es notarial o judicial. Incluye honorarios del abogado, derechos notariales y costos de inscripción en el Registro Público. En BCC te damos un presupuesto claro desde el inicio. Llámanos al 618 149 2511.',
    },
    {
        q: '¿Pueden ayudarme a planear mi herencia en vida para evitarle problemas a mi familia?',
        a: 'Sí. La planeación patrimonial, hacer tu testamento y organizar tus bienes con anticipación, es una de las cosas más importantes que puedes hacer por tu familia. Es un proceso sencillo y relativamente económico que les ahorra mucho tiempo, costo y conflicto cuando llegue el momento.',
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

export default function SucesionesHerencias() {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'schema-sucesiones-herencias';
        script.textContent = JSON.stringify(schemaJSON);
        document.head.appendChild(script);
        return () => {
            const existing = document.getElementById('schema-sucesiones-herencias');
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
                                    Servicios · BCC Despacho Jurídico
                                </p>
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Abogado de Herencias en Durango:{' '}
                                    <span className="text-brand-red">
                                        Sucesiones con Acompañamiento Profesional y Humano
                                    </span>
                                </h1>
                                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                    Perder a un ser querido es uno de los momentos más difíciles de la vida. Lo
                                    último que una familia debería tener que enfrentar en ese momento es un proceso
                                    legal confuso, lento o lleno de conflictos.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                    En BCC Despacho Jurídico acompañamos a familias de Durango en el proceso de
                                    sucesión y herencia con la seriedad que merece el patrimonio familiar y la
                                    sensibilidad que requiere el momento. Sabemos que detrás de cada expediente hay
                                    personas que están pasando por un duelo, y eso define cómo trabajamos.
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
                                    ¿Qué es una Sucesión y Cuándo Necesitas un Abogado?
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Una sucesión es el proceso legal mediante el cual los bienes, derechos y
                                    obligaciones de una persona fallecida se transfieren a sus herederos. En México
                                    este proceso tiene reglas específicas que varían según si el fallecido dejó
                                    testamento o no, el tipo de bienes que hay que heredar y la situación familiar
                                    de los involucrados.
                                </p>
                                <p className="text-gray-700 font-semibold mb-4">
                                    Necesitas un abogado de herencias en Durango cuando:
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
                                        <strong>Actuar a tiempo es fundamental.</strong> Entre más tiempo pasa sin
                                        gestionar una herencia, más se complica, los documentos se pierden, las
                                        propiedades se deterioran y algunos trámites tienen plazos legales que conviene
                                        no vencer.
                                    </p>
                                </div>
                            </motion.div>

                            {/* ── H2: Tipos de sucesión ── */}
                            <div className="mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                    Tipos de Sucesión que Manejamos en BCC
                                </h2>
                                <p className="text-gray-600 mb-10 leading-relaxed">
                                    Cada caso de herencia es único. Conoce los tipos de sucesión que atendemos y
                                    cómo podemos acompañarte en cada uno.
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

                            {/* ── H2: ¿Cómo es el proceso? (6 pasos) ── */}
                            <div className="mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    ¿Cómo es el Proceso de una Herencia en Durango?
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Aunque cada caso es diferente, el proceso general de una sucesión en Durango
                                    sigue estos pasos. En BCC te acompañamos en cada uno de ellos y te mantenemos
                                    informado en todo momento.
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
                                    Errores Comunes que Complican una Herencia en Durango
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Estos son los problemas más frecuentes que vemos en casos de sucesión mal
                                    gestionados:
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
                                    Checklist: ¿Qué Documentos Necesitas para Iniciar una Sucesión?
                                </h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Reúne lo siguiente antes de tu consulta, si no tienes todo, no te preocupes,
                                    con lo que tengas podemos orientarte:
                                </p>
                                <ul className="space-y-3">
                                    {checklist.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="text-brand-red font-bold flex-shrink-0">✔</span>
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-100">
                                    <p className="text-sm text-red-800 font-medium">
                                        No necesitas todo para comenzar. Con lo que tengas en mano,{' '}
                                        <a
                                            href="https://wa.me/5216181492511"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline hover:no-underline"
                                        >
                                            contáctanos
                                        </a>{' '}
                                        y te orientamos en el siguiente paso.
                                    </p>
                                </div>
                            </motion.div>

                            {/* ── H2: FAQ ── */}
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                                    Preguntas Frecuentes sobre Herencias y Sucesiones en Durango
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
                                    Agenda tu Consulta con BCC Despacho Jurídico
                                </h2>
                                <p className="text-white text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
                                    Gestionar una herencia no tiene que ser una carga adicional en un momento ya
                                    difícil. Con el acompañamiento correcto, el proceso puede ser ordenado,
                                    transparente y mucho menos estresante de lo que imaginas.
                                </p>
                                <p className="text-white/90 text-base mb-6 max-w-xl mx-auto">
                                    En BCC manejamos tu caso con la experiencia legal que requiere y el trato humano
                                    que merece tu familia. Conocemos Durango, conocemos sus notarías y juzgados.
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
                                <div className="mt-8 pt-6 border-t border-white/20">
                                    <Link
                                        to="/servicios"
                                        className="text-white/80 text-sm hover:text-white transition-colors hover:underline"
                                    >
                                        ← Ver todos nuestros servicios jurídicos
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
