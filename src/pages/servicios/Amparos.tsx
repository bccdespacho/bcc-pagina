import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useState, useEffect, useId } from 'react';
import PageWrapper from '../../components/PageWrapper';

// --- Data ---

const cuandoNecesitas = [
    'Un juez dictó sentencia definitiva en tu contra y ya no queda apelación ni otro recurso dentro de ese juicio',
    'Te enteraste de un embargo o de un remate sobre tu casa, tu terreno o tus cuentas, en un juicio al que nunca te llamaron o en el que te notificaron mal',
    'Una dependencia te negó un permiso, una licencia o un trámite sin decirte en qué ley se basa',
    'Te impusieron una multa o te clausuraron el negocio, y ya agotaste el recurso que la propia autoridad te ofrece',
    'Recibiste una resolución sobre la custodia de tus hijos, el régimen de convivencia o la pensión alimenticia que consideras mal fundada',
    'Un acto de autoridad está afectando tu propiedad: un desalojo, una afectación por obra pública o un cobro que no corresponde a tu terreno',
    'En un juicio mercantil te embargaron bienes o cuentas del negocio, o te están ejecutando un pagaré que no firmaste',
];

const tiposDeAmparo = [
    {
        h3: 'Amparo Indirecto',
        body: 'Es la vía contra actos de autoridades que no son tribunales (una dependencia, el fisco, un ayuntamiento), contra leyes o reglamentos que ya te afectan, y contra actos dictados fuera de juicio o cuando este ya terminó, como los de ejecución de sentencia. Dentro de un juicio en marcha solo procede contra actos cuyo daño ya no podría repararse después, lo que la ley llama actos de imposible reparación.',
        detail: 'Lo resuelve un Juzgado de Distrito, a cargo de un juez federal. Preparamos y presentamos tu demanda ante los Juzgados de Distrito con sede en Durango, y pedimos la suspensión desde el primer escrito para intentar que el acto no avance mientras el juez resuelve.',
    },
    {
        h3: 'Amparo Directo',
        body: 'Procede contra sentencias definitivas, laudos y demás resoluciones que ponen fin a un juicio y ya no admiten recurso ordinario. No se reabre tu pleito ni se ofrecen pruebas nuevas: un tribunal federal revisa si esa resolución respetó tus derechos y las reglas del debido proceso. Lo resuelve un Tribunal Colegiado de Circuito, integrado por tres magistrados.',
        detail: 'La demanda no se entrega en la ventanilla del tribunal federal, sino por conducto de la misma autoridad que dictó la sentencia, y ella la remite. Presentarla donde no corresponde no detiene el plazo, y por eso este paso lo hacemos nosotros.',
    },
    {
        h3: 'La Suspensión del Acto Reclamado',
        body: 'No es un tipo de amparo, sino la medida urgente que se pide dentro de cualquiera de los dos, y muy seguido es lo más apremiante del caso. Busca frenar el acto que te afecta mientras se resuelve el juicio. En el amparo indirecto tiene dos momentos: la provisional, que el juez federal puede conceder casi de inmediato, y la definitiva, que se decide más adelante ya con la postura de la autoridad. En el amparo directo funciona distinto: la resuelve la misma autoridad que dictó la sentencia, dentro de las 24 horas siguientes a que se le pide.',
        detail: 'No es automática. Quien la resuelve valora que el acto exista, cómo te afecta, que frenarlo no dañe el interés social y que a primera vista tu reclamo se vea fundado. Hay actos en los que la ley simplemente no permite concederla, y esa lista creció con la reforma de octubre de 2025. En otros casos solo surte efectos si otorgas una garantía, y ese monto te lo calculamos antes de promover.',
    },
    {
        h3: 'Amparo en Materia Civil y Mercantil',
        body: 'Aplica cuando una resolución en un juicio de contratos, propiedad, arrendamiento, posesión o cobranza te deja en desventaja: un embargo mal ejecutado, el desconocimiento de un contrato, una sentencia sobre un inmueble en la que no se valoraron bien las pruebas. Según la etapa en la que esté el juicio, puede ir por la vía directa o por la indirecta.',
        detail: 'Cuando el embargo viene de la ejecución de una sentencia, la ley solo permite el amparo en momentos muy concretos del procedimiento, así que lo primero es ver en qué etapa está tu expediente. Si tu asunto nace de un tema de Contratos Civiles o de Propiedad y Bienes, llegamos al amparo con el expediente ya conocido.',
    },
    {
        h3: 'Amparo en Materia Familiar',
        body: 'Procede contra resoluciones sobre pensión alimenticia, custodia, régimen de convivencia, divorcio o patria potestad que estén mal fundadas o que violen tus derechos. Son casos donde el tiempo pesa mucho, porque afectan la estabilidad de tu familia todos los días. Cuando hay menores de por medio, el tribunal debe resolver bajo el principio del interés superior de la niñez.',
        detail: 'Nos coordinamos con nuestra área de Derecho de Familia, así que no tienes que contar tu historia desde cero. Aquí también corren los plazos: si acabas de recibir una notificación, no dejes pasar la semana para que la revisemos.',
    },
    {
        h3: 'Amparo en Materia Administrativa',
        body: 'Es la vía cuando quien te afecta es una autoridad de gobierno: una multa, una clausura, la negativa de una licencia o un permiso, un cobro de predial o de agua que no corresponde a tu inmueble, o una afectación por obra pública. Contra actos de dependencias municipales, estatales o federales suele ir por la vía indirecta, ante un Juzgado de Distrito con sede en Durango.',
        detail: 'Lo primero que revisamos aquí es si la ley te daba antes un recurso ante la propia dependencia o un juicio ante un tribunal de justicia administrativa, porque en estos asuntos ese punto define si el amparo procede. Hay excepciones, por ejemplo cuando el acto ni siquiera dice en qué ley se funda. Y si la multa o la clausura ya se están ejecutando, pedimos la suspensión desde el primer escrito.',
    },
];

const queHaceBCC = [
    'Analizamos tu situación civil, mercantil, familiar o administrativa para definir si el amparo es la vía correcta y cuál de las dos modalidades te toca',
    'Promovemos amparo indirecto contra el acto que te afecta: un embargo, una orden de remate, una notificación que nunca te llegó o un juzgado que lleva meses sin resolver',
    'Combatimos por amparo directo la sentencia que ya no admite apelación, y las violaciones cometidas durante el procedimiento que afectaron tu defensa',
    'Solicitamos la suspensión del acto reclamado y la defendemos con los requisitos que la ley exige, para intentar frenar el acto mientras el juicio avanza',
    'Te calculamos por anticipado la garantía que el juez puede exigirte para que la suspensión surta efectos, para que sepas a qué te comprometes',
    'Te explicamos en palabras simples en qué etapa va tu defensa y qué sigue, y lo coordinamos con tu juicio principal en los juzgados de Durango',
];

const erroresComunes = [
    {
        num: '1',
        title: 'Dejar pasar el plazo para presentar la demanda.',
        desc: 'La regla general son 15 días hábiles, aunque hay supuestos con plazos distintos. Si vence el que te corresponde, la ley entiende que consentiste el acto y la demanda ya no procede. Antes de asumir que es tarde, deja que revisemos qué plazo aplica a tu caso.',
    },
    {
        num: '2',
        title: 'No pedir la suspensión, o pedirla mal.',
        desc: 'Sin suspensión, el acto sigue surtiendo efectos aunque ganes el amparo meses después, y para entonces el daño puede ser irreversible. Hay que pedirla desde la demanda y sustentarla con los elementos que la ley exige.',
    },
    {
        num: '3',
        title: 'Señalar mal a la autoridad responsable o al acto reclamado.',
        desc: 'La autoridad responsable es la que dicta, ordena o ejecuta el acto, y también la que se niega a actuar cuando debía hacerlo. Si la demanda queda poco clara en estos datos, el juez te previene para que lo corrijas en unos días y, si no lo haces, se tiene por no presentada.',
    },
    {
        num: '4',
        title: 'No agotar antes los recursos ordinarios.',
        desc: 'El principio de definitividad exige usar primero los recursos que la ley te da contra esa resolución, como la apelación. Si había uno disponible y no se agotó, la demanda tampoco procede. Existen excepciones, pero solo se pueden valorar revisando tu expediente.',
    },
    {
        num: '5',
        title: 'Presentar conceptos de violación genéricos o copiados de plantillas.',
        desc: 'Los conceptos de violación son los argumentos que explican por qué ese acto viola tus derechos. Si son frases generales bajadas de internet, el tribunal los declara inoperantes, es decir, ni siquiera los estudia.',
    },
    {
        num: '6',
        title: 'Creer que el amparo es una tercera instancia.',
        desc: 'El amparo no repite el juicio desde cero. Revisa si el acto o la sentencia respetan la Constitución y la ley, y eso sí incluye revisar si las pruebas se valoraron conforme a derecho. Pero no basta con estar en desacuerdo con el resultado: hay que demostrar en qué fue ilegal.',
    },
];

const proceso = [
    {
        num: '1',
        title: 'Revisión urgente del acto y del plazo',
        desc: 'Vemos qué te está afectando y desde cuándo corre el plazo. En la mayoría de los casos son 15 días hábiles y ese tiempo no se recupera, por eso este paso va primero.',
    },
    {
        num: '2',
        title: 'Análisis de viabilidad y tipo de amparo',
        desc: 'Definimos si tu caso va por amparo directo o indirecto y revisamos si ya agotaste los recursos previos. Ir al amparo sin agotarlos es la causa más común de que lo desechen.',
    },
    {
        num: '3',
        title: 'Demanda y solicitud de suspensión',
        desc: 'Presentamos la demanda donde corresponde y pedimos la suspensión en el mismo escrito, para intentar frenar el acto mientras el juicio avanza.',
    },
    {
        num: '4',
        title: 'Seguimiento del juicio',
        desc: 'En el indirecto damos seguimiento al informe de la autoridad, ofrecemos pruebas y te acompañamos a la audiencia. En el directo no hay pruebas nuevas: todo el peso está en los argumentos.',
    },
    {
        num: '5',
        title: 'Sentencia y, si aplica, recurso de revisión',
        desc: 'Te explicamos qué se resolvió y qué significa en la práctica. Cuando el amparo se concede, muchas veces es para efectos, o sea que la autoridad debe rehacer el acto, y ahí seguimos acompañándote.',
    },
];

const checklist = [
    'Identificación oficial vigente de quien va a promover el amparo',
    'Si el amparo es de una empresa, el acta constitutiva y el poder del representante',
    'Copia de la resolución, el oficio o el documento que te perjudica, aunque sea una foto legible',
    'La fecha exacta en que te notificaron o en que te enteraste del acto',
    'La constancia de notificación, si la conservas',
    'El número de expediente y el juzgado o la dependencia de donde viene el asunto',
    'Los recursos o escritos que ya hayas presentado y la respuesta que te dieron',
    'Escrituras, contratos o títulos relacionados con el bien o el derecho que estás defendiendo',
    'Datos de la autoridad que emitió el acto y de la que lo está ejecutando',
];

const faqs = [
    {
        q: '¿Qué es un juicio de amparo y para qué sirve?',
        a: 'El amparo es un juicio federal en el que le pides a un juez que revise si una autoridad violó tus derechos. Sirve para frenar o dejar sin efecto el acto reclamado, es decir, la orden, el cobro, la clausura o la sentencia que te está afectando. Cuando hubo un juicio previo, el amparo no lo repite: revisa si en él se aplicó bien la ley.',
    },
    {
        q: '¿Cuánto tiempo tengo para presentar un amparo en México?',
        a: 'La regla general de la Ley de Amparo son 15 días hábiles, y no se cuentan desde el día en que te notificaron, sino a partir del día siguiente a que esa notificación surte efectos. Hay supuestos con plazos distintos, por ejemplo 30 días cuando reclamas una ley que te afecta desde que entra en vigor. Los plazos del amparo no se prorrogan, así que si ya te notificaron, busca abogado esta semana.',
    },
    {
        q: '¿Cuál es la diferencia entre amparo directo e indirecto?',
        a: 'El amparo directo va contra sentencias definitivas y resoluciones que ya pusieron fin al juicio. Se entrega ante la misma autoridad que dictó la sentencia y lo resuelve un Tribunal Colegiado de Circuito. El amparo indirecto va contra actos que no son una sentencia final, como multas, clausuras, embargos o actos de dependencias, se presenta ante un Juez de Distrito y su sentencia todavía admite revisión.',
    },
    {
        q: '¿Qué es la suspensión y detiene el acto de inmediato?',
        a: 'Es la medida con la que se pide detener temporalmente el acto que te afecta mientras se resuelve el amparo. En el amparo indirecto el juez federal puede concederla de forma provisional en pocos días y después decidir si la mantiene; en el directo la resuelve la propia autoridad que dictó la sentencia. No es automática: se valora si el daño sería irreparable y si no se perjudica el interés social. Hay actos que la ley no permite suspender, y la reforma de octubre de 2025 amplió esa lista.',
    },
    {
        q: '¿Puedo promover un amparo si ya perdí el juicio y la sentencia es definitiva?',
        a: 'En muchos casos sí, y ese es justamente el terreno del amparo directo. Pero depende de que el plazo siga vivo y de que antes se hayan agotado los recursos ordinarios, como la apelación. El amparo no vuelve a discutir el caso desde cero: revisa si hubo violaciones a la ley o a tus derechos que cambiaron el resultado. Solo leyendo tu expediente se sabe si existen argumentos reales.',
    },
    {
        q: '¿Cuánto cuesta tramitar un amparo en Durango?',
        a: 'No hay una tarifa única, porque depende del tipo de amparo, de la complejidad del asunto y de si después hay que atender recursos. La primera consulta es sin costo: revisamos tu caso y te damos una opinión franca sobre sus posibilidades y sobre los obstáculos que le vemos. Ningún abogado puede garantizarte un resultado. Te entregamos el presupuesto antes de empezar. Llámanos al 618 149 2511 y lo revisamos contigo.',
    },
    {
        q: '¿Cuánto tiempo tarda un juicio de amparo?',
        a: 'Depende de la materia, de la carga de trabajo del tribunal y de si la contraparte interpone recursos. Hay casos que se resuelven en meses y otros que pasan del año, así que nadie serio te puede prometer una fecha exacta. Lo que sí puede resolverse en los primeros días es la suspensión provisional, que es la que frena el acto de entrada.',
    },
    {
        q: '¿Llevan amparos si mi juicio lo tramitó otro abogado?',
        a: 'Sí. Podemos entrar únicamente para el amparo aunque el juicio original lo haya llevado otra persona; solo necesitamos revisar el expediente y las notificaciones para no perder plazos. Atendemos a clientes de la ciudad de Durango y de otros municipios del estado, en nuestra oficina de Paseo de Navacoyan 100 o por teléfono y WhatsApp al 618 149 2511.',
    },
];

// --- Schema JSON-LD (page-specific: LegalService + FAQPage) ---

const schemaJSON = {
    '@context': 'https://schema.org',
    '@graph': [
        {
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
            serviceType: 'Juicio de Amparo',
            description:
                'Tramitación de juicios de amparo directo e indirecto en Durango: defensa frente a actos de autoridad, impugnación de sentencias definitivas y solicitud de suspensión del acto reclamado en materia civil, mercantil, familiar y administrativa.',
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://bccdespachojuridico.com/servicios/amparos',
            },
        },
        {
            '@type': 'FAQPage',
            '@id': 'https://bccdespachojuridico.com/servicios/amparos#faq',
            mainEntity: faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
        },
    ],
};

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
    const panelId = useId();
    return (
        <div className="border-b border-gray-200 last:border-0">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls={panelId}
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
                id={panelId}
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

export default function Amparos() {
    // Inject page-specific SEO (title + meta description) and Schema JSON-LD
    useEffect(() => {
        const prevTitle = document.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        const prevDesc = metaDesc?.getAttribute('content') ?? '';

        document.title = 'Abogado de Amparo en Durango: Amparo Directo e Indirecto | BCC';
        metaDesc?.setAttribute(
            'content',
            'Abogado de amparo en Durango: amparo directo e indirecto en materia civil, mercantil, familiar y administrativa. Suspensión del acto reclamado. Consulta sin costo.'
        );

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = 'schema-amparos';
        script.textContent = JSON.stringify(schemaJSON);
        document.head.appendChild(script);

        return () => {
            document.title = prevTitle;
            metaDesc?.setAttribute('content', prevDesc);
            const existing = document.getElementById('schema-amparos');
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
                                    Juicio de Amparo en Durango:{' '}
                                    <span className="text-brand-red">
                                        Tu Defensa Frente a Actos de Autoridad que Vulneran tus Derechos
                                    </span>
                                </h1>
                                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                    Un juez dictó una sentencia en tu contra y ya no te queda recurso. Una
                                    dependencia te negó un trámite sin explicarte por qué. Una autoridad ordenó algo
                                    que pone en riesgo tu patrimonio, tu empresa o la tranquilidad de tu familia.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                    Cuando eso pasa es normal sentir que ya no hay nada que hacer. El juicio de
                                    amparo existe justo para eso: es la vía para que la justicia federal revise ese
                                    acto y, si te asiste la razón, lo deje sin efecto.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                                    En BCC Despacho Jurídico tramitamos amparos directos e indirectos en materia
                                    civil, mercantil, familiar y administrativa. Los plazos son cortos, así que si
                                    acabas de recibir una resolución que te afecta, consúltanos antes de darla por
                                    cerrada.
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

                            {/* ── H2: ¿Cuándo necesitas un amparo? ── */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-60px' }}
                                transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10 mb-12"
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    ¿Cuándo Necesitas un Juicio de Amparo?
                                </h2>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    No toda resolución que te perjudica es el final del camino. El amparo sirve para
                                    que un juez federal revise si una autoridad, un juez o una dependencia actuó
                                    dentro de la ley. Pero no siempre procede: si todavía tienes disponible una
                                    apelación u otro recurso, primero hay que agotarlo.
                                </p>
                                <p className="text-gray-700 font-semibold mb-4">
                                    Conviene que revisemos tu caso si:
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
                                    Estar en alguno de estos supuestos no significa que el amparo proceda. Hay que
                                    revisar el plazo, la vía correcta y si ya agotaste los recursos previos. La regla
                                    general son 15 días hábiles, y no se cuentan desde el día en que te notificaron,
                                    sino a partir del día siguiente a que esa notificación surte efectos.
                                </p>
                            </motion.div>

                            {/* ── H2: Tipos de amparo ── */}
                            <div className="mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                    Tipos de Amparo que Tramitamos en BCC
                                </h2>
                                <p className="text-gray-600 mb-10 leading-relaxed">
                                    El amparo es el juicio con el que defiendes los derechos que te reconocen la
                                    Constitución y los tratados internacionales frente a un acto de autoridad. No es
                                    un solo trámite: hay varias vías, según qué te afecta y en qué momento. Sus
                                    plazos son fatales, es decir que una vez vencidos ya no se recuperan, por eso lo
                                    primero que revisamos es en cuál estás.
                                </p>
                                <div className="space-y-6">
                                    {tiposDeAmparo.map((t, i) => (
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
                                    ¿Qué Hace BCC por Ti en un Juicio de Amparo?
                                </h2>
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    Tramitar un amparo no es entregar un escrito y esperar a ver qué pasa. Es
                                    identificar qué derecho se violó, contra qué autoridad se reclama, con qué
                                    pruebas y dentro de qué plazo, y después sostener ese argumento ante los
                                    tribunales federales hasta que el asunto se resuelva.
                                </p>
                                <ul className="space-y-3">
                                    {queHaceBCC.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="text-brand-red font-bold mt-0.5 flex-shrink-0">✔</span>
                                            <span className="text-gray-200 leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-gray-400 text-sm mt-6">
                                    Antes de que te comprometas a nada, hablamos de si el amparo tiene sentido en tu
                                    caso. Si vemos que no procede, te lo decimos con claridad y revisamos contigo qué
                                    otra opción te queda.
                                </p>
                            </motion.div>

                            {/* ── H2: Errores comunes ── */}
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Errores Comunes al Promover un Amparo en Durango
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    El amparo es un procedimiento federal muy técnico, y una parte importante de las
                                    demandas se pierde por defectos de forma, antes de que un juez alcance a estudiar
                                    si la persona tenía razón. Estos son los fallos que vemos con más frecuencia en
                                    los asuntos que atendemos en Durango:
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

                            {/* ── H2: Proceso ── */}
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Cómo Funciona el Proceso de Amparo con BCC
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    El amparo suena a juicio federal complicado y lejano, y por eso mucha gente lo
                                    deja pasar hasta que ya es tarde. Estas son las etapas, en orden y en palabras
                                    simples:
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
                                    En cada etapa sabes en qué va tu defensa y qué sigue, sin tener que estar preguntando.
                                </p>
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
                                    Qué Necesitamos para Evaluar tu Amparo
                                </h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    No necesitas llegar con el expediente completo ni perfectamente ordenado. Con lo
                                    que tengas a la mano podemos darte una primera orientación sin costo. Lo que
                                    falte, te ayudamos a identificarlo y a pedirlo donde corresponda:
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
                                        El dato más importante es la fecha exacta de la notificación, porque de ahí
                                        corre el plazo, y el cálculo no es tan simple como contar 15 días en el
                                        calendario. Si acabas de recibir una,{' '}
                                        <a href="https://wa.me/5216181492511" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
                                            contáctanos hoy mismo.
                                        </a>
                                    </p>
                                </div>
                                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                                    En BCC llevamos amparos en materia civil, mercantil, familiar y administrativa.
                                    Si tu asunto es penal, dínoslo desde la primera llamada: te orientamos sin costo
                                    y te decimos con quién te conviene seguir.
                                </p>
                            </motion.div>

                            {/* ── H2: FAQ ── */}
                            <div className="mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                                    Preguntas Frecuentes sobre el Juicio de Amparo en Durango
                                </h2>
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
                                    {faqs.map((faq) => (
                                        <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                                    ))}
                                </div>
                                <p className="text-gray-400 text-xs mt-4 leading-relaxed">
                                    Esta página es información general y no sustituye la valoración de un caso
                                    concreto, porque cada amparo depende de sus propias constancias y plazos.
                                </p>
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
                                    ¿Una Autoridad Vulneró tus Derechos? Interponemos tu Amparo
                                </h2>
                                <p className="text-white text-lg mb-4 max-w-2xl mx-auto leading-relaxed">
                                    No permitas que una resolución mal fundamentada dicte el rumbo de tu vida o de tu
                                    negocio. El amparo tiene plazos cortos, y cada día que pasa sin revisarlo juega
                                    en tu contra.
                                </p>
                                <p className="text-white/90 text-base mb-6 max-w-xl mx-auto">
                                    Tráenos la resolución que te afecta y la fecha en que te notificaron. Con eso
                                    empezamos, y te decimos con honestidad si vemos una vía.
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
