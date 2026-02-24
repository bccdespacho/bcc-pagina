import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import PageWrapper from '../../components/PageWrapper';

// --- Schema JSON-LD (page-specific: LegalService + FAQPage) ---

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
    serviceType: 'Contratos Civiles',
    description:
        'Redacción, revisión y formalización de contratos civiles en Durango: compraventa, arrendamiento, prestación de servicios y préstamos entre particulares.',
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://bccdespachojuridico.com/servicios/contratos-civiles',
    },
    hasFAQPage: {
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: '¿Un contrato verbal tiene validez legal en México?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sí, en principio los contratos verbales tienen validez legal en México, pero son difíciles de probar en caso de conflicto. Siempre recomendamos poner los acuerdos importantes por escrito.',
                },
            },
            {
                '@type': 'Question',
                name: '¿Necesito ir ante un notario para que mi contrato sea válido?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No siempre. Muchos contratos civiles son válidos sin notario. Sin embargo, en casos como compraventas de inmuebles, la escritura notarial es obligatoria o muy conveniente.',
                },
            },
            {
                '@type': 'Question',
                name: '¿Cuánto cuesta que BCC me redacte un contrato en Durango?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'El costo depende del tipo y complejidad del contrato. Contáctanos al 618 149 2511 para recibir un presupuesto claro antes de comprometerte.',
                },
            },
        ],
    },
};

// --- Data ---

const cuandoNecesitas = [
    'Vas a comprar o vender algo de valor, un auto, un terreno, equipo de trabajo, etc.',
    'Vas a rentar o arrendar una propiedad, ya seas arrendador o arrendatario',
    'Vas a prestar o pedir dinero a alguien, incluso a un familiar',
    'Vas a contratar o ser contratado para un servicio específico, como obra, consultoría, mantenimiento, etc.',
    'Vas a formalizar un acuerdo entre socios o particulares, donde cada parte tiene derechos y obligaciones',
    'Ya tienes un contrato pero no estás seguro de lo que firmaste',
];

const tiposDeContrato = [
    {
        h3: 'Contratos de Compraventa',
        body: 'Son los más comunes, y también los que más conflictos generan cuando están mal redactados. Un contrato de compraventa debe especificar con precisión qué se vende, en qué condiciones, a qué precio, en qué plazos y qué pasa si alguna de las partes incumple.',
        detail: 'En BCC redactamos y revisamos contratos de compraventa de bienes muebles e inmuebles en Durango, asegurándonos de que cada cláusula te proteja a ti, no a la otra parte.',
    },
    {
        h3: 'Contratos de Arrendamiento',
        body: 'Ya seas propietario que renta su inmueble o inquilino que busca proteger sus derechos, un contrato de arrendamiento bien redactado define claramente las reglas del juego: renta, plazos, depósitos, uso del inmueble, causas de rescisión y obligaciones de cada parte.',
        detail: 'Conocemos la realidad del mercado inmobiliario en Durango y redactamos contratos que son justos, claros y ejecutables si surge algún conflicto.',
    },
    {
        h3: 'Contratos de Prestación de Servicios',
        body: 'Si ofreces servicios profesionales o los contratas, desde obra civil hasta servicios de consultoría, necesitas un contrato que especifique qué se entrega, cuándo, a qué costo y qué pasa si algo falla. Sin ese respaldo, cualquier desacuerdo se convierte en "tu palabra contra la mía".',
        detail: 'En BCC te ayudamos a formalizar acuerdos de servicios que protejan tu trabajo y tu inversión.',
    },
    {
        h3: 'Contratos de Mutuo (Préstamos entre Particulares)',
        body: 'Prestar dinero a un familiar o amigo sin documento es una de las formas más comunes de perder dinero, y amistades. Un contrato de mutuo establece el monto, los plazos de pago, los intereses si aplican, y qué recurso legal tienes si la persona no cumple.',
        detail: 'Si vas a prestar o pedir dinero de forma significativa, hazlo bien desde el principio.',
    },
    {
        h3: 'Otros Contratos Civiles',
        body: 'También manejamos: contratos de donación, contratos de comodato (préstamo de uso), convenios de cesión de derechos, contratos de asociación civil, y modificaciones y adendas a contratos existentes.',
        detail: 'Si tienes un tipo de contrato que no aparece aquí, consúltanos, lo más probable es que podamos ayudarte.',
    },
];

const quehaceBCC = [
    'Redactamos contratos desde cero adaptados a tu caso',
    'Revisamos contratos que ya te presentaron antes de que firmes',
    'Negociamos modificaciones con la otra parte si hay cláusulas problemáticas',
    'Formalizamos contratos ante notario cuando el caso lo requiere',
    'Explicamos cada sección en lenguaje claro para que sepas exactamente qué estás firmando',
];

const erroresComunes = [
    {
        num: '1',
        title: 'Falta de identificación precisa de las partes.',
        desc: 'Muchos contratos no incluyen datos completos, nombre completo, RFC, domicilio, lo que complica cualquier acción legal posterior.',
    },
    {
        num: '2',
        title: 'Plazos ambiguos o sin fecha exacta.',
        desc: '"En cuanto pueda", "a la brevedad", "cuando se entregue el inmueble", estas frases crean conflictos. Los contratos deben tener fechas concretas.',
    },
    {
        num: '3',
        title: 'Sin cláusula de incumplimiento.',
        desc: '¿Qué pasa si una parte no cumple? Si el contrato no lo dice, es muy difícil reclamar. Esta cláusula es esencial y con frecuencia se omite.',
    },
    {
        num: '4',
        title: 'Contratos genéricos descargados de internet.',
        desc: 'Las plantillas genéricas no consideran la legislación local de Durango ni las particularidades del caso. Lo que funciona en otro estado puede no ser válido aquí.',
    },
    {
        num: '5',
        title: 'Firmas sin testigos ni fecha.',
        desc: 'Un contrato sin testigos o sin fecha puede ser impugnado fácilmente en un juzgado.',
    },
    {
        num: '6',
        title: 'No especificar la jurisdicción.',
        desc: 'En caso de conflicto, ¿ante qué juzgado se dirime? Si el contrato no lo dice, puede complicarse determinar quién tiene competencia.',
    },
];

const checklist = [
    'Nombre completo, RFC y domicilio de ambas partes',
    'Descripción clara y detallada del objeto del contrato',
    'Precio o contraprestación exacta y forma de pago',
    'Fechas y plazos concretos',
    'Obligaciones específicas de cada parte',
    'Consecuencias claras en caso de incumplimiento',
    'Cláusula de rescisión y sus condiciones',
    'Jurisdicción en caso de disputa (Durango, Dgo.)',
    'Firma de ambas partes con fecha',
    'Testigos o ratificación ante notario si aplica',
];

const faqs = [
    {
        q: '¿Un contrato verbal tiene validez legal en México?',
        a: 'Sí, en principio los contratos verbales tienen validez legal en México. El problema es la prueba, si hay un conflicto, es muy difícil demostrar lo que se acordó sin un documento. Por eso siempre recomendamos poner los acuerdos importantes por escrito.',
    },
    {
        q: '¿Necesito ir ante un notario para que mi contrato sea válido?',
        a: 'No siempre. Muchos contratos civiles son válidos sin notario, por ejemplo, un contrato de arrendamiento o de servicios. Sin embargo, hay casos donde la escritura notarial es obligatoria o muy conveniente, como en compraventas de inmuebles. Te orientamos según tu caso específico.',
    },
    {
        q: '¿Cuánto cuesta que BCC me redacte un contrato?',
        a: 'El costo depende del tipo y complejidad del contrato. Contáctanos al 618 149 2511 para darte un presupuesto claro antes de comprometerte.',
    },
    {
        q: '¿Puedo pedirles que revisen un contrato que ya me presentaron?',
        a: 'Sí, y de hecho lo recomendamos antes de firmar cualquier documento importante. Revisamos el contrato, te explicamos qué dice cada cláusula y te alertamos sobre cualquier punto que pueda perjudicarte.',
    },
    {
        q: '¿Qué pasa si la otra parte no cumple con el contrato?',
        a: 'Dependiendo de lo que diga el contrato, puedes exigir el cumplimiento forzoso, pedir una compensación económica o rescindir el acuerdo. En BCC te asesoramos en ese proceso.',
    },
    {
        q: '¿Pueden redactar contratos para negocios pequeños en Durango?',
        a: 'Absolutamente. Trabajamos con emprendedores, comerciantes y pequeñas empresas que necesitan formalizar acuerdos con clientes, proveedores o socios. Un buen contrato es la base de cualquier relación comercial sana.',
    },
    {
        q: '¿Cuánto tiempo tarda en estar listo un contrato?',
        a: 'Un contrato estándar puede estar listo en pocos días hábiles. Si el caso es más complejo o requiere negociación con la otra parte, puede tomar un poco más. Siempre te damos un estimado desde el inicio.',
    },
    {
        q: '¿Atienden contratos relacionados con propiedades en Durango?',
        a: 'Sí. Los contratos de compraventa o arrendamiento de inmuebles los manejamos de manera coordinada con nuestra área de propiedad y bienes raíces para asegurarnos de que todo esté en regla.',
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

export default function ContratosCiviles() {
    // Inject page-specific Schema JSON-LD
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'schema-contratos-civiles';
        script.textContent = JSON.stringify(schemaJSON);
        document.head.appendChild(script);
        return () => {
            const existing = document.getElementById('schema-contratos-civiles');
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
                                    Contratos Civiles en Durango:{' '}
                                    <span className="text-brand-red">
                                        Protege tus Acuerdos con Asesoría Legal Profesional
                                    </span>
                                </h1>
                                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                    Un acuerdo de palabra puede bastar entre amigos. Pero cuando hay dinero,
                                    propiedades o responsabilidades importantes de por medio, un contrato bien
                                    redactado no es un lujo, es tu mejor protección.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                    En BCC Despacho Jurídico ayudamos a personas y pequeños empresarios de Durango
                                    a formalizar sus acuerdos de manera clara, legal y sin ambigüedades. Porque un
                                    contrato mal hecho no solo no te protege, a veces actúa en tu contra.
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

                            {/* ── H2: ¿Cuándo necesitas un contrato? ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    ¿Cuándo Necesitas un Contrato Civil?
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Mucha gente en Durango firma contratos sin leerlos bien, o peor, hace acuerdos
                                    sin ningún documento de respaldo. Las consecuencias pueden ir desde malentendidos
                                    menores hasta conflictos legales costosos y difíciles de resolver.
                                </p>
                                <p className="text-gray-700 font-semibold mb-4">Necesitas un contrato civil cuando:</p>
                                <ul className="space-y-3">
                                    {cuandoNecesitas.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="w-2 h-2 rounded-full bg-brand-red mt-2.5 flex-shrink-0" />
                                            <span className="text-gray-700 leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-500 text-sm mt-6 leading-relaxed">
                                    En cualquiera de estos casos, hablar con un abogado antes de firmar puede
                                    ahorrarte mucho tiempo, dinero y conflictos innecesarios.
                                </p>
                            </motion.div>

                            {/* ── H2: Tipos de contratos ── */}
                            <div className="mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                    Tipos de Contratos Civiles que Manejamos en BCC
                                </h2>
                                <p className="text-gray-600 mb-10 leading-relaxed">
                                    Cada tipo de contrato tiene sus propias exigencias legales, cláusulas clave y
                                    riesgos si se omite algo importante. Aquí es donde la experiencia local marca
                                    la diferencia.
                                </p>
                                <div className="space-y-6">
                                    {tiposDeContrato.map((t, i) => (
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

                            {/* ── H2: ¿Qué hace BCC? ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-xl p-8 md:p-10 mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    ¿Qué Hace BCC por Ti en Materia de Contratos?
                                </h2>
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    Nuestro trabajo no es solo redactar un documento que "se vea legal". Es entender
                                    tu situación específica y asegurarnos de que el contrato refleje exactamente lo
                                    que acordaste, con las cláusulas correctas para protegerte si algo sale mal.
                                </p>
                                <ul className="space-y-3">
                                    {quehaceBCC.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="text-brand-red font-bold mt-0.5 flex-shrink-0">✔</span>
                                            <span className="text-gray-200 leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-400 text-sm mt-6">
                                    El proceso es sencillo: nos traes la situación, nosotros te traemos la solución
                                    en papel.
                                </p>
                            </motion.div>

                            {/* ── H2: Errores comunes ── */}
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Errores Comunes en Contratos que Vemos en Durango
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Después de años atendiendo casos en Durango, estos son los problemas más
                                    frecuentes que encontramos en contratos mal elaborados:
                                </p>
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: '-60px' }}
                                    className="space-y-4"
                                >
                                    {erroresComunes.map((e) => (
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
                                    Checklist: ¿Tu Contrato Está Bien Hecho?
                                </h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Antes de firmar cualquier contrato en Durango, verifica que incluya:
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
                                        Si tu contrato no cumple con varios de estos puntos, es mejor revisarlo antes
                                        de firmarlo.{' '}
                                        <a href="https://wa.me/5216181492511" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                                            Contáctanos aquí.
                                        </a>
                                    </p>
                                </div>
                            </motion.div>

                            {/* ── H2: FAQ ── */}
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                                    Preguntas Frecuentes sobre Contratos Civiles en Durango
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
                                    Un buen contrato es la diferencia entre un acuerdo que funciona y uno que se
                                    convierte en un problema. No dejes algo tan importante al azar, o a una
                                    plantilla descargada de internet.
                                </p>
                                <p className="text-white/90 text-base mb-6 max-w-xl mx-auto">
                                    En BCC estamos listos para ayudarte a proteger tus acuerdos con el conocimiento
                                    del contexto legal de Durango que marca la diferencia.
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
