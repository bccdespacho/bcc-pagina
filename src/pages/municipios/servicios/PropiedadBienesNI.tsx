import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import PageWrapper from '../../../components/PageWrapper';

// --- Schema JSON-LD (page-specific: LegalService + FAQPage) ---
const schemaJSON = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Asesoría Jurídica e Inmobiliaria BCC - Nuevo Ideal',
    url: 'https://bccdespachojuridico.com/municipios/nuevo-ideal/servicios/propiedad-bienes',
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
    serviceType: 'Propiedad y Bienes Inmuebles',
    description: 'Asesoría legal en compraventa, regularización de propiedades, conflictos de posesión y trámites ante el Registro Público de la Propiedad en Nuevo Ideal.',
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://bccdespachojuridico.com/municipios/nuevo-ideal/servicios/propiedad-bienes',
    },
    hasFAQPage: {
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: '¿Cómo verifico que una propiedad en Nuevo Ideal no tenga problemas legales?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'La verificación se hace en el Registro Público de la Propiedad y en el padrón catastral municipal. En BCC realizamos esta verificación como parte del proceso de asesoría en compraventa.',
                },
            },
            {
                '@type': 'Question',
                name: '¿Puedo comprar una propiedad sin escrituras en Nuevo Ideal?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Es posible pero implica riesgos importantes. Sin escritura el vendedor no puede acreditar legalmente su propiedad. Es fundamental analizar la situación con un abogado antes de comprometerse.',
                },
            },
            {
                '@type': 'Question',
                name: '¿Es necesario un abogado para comprar una casa en Nuevo Ideal o basta con el notario?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'El notario da fe pública de la operación, pero un abogado trabaja específicamente para proteger tus intereses, revisa el contrato, verifica el título y detecta problemas. Son roles complementarios.',
                },
            },
        ],
    },
};

// --- Data ---
const quePuedesResolver = [
    'Comprar o vender una casa, departamento o terreno en Nuevo Ideal',
    'Regularizar una propiedad que no tiene escrituras o que está a nombre de otra persona',
    'Resolver un conflicto de posesión, cuando alguien ocupa tu terreno o viceversa',
    'Aclarar los límites de un predio con un vecino',
    'Transferir una propiedad por donación entre familiares',
    'Tramitar una escritura',
    'Inscribir una propiedad en el Registro Público de la Propiedad',
    'Verificar que una propiedad que quieres comprar no tenga gravámenes, adeudos o conflictos legales',
];

const servicios = [
    {
        h3: 'Compraventa de Inmuebles',
        body: 'Una transacción inmobiliaria involucra mucho más que un precio y un apretón de manos. Antes de que el dinero cambie de manos, hay que verificar que el inmueble esté libre de gravámenes, que el vendedor sea realmente el propietario legal, que el contrato proteja a ambas partes y que la escritura quede debidamente inscrita.',
        detail: 'En BCC acompañamos todo el proceso de compraventa, desde la revisión del título hasta la firma ante notario y la inscripción en el Registro Público. Así tienes la certeza de que lo que compraste realmente es tuyo.',
    },
    {
        h3: 'Regularización de Propiedades',
        body: 'Muchas familias viven en terrenos o casas que nunca se escrituraron correctamente, heredados de generación en generación, comprados de palabra, o con documentos incompletos. Regularizar esa propiedad es posible, pero requiere conocer exactamente qué vía aplica según el caso.',
        detail: 'En BCC analizamos tu situación específica y te decimos con claridad qué opciones tienes para regularizar tu propiedad en Nuevo Ideal. No hay dos casos iguales, y la ruta correcta depende de factores como el tiempo de posesión, los documentos disponibles y el tipo de predio.',
    },
    {
        h3: 'Conflictos de Posesión y Límites',
        body: 'Los conflictos entre vecinos por terrenos o límites de predios son más comunes de lo que parece, especialmente en zonas periféricas o en propiedades heredadas donde los linderos nunca quedaron bien definidos.',
        detail: 'En BCC manejamos estos conflictos buscando siempre la vía más ágil: primero la negociación y el acuerdo, y si no es posible, la defensa de tus derechos ante el juzgado correspondiente. El objetivo siempre es resolver, no prolongar.',
    },
    {
        h3: 'Donación de Bienes Inmuebles',
        body: 'Donar una propiedad a un hijo, cónyuge u otro familiar es una decisión frecuente en la planeación patrimonial familiar. Para que sea válida y no genere conflictos futuros, la donación debe formalizarse correctamente, ante notario e inscrita en el Registro Público.',
        detail: 'Te ayudamos a hacer este proceso de manera correcta, considerando también las implicaciones fiscales que puede tener.',
    },
    {
        h3: 'Trámites ante el Registro Público de la Propiedad',
        body: 'El Registro Público de la Propiedad es la institución que da certeza jurídica a la propiedad inmobiliaria. Inscribir correctamente tu propiedad ahí es fundamental, una propiedad no inscrita puede generar conflictos de doble venta, reclamaciones de terceros o problemas en futuras transacciones.',
        detail: 'En BCC conocemos los requisitos, tiempos y procedimientos del Registro, lo que nos permite gestionar tus trámites sin contratiempos ni demoras innecesarias.',
    },
];

const riesgos = [
    { riesgo: 'Comprar sin verificar el título', consecuencia: 'Descubrir después que la propiedad tiene un adeudo o gravamen' },
    { riesgo: 'Firmar un contrato sin revisión', consecuencia: 'Quedar en desventaja legal si surge un conflicto' },
    { riesgo: 'No inscribir en el Registro Público', consecuencia: 'Que un tercero reclame derechos sobre la propiedad' },
    { riesgo: 'Regularizar sin asesoría', consecuencia: 'Elegir la vía incorrecta y perder tiempo y dinero' },
    { riesgo: 'Donar sin formalizar', consecuencia: 'Que la donación sea impugnable en el futuro' },
];

const errores = [
    {
        num: '1',
        title: 'No verificar el estado jurídico de la propiedad antes de comprar.',
        desc: 'Antes de cualquier pago, hay que revisar que la propiedad no tenga gravámenes, embargos, adeudos fiscales o litigios pendientes. Esto se verifica en el Registro Público y en el padrón catastral municipal.',
    },
    {
        num: '2',
        title: 'Pagar un "enganche" sin contrato firmado.',
        desc: 'Dar dinero antes de formalizar cualquier acuerdo es un error frecuente, y uno que puede ser muy difícil de recuperar si el trato se cae.',
    },
    {
        num: '3',
        title: 'Comprar con un simple recibo.',
        desc: 'Un recibo de pago no es un contrato de compraventa ni una escritura. Sin los documentos correctos, no tienes certeza legal sobre la propiedad.',
    },
    {
        num: '4',
        title: 'No actualizar el nombre en escrituras tras una herencia.',
        desc: 'Muchas propiedades siguen a nombre de personas fallecidas. Esto complica futuras ventas y puede generar conflictos entre herederos.',
    },
    {
        num: '5',
        title: 'Confiar en que "ya tiene muchos años viviendo ahí".',
        desc: 'El tiempo de posesión puede ser un factor legal, pero no sustituye a la documentación correcta. La regularización requiere un proceso formal.',
    },
];

const checklist = [
    'El vendedor tiene escritura a su nombre',
    'La propiedad no tiene gravámenes, hipotecas ni embargos',
    'No hay litigios activos sobre el inmueble',
    'El predio no tiene adeudos de predial en Nuevo Ideal',
    'Los límites del terreno están claros y documentados',
    'Existe un contrato de compraventa redactado por un abogado',
    'El contrato especifica precio, forma de pago, plazos y consecuencias de incumplimiento',
    'La escritura se firmará ante notario',
    'Se inscribirá la operación en el Registro Público',
];

const faqs = [
    {
        q: '¿Cómo verifico que una propiedad en Nuevo Ideal no tenga problemas legales?',
        a: 'La verificación se hace principalmente en el Registro Público, donde puedes consultar si hay gravámenes, hipotecas o conflictos registrados. También es importante revisar el estado catastral y fiscal del inmueble. En BCC hacemos esta verificación por ti como parte del proceso de asesoría en compraventa.',
    },
    {
        q: '¿Puedo comprar una propiedad que no tiene escrituras?',
        a: 'Es posible, pero implica riesgos significativos. Sin escritura, el vendedor no puede acreditar legalmente que es el propietario. En estos casos, hay que analizar muy bien la situación antes de proceder y definir si primero se regulariza o si hay otra vía. Consúltanos antes de comprometerte.',
    },
    {
        q: '¿Cuánto tarda regularizar una propiedad en Nuevo Ideal?',
        a: 'Depende del tipo de regularización y la situación del inmueble. Algunos procesos pueden resolverse en meses, otros pueden tomar más tiempo dependiendo de la complejidad jurídica y los trámites necesarios. Te damos un estimado real desde la consulta inicial.',
    },
    {
        q: '¿Es necesario un abogado para comprar una casa o basta con el notario?',
        a: 'El notario da fe pública de la operación pero no necesariamente revisa todos los aspectos jurídicos en beneficio del comprador. Un abogado trabaja para proteger tus intereses específicamente, revisa el contrato, verifica el título, detecta problemas y te asesora en cada decisión. Son roles complementarios, no sustitutos.',
    },
    {
        q: '¿Qué pasa si compré una propiedad y ahora alguien dice que es suya?',
        a: 'Es un conflicto de posesión o de doble venta, ambos son situaciones que se pueden atender legalmente. Lo primero es no ceder ni hacer nada sin asesoría. Contáctanos de inmediato y analizamos tu caso.',
    },
    {
        q: '¿Pueden ayudarme a poner una propiedad a nombre de mis hijos?',
        a: 'Sí, esto puede hacerse mediante donación en vida o mediante testamento. Cada vía tiene implicaciones legales y fiscales diferentes. Te explicamos cuál es la más conveniente según tu situación.',
    },
    {
        q: '¿Qué documentos necesito para iniciar un trámite de propiedad con BCC?',
        a: 'En general: identificación oficial, la escritura o documento que acredite la propiedad o posesión, y cualquier contrato o acuerdo previo relacionado. Si no tienes todos los documentos, no te preocupes, con lo que tengas podemos orientarte en consulta.',
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
export default function PropiedadBienesNI() {
    useEffect(() => {
        document.title = "Abogado Inmobiliario en Nuevo Ideal | Propiedades | BCC";

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", "Asesoría en compraventa y regularización de propiedades en Nuevo Ideal, Dgo. Protegemos tu patrimonio con servicios inmobiliarios profesionales.");
        }

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'schema-propiedad-bienes-ni';
        script.textContent = JSON.stringify(schemaJSON);
        document.head.appendChild(script);

        return () => {
            const existing = document.getElementById('schema-propiedad-bienes-ni');
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
                                    Seguridad Inmobiliaria en Nuevo Ideal:{' '}
                                    <span className="text-brand-red">
                                        Compraventa, Regularización y Conflictos de Bienes Inmuebles
                                    </span>
                                </h1>
                                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                    Comprar o vender una propiedad en Nuevo Ideal es una de las decisiones económicas
                                    más importantes que vas a tomar. Y como cualquier decisión importante,
                                    merece hacerse bien, con los documentos correctos, los pasos en el orden correcto
                                    y la asesoría adecuada.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    En BCC Asesoría Jurídica e Inmobiliaria acompañamos a compradores, vendedores y propietarios en
                                    todo tipo de asuntos relacionados con bienes inmuebles en Nuevo Ideal.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
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

                            {/* ── H2: ¿Qué asuntos puedes resolver? ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    ¿Qué Asuntos Inmobiliarios Puedes Resolver con BCC?
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Los asuntos inmobiliarios son más variados de lo que parece. Estos son los más
                                    comunes que atendemos en Nuevo Ideal:
                                </p>
                                <ul className="space-y-3">
                                    {quePuedesResolver.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="w-2 h-2 rounded-full bg-brand-red mt-2.5 flex-shrink-0" />
                                            <span className="text-gray-700 leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-500 text-sm mt-6 leading-relaxed">
                                    Si tu situación encaja en alguna de estas, o si simplemente tienes dudas sobre
                                    una propiedad, una consulta con nosotros puede ahorrarte problemas serios más
                                    adelante.
                                </p>
                            </motion.div>

                            {/* ── H2: Nuestros servicios ── */}
                            <div className="mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                    Nuestros Servicios Inmobiliarios
                                </h2>
                                <p className="text-gray-600 mb-10 leading-relaxed">
                                    Cada asunto inmobiliario tiene sus propias exigencias legales. Aquí te
                                    explicamos en qué consiste cada servicio y cómo BCC puede ayudarte.
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
                                            className="bg-white rounded-2xl shadow border border-gray-100 p-7 hover:shadow-md transition-shadow duration-300"
                                        >
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">{s.h3}</h3>
                                            <p className="text-gray-600 leading-relaxed mb-2">{s.body}</p>
                                            <p className="text-gray-500 text-sm leading-relaxed">{s.detail}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* ── H2: ¿Por qué asesoría legal? (Tabla de riesgos) ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                                className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl shadow-xl p-8 md:p-10 mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                    ¿Por Qué es Crítico Tener Asesoría en Transacciones Inmobiliarias?
                                </h2>
                                <p className="text-gray-300 leading-relaxed mb-8">
                                    Muchas personas intentan hacer transacciones inmobiliarias sin abogado para
                                    ahorrarse honorarios. El resultado, con frecuencia, es mucho más costoso.
                                    Estos son los riesgos más comunes de no tener asesoría:
                                </p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-700">
                                                <th className="text-left py-3 pr-6 text-gray-400 font-medium">Riesgo</th>
                                                <th className="text-left py-3 text-brand-red font-semibold">Consecuencia posible</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {riesgos.map((r) => (
                                                <tr key={r.riesgo} className="border-b border-gray-700/50 last:border-0">
                                                    <td className="py-3 pr-6 text-gray-300 font-medium align-top">{r.riesgo}</td>
                                                    <td className="py-3 text-gray-400 align-top">{r.consecuencia}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <p className="text-gray-400 text-sm mt-6 leading-relaxed">
                                    La asesoría legal en asuntos inmobiliarios no es un gasto, es una inversión
                                    que protege lo que probablemente es tu bien más valioso.
                                </p>
                            </motion.div>

                            {/* ── H2: Errores frecuentes ── */}
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Errores Frecuentes al Comprar o Vender
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    En nuestra práctica vemos los mismos errores repetirse una y otra vez.
                                    Los más comunes:
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

                            {/* ── H2: Checklist ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                    Checklist: Antes de Comprar o Vender
                                </h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Si estás por cerrar una operación inmobiliaria en Nuevo Ideal, verifica estos puntos:
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
                                        Si alguno de estos puntos no está cubierto, es momento de hablar con nosotros
                                        antes de continuar.{' '}
                                        <a
                                            href="https://wa.me/5216181492511"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="underline hover:no-underline"
                                        >
                                            Contáctanos aquí.
                                        </a>
                                    </p>
                                </div>
                            </motion.div>

                            {/* ── H2: FAQ ── */}
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                                    Preguntas Frecuentes Inmobiliarias
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
                                    Agenda tu Consulta en Nuevo Ideal
                                </h2>
                                <p className="text-white text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
                                    Tu propiedad es uno de los activos más importantes que tienes. No la dejes en
                                    manos del azar o de acuerdos informales.
                                </p>
                                <p className="text-white/90 text-base mb-6 max-w-xl mx-auto">
                                    En BCC estamos listos para asegurar que tu patrimonio esté protegido como merece.
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
