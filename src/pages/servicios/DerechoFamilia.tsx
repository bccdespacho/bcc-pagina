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
    serviceType: 'Derecho de Familia',
    description:
        'Asesoría legal en divorcios, custodia de menores, pensiones alimenticias, reconocimiento de paternidad, violencia familiar y adopciones en Durango.',
    mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://bccdespachojuridico.com/servicios/derecho-familia',
    },
    hasFAQPage: {
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: '¿Cuánto tarda un divorcio en Durango?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Un divorcio de mutuo acuerdo ante notario puede resolverse en semanas. Ante juez con acuerdo puede tomar algunos meses. Un divorcio contencioso puede extenderse más dependiendo del conflicto.',
                },
            },
            {
                '@type': 'Question',
                name: '¿Puedo divorciarme aunque mi pareja no quiera en México?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sí. En México existe el divorcio incausado que permite a cualquiera de las partes pedir el divorcio sin que la otra esté de acuerdo. Lo que se discute ante el juez es la custodia, pensión y bienes.',
                },
            },
            {
                '@type': 'Question',
                name: '¿Qué pasa si mi ex no paga la pensión alimenticia en Durango?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'El incumplimiento tiene consecuencias legales serias: embargo de bienes, descuento de nómina y puede constituir el delito de abandono de familia. En BCC te asesoramos para hacer cumplir la obligación.',
                },
            },
            {
                '@type': 'Question',
                name: '¿La madre siempre obtiene la custodia en México?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No. La ley mexicana no establece preferencia por género. El criterio principal es el interés superior del menor. La custodia compartida es cada vez más común en Durango.',
                },
            },
        ],
    },
};

// --- Data ---

const cuandoNecesitas = [
    'Quieres divorciarte y no sabes cuál es el proceso más conveniente para tu caso',
    'Hay un conflicto sobre quién tiene la custodia de tus hijos',
    'Tu ex pareja no está cumpliendo con la pensión alimenticia acordada',
    'Quieres establecer o modificar una pensión alimenticia de manera formal',
    'Necesitas reconocer legalmente la paternidad de un hijo',
    'Estás en una situación de violencia familiar y necesitas protección legal',
    'Quieres iniciar un proceso de adopción',
    'Tienes un acuerdo verbal con tu ex pareja que necesita formalizarse',
];

const servicios = [
    {
        h3: 'Divorcio en Durango',
        body: 'El divorcio es uno de los procesos legales más comunes y al mismo tiempo uno de los más mal entendidos. En México existen distintas vías según la situación de la pareja, y no todas implican un juicio largo y costoso.',
        variantes: [
            {
                titulo: 'Ante notario (mutuo acuerdo sin hijos ni bienes en disputa)',
                desc: 'Cuando ambas partes están de acuerdo y no hay menores de edad o bienes en disputa, el divorcio puede tramitarse directamente ante un notario público en Durango. Es la vía más rápida y menos costosa.',
            },
            {
                titulo: 'Ante juez con acuerdo (cuando hay hijos o bienes)',
                desc: 'Si hay hijos menores o bienes que repartir pero ambas partes están de acuerdo, el proceso se lleva ante un juez familiar. Se requiere un convenio que regule custodia, pensión, visitas y división de bienes.',
            },
            {
                titulo: 'Divorcio incausado (unilateral)',
                desc: 'Cualquiera de las partes puede pedir el divorcio sin demostrar causa. El juez lo concede aunque la otra parte no esté de acuerdo, lo que sí se discute es la custodia, la pensión y los bienes.',
            },
        ],
        detail: 'En BCC analizamos tu situación específica y te recomendamos la vía más conveniente para ti, la más rápida, la menos costosa y la que mejor proteja tus intereses y los de tus hijos.',
    },
    {
        h3: 'Custodia y Guarda de Menores',
        body: 'La custodia de los hijos es, con frecuencia, el punto más sensible de un proceso de separación. En México la ley privilegia siempre el interés superior del menor, y eso es exactamente lo que debe guiar cualquier acuerdo o decisión judicial.',
        bullets: [
            'Establecer un convenio de custodia compartida o exclusiva que funcione en la práctica',
            'Definir un régimen de visitas claro y realista para el padre o madre no custodio',
            'Modificar una custodia ya establecida cuando las circunstancias han cambiado',
            'Defender tu derecho a la custodia cuando hay un conflicto con la otra parte',
            'Actuar cuando un progenitor incumple los términos de visita o custodia acordados',
        ],
        detail: 'Siempre buscamos primero el acuerdo entre las partes. Pero cuando no es posible, defendemos tu posición con toda la solidez legal necesaria ante los juzgados familiares del estado de Durango.',
    },
    {
        h3: 'Pensión Alimenticia',
        body: 'La pensión alimenticia no es opcional, es una obligación legal del progenitor que no tiene la custodia hacia sus hijos, y en algunos casos también hacia el cónyuge. Establecerla correctamente desde el inicio evita conflictos futuros.',
        bullets: [
            'Calcular y formalizar una pensión alimenticia justa y proporcional a los ingresos del obligado',
            'Hacer cumplir una pensión que no se está pagando, incluyendo las vías coercitivas de la ley',
            'Modificar una pensión cuando las circunstancias económicas han cambiado',
            'Reclamar pensiones alimenticias atrasadas o adeudadas',
        ],
        detail: 'El incumplimiento de la pensión alimenticia tiene consecuencias legales serias en México, incluyendo el embargo de bienes y cuentas bancarias.',
    },
    {
        h3: 'Reconocimiento de Paternidad',
        body: 'El reconocimiento de paternidad es el acto legal mediante el cual un padre reconoce a su hijo y asume las responsabilidades que eso implica, incluyendo el derecho del menor a llevar su apellido, a recibir alimentos y a heredar.',
        detail: 'Cuando este reconocimiento no se hace de manera voluntaria, existen vías legales para establecerlo, incluyendo la prueba de ADN como elemento probatorio. En BCC manejamos estos procesos con la discreción y firmeza que el caso requiere.',
    },
    {
        h3: 'Violencia Familiar y Medidas de Protección',
        body: 'Si estás en una situación de violencia familiar, lo primero es tu seguridad y la de tus hijos. La ley en Durango establece mecanismos de protección urgente que pueden activarse con rapidez, órdenes de restricción, separación del agresor del domicilio familiar y otras medidas cautelares.',
        detail: 'En BCC te orientamos sobre tus derechos, te acompañamos en el proceso legal y actuamos con la urgencia que la situación requiere. No tienes que enfrentar esto solo.',
        urgente: true,
    },
    {
        h3: 'Adopción',
        body: 'La adopción es un proceso legal que cambia vidas, y precisamente por eso debe hacerse con toda la rigurosidad que merece. En BCC te acompañamos en el proceso de adopción en Durango, desde los requisitos iniciales hasta la resolución judicial que establece el vínculo filial definitivo.',
        detail: 'Te orientamos sobre los tiempos reales, los documentos necesarios y los pasos ante el DIF Durango y el Poder Judicial del Estado.',
    },
];

const comoTrabajamos = [
    {
        titulo: 'Escucha sin juicio',
        desc: 'Antes de cualquier estrategia legal, escuchamos tu situación completa. Sin juicios, sin suposiciones, sin prisa.',
    },
    {
        titulo: 'Claridad sobre el proceso',
        desc: 'Te explicamos exactamente qué implica tu caso, cuánto puede tomar, cuánto puede costar y qué opciones tienes, con honestidad, aunque no sea lo que quisieras escuchar.',
    },
    {
        titulo: 'Búsqueda del acuerdo como primera opción',
        desc: 'Cuando hay hijos de por medio especialmente, un acuerdo entre las partes es casi siempre mejor que un juicio, más rápido, menos costoso y menos traumático para los menores.',
    },
    {
        titulo: 'Firmeza cuando el acuerdo no es posible',
        desc: 'Cuando la otra parte no colabora o actúa de mala fe, defendemos tus derechos con toda la herramienta legal disponible ante los juzgados familiares de Durango.',
    },
    {
        titulo: 'Comunicación constante',
        desc: 'Tu caso no se queda en silencio. Te mantenemos informado en cada etapa, sin que tengas que andar persiguiendo una llamada.',
    },
];

const tablaInfo = [
    { situacion: 'Divorcio con hijos', saber: 'La custodia, visitas y pensión deben quedar definidas en el convenio o sentencia' },
    { situacion: 'Pensión alimenticia', saber: 'Se calcula en proporción a ingresos del obligado y necesidades del menor' },
    { situacion: 'Custodia compartida', saber: 'Es posible y cada vez más común, requiere acuerdo o resolución judicial' },
    { situacion: 'Violencia familiar', saber: 'Hay medidas de protección urgente disponibles, no esperes a que escale' },
    { situacion: 'Divorcio ante notario', saber: 'Solo aplica si no hay menores o bienes en disputa y ambas partes acuerdan' },
];

const errores = [
    {
        num: '1',
        title: 'Llegar a acuerdos de palabra sin documentarlos.',
        desc: 'Un acuerdo verbal sobre custodia o pensión no tiene valor legal ejecutable. Si la otra parte deja de cumplir, no tienes respaldo. Todo debe formalizarse ante juez o notario.',
    },
    {
        num: '2',
        title: 'Firmar el convenio de divorcio sin revisarlo con un abogado.',
        desc: 'Algunos convenios tienen cláusulas que parecen razonables pero que a largo plazo perjudican a una de las partes, especialmente en cuanto a custodia o división de bienes. Siempre revisa antes de firmar.',
    },
    {
        num: '3',
        title: 'Usar a los hijos como herramienta de negociación.',
        desc: 'Además de ser emocionalmente dañino, los jueces en Durango lo toman muy en cuenta al determinar la custodia. Nunca es una buena estrategia legal ni humana.',
    },
    {
        num: '4',
        title: 'No actualizar la pensión alimenticia cuando cambian los ingresos.',
        desc: 'La pensión debe reflejar la realidad económica actual. Si el obligado gana más, o si el menor tiene más necesidades, la pensión puede y debe modificarse legalmente.',
    },
    {
        num: '5',
        title: 'Esperar a que el conflicto escale antes de buscar asesoría.',
        desc: 'Muchos casos que llegaron a juicio costoso podrían haberse resuelto en acuerdo si se hubiera actuado antes. La asesoría temprana casi siempre ahorra tiempo, dinero y desgaste emocional.',
    },
    {
        num: '6',
        title: 'Compartir información del proceso en redes sociales.',
        desc: 'Lo que publicas puede usarse en tu contra en un proceso judicial. Discreción absoluta durante cualquier proceso familiar es una recomendación que tomamos muy en serio.',
    },
];

const checklist = [
    'Identificación oficial tuya y de tu cónyuge o contraparte si la tienes',
    'Acta de matrimonio (si aplica)',
    'Actas de nacimiento de los hijos menores (si los hay)',
    'Cualquier acuerdo previo, escrito o documento firmado',
    'Documentos de bienes en común, escrituras, facturas, estados de cuenta',
    'Comprobantes de ingresos tuyos y si los tienes de la otra parte',
    'Cualquier documento relacionado con el conflicto, notificaciones, mensajes, resoluciones previas',
    'En casos de violencia familiar: cualquier evidencia disponible, reportes, fotografías, mensajes',
];

const faqs = [
    {
        q: '¿Cuánto tarda un divorcio en Durango?',
        a: 'Un divorcio de mutuo acuerdo ante notario puede resolverse en semanas si los requisitos se cumplen. Un divorcio ante juez con acuerdo puede tomar algunos meses. Un divorcio contencioso, donde hay conflicto sobre custodia o bienes, puede extenderse considerablemente más. En BCC te damos un estimado real desde el inicio según tu caso específico.',
    },
    {
        q: '¿Puedo divorciarme aunque mi pareja no quiera?',
        a: 'Sí. En México existe el divorcio incausado, que permite a cualquiera de las partes pedir el divorcio sin necesidad de que la otra esté de acuerdo o sin tener que demostrar una causa. Lo que sí se discute ante el juez es la custodia, la pensión y la división de bienes.',
    },
    {
        q: '¿Cómo se determina quién tiene la custodia de los hijos en Durango?',
        a: 'La ley establece que el criterio principal es el interés superior del menor. El juez toma en cuenta factores como la estabilidad que cada progenitor puede ofrecer, el vínculo afectivo con los hijos, la capacidad económica y la disposición a facilitar la relación del menor con el otro progenitor.',
    },
    {
        q: '¿La madre siempre obtiene la custodia en México?',
        a: 'No necesariamente. Aunque históricamente era más común que la madre obtuviera la custodia, la ley mexicana no establece preferencia por género. La custodia compartida es cada vez más común y reconocida por los juzgados en Durango cuando es viable y beneficia al menor.',
    },
    {
        q: '¿Qué pasa si mi ex no paga la pensión alimenticia en Durango?',
        a: 'El incumplimiento de la pensión alimenticia tiene consecuencias legales serias. Puedes solicitar al juzgado medidas de apremio que incluyen embargo de bienes, descuento directo de nómina y en casos extremos puede constituir el delito de abandono de familia. En BCC te asesoramos en el proceso para hacer cumplir la obligación.',
    },
    {
        q: '¿Puedo cambiar el acuerdo de custodia que ya tenemos?',
        a: 'Sí, cuando las circunstancias han cambiado significativamente, un cambio de domicilio, una nueva situación laboral, problemas con el régimen actual, es posible solicitar la modificación del convenio o resolución de custodia ante el mismo juzgado que lo dictó.',
    },
    {
        q: '¿Qué es la patria potestad y es lo mismo que la custodia?',
        a: 'No son lo mismo. La patria potestad es el conjunto de derechos y obligaciones que tienen los padres sobre los hijos, incluyendo decisiones sobre educación, salud y patrimonio. La custodia determina con quién vive el menor en su día a día. Generalmente ambos padres conservan la patria potestad aunque solo uno tenga la custodia física.',
    },
    {
        q: '¿Pueden ayudarme si hay violencia familiar en mi situación?',
        a: 'Sí, y actuamos con urgencia cuando el caso lo requiere. Existen medidas de protección que pueden solicitarse de manera expedita ante los juzgados familiares de Durango, incluyendo órdenes de alejamiento y la separación del agresor del domicilio. No esperes a que la situación escale. Llámanos al 618 149 2511.',
    },
    {
        q: '¿Es posible que mi proceso de familia se resuelva sin ir a juicio?',
        a: 'En muchos casos, sí. La mediación y el acuerdo entre partes es siempre nuestra primera opción, es más rápida, menos costosa y mucho menos desgastante para todos, especialmente para los hijos. En BCC exploramos primero esa vía antes de ir a litigio.',
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

export default function DerechoFamilia() {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'schema-derecho-familia';
        script.textContent = JSON.stringify(schemaJSON);
        document.head.appendChild(script);
        return () => {
            const existing = document.getElementById('schema-derecho-familia');
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
                                    Abogado de Derecho Familiar en Durango:{' '}
                                    <span className="text-brand-red">
                                        Divorcios, Custodias y Pensiones con Discreción y Firmeza
                                    </span>
                                </h1>
                                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                    Los asuntos de familia son los más delicados que existen. No solo porque
                                    involucran procesos legales complejos, sino porque detrás de cada expediente
                                    hay personas, y con frecuencia, niños, cuya vida cotidiana depende de cómo se
                                    resuelvan.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                    En BCC manejamos asuntos de derecho familiar en Durango con dos cosas que rara
                                    vez van juntas: la firmeza legal necesaria para defender tus derechos y la
                                    sensibilidad humana que requiere tu situación.
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

                            {/* ── H2: ¿Cuándo necesitas abogado? ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    ¿Cuándo Necesitas un Abogado de Familia en Durango?
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Los asuntos familiares rara vez llegan en el momento conveniente. Muchas personas
                                    esperan demasiado, esperando que la situación se resuelva sola, evitando el
                                    conflicto o simplemente sin saber que tienen opciones legales concretas.
                                </p>
                                <p className="text-gray-700 font-semibold mb-4">
                                    Necesitas un abogado de familia en Durango cuando:
                                </p>
                                <ul className="space-y-3">
                                    {cuandoNecesitas.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="w-2 h-2 rounded-full bg-brand-red mt-2.5 flex-shrink-0" />
                                            <span className="text-gray-700 leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-500 text-sm mt-6 leading-relaxed">
                                    En cualquiera de estos escenarios, actuar con asesoría legal correcta desde el
                                    principio puede marcar una diferencia enorme en el resultado, y en el impacto
                                    que el proceso tiene sobre tu familia.
                                </p>
                            </motion.div>

                            {/* ── H2: Nuestros servicios ── */}
                            <div className="mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                    Nuestros Servicios de Derecho de Familia
                                </h2>
                                <p className="text-gray-600 mb-10 leading-relaxed">
                                    Cada situación familiar es diferente, y cada servicio requiere un enfoque
                                    específico. Aquí te explicamos en qué consiste cada uno y cómo BCC puede
                                    acompañarte.
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

                                            {/* Sub-tipos de divorcio */}
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

                                            {/* Bullets para custodia y pensión */}
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
                                    ¿Cómo Trabajamos los Asuntos de Familia en BCC?
                                </h2>
                                <p className="text-gray-300 leading-relaxed mb-8">
                                    Entendemos que los asuntos familiares no son solo problemas legales, son
                                    situaciones que afectan la vida cotidiana, las emociones y el futuro de personas
                                    que importan. Por eso nuestra forma de trabajar en esta área tiene características
                                    específicas:
                                </p>
                                <div className="space-y-5">
                                    {comoTrabajamos.map((p, i) => (
                                        <div key={p.titulo} className="flex gap-4">
                                            <span className="w-7 h-7 rounded-full bg-brand-red text-white font-bold flex items-center justify-center flex-shrink-0 text-sm mt-0.5">
                                                {i + 1}
                                            </span>
                                            <div>
                                                <p className="font-bold text-white mb-1">{p.titulo}.</p>
                                                <p className="text-gray-300 text-sm leading-relaxed">{p.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* ── H2: Lo que debes saber (tabla) ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Lo que Debes Saber Antes de Iniciar un Proceso Familiar en Durango
                                </h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Antes de tomar cualquier acción, hay algunos puntos clave que conviene entender.
                                    Conocerlos desde el principio te ayuda a tomar mejores decisiones.
                                </p>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left py-3 pr-6 text-gray-500 font-semibold">Situación</th>
                                                <th className="text-left py-3 text-gray-900 font-semibold">Lo que debes saber</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tablaInfo.map((r) => (
                                                <tr key={r.situacion} className="border-b border-gray-100 last:border-0">
                                                    <td className="py-3 pr-6 text-brand-red font-semibold align-top whitespace-nowrap">{r.situacion}</td>
                                                    <td className="py-3 text-gray-700 align-top leading-relaxed">{r.saber}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>

                            {/* ── H2: Errores comunes ── */}
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Errores Comunes en Asuntos de Familia que Vemos en Durango
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
                                    Checklist: ¿Estás Listo para Iniciar tu Proceso Familiar?
                                </h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    Reúne lo siguiente antes de tu consulta, si no tienes todo, no te preocupes:
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
                                        No necesitas todo para empezar. La primera conversación con nosotros es para
                                        entender tu situación.{' '}
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
                                    Preguntas Frecuentes sobre Derecho de Familia en Durango
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
                                    Los asuntos de familia no se resuelven solos, y entre más tiempo pasa sin
                                    atenderlos correctamente, más difíciles se vuelven. Lo más importante que puedes
                                    hacer hoy es hablar con alguien que te dé información real sobre tus opciones.
                                </p>
                                <p className="text-white/90 text-base mb-6 max-w-xl mx-auto">
                                    En BCC escuchamos tu caso sin juicios, te explicamos con claridad lo que tienes
                                    enfrente y te acompañamos en cada paso con el compromiso que tu familia merece.
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
