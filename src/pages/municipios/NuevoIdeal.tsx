import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import PageWrapper from '../../components/PageWrapper';

// --- Data ---
const faqs = [
    {
        q: '¿Tienen oficinas físicas en Nuevo Ideal?',
        a: 'Sí, nuestra oficina de atención se encuentra en Emiliano Zapata 707, Zona Centro, Nuevo Ideal, Dgo. CP 34410.',
    },
    {
        q: '¿Ofrecen los mismos servicios legales que en la capital?',
        a: 'Por supuesto. Brindamos asesoría en contratos civiles, propiedad y bienes inmuebles, sucesiones, herencias y derecho de familia con la misma calidad y compromiso.',
    },
    {
        q: '¿También manejan trámites inmobiliarios?',
        a: 'Sí, somos Asesoría Jurídica e Inmobiliaria BCC. Nos especializamos tanto en la parte legal como en la gestión inmobiliaria para asegurar que sus transacciones sean seguras.',
    },
    {
        q: '¿Cómo puedo agendar una consulta?',
        a: 'Puede llamarnos directamente al 677 871 1030 o visitarnos en nuestra oficina en la Zona Centro de Nuevo Ideal.',
    },
];

// --- Variants ---
const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
};

export default function NuevoIdeal() {
    // --- SEO Mngt ---
    useEffect(() => {
        document.title = "Asesoría Jurídica e Inmobiliaria en Nuevo Ideal | BCC";

        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute("content", "Expertos en trámites legales e inmobiliarios en Nuevo Ideal. Emiliano Zapata 707, Zona Centro. Contratos, divorcios, propiedades, herencias.");
        } else {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = "Expertos en trámites legales e inmobiliarios en Nuevo Ideal. Emiliano Zapata 707, Zona Centro. Contratos, divorcios, propiedades, herencias.";
            document.head.appendChild(meta);
        }

        // Schema JSON-LD
        const scriptId = "schema-nuevo-ideal";
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.type = 'application/ld+json';
            script.innerHTML = JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LegalService",
                "name": "Asesoría Jurídica e Inmobiliaria BCC - Nuevo Ideal",
                "url": "https://bccdespachojuridico.com/municipios/nuevo-ideal",
                "telephone": "+526778711030",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Emiliano Zapata 707, Zona Centro",
                    "addressLocality": "Nuevo Ideal",
                    "addressRegion": "Durango",
                    "postalCode": "34410",
                    "addressCountry": "MX"
                },
                "areaServed": "Nuevo Ideal, Durango",
                "description": "Asesoría jurídica e inmobiliaria experta en Nuevo Ideal, Durango. Resolvemos asuntos civiles, familiares, herencias y trámites de propiedades."
            });
            document.head.appendChild(script);
        }

        return () => {
            // Cleanup on unmount if necessary, but returning to Home/other pages might need its own reset. 
            // We leave it to ensure it persists while on this page, but if using react-helmet it would be cleaner.
            const script = document.getElementById(scriptId);
            if (script) document.head.removeChild(script);
        };
    }, []);

    return (
        <PageWrapper>
            <div className="relative overflow-hidden bg-white">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-red-50/40 opacity-80" />

                <div className="relative z-10">
                    {/* Hero Section */}
                    <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            >
                                <span className="inline-block py-1 px-3 rounded-full bg-brand-red/10 text-brand-red font-semibold text-sm tracking-wider uppercase mb-6">
                                    Nuevo Ideal, Durango
                                </span>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                    Asesoría Jurídica e Inmobiliaria <span className="text-brand-red">BCC</span>
                                </h1>
                                <p className="text-xl md:text-2xl text-gray-700 font-medium mb-4">
                                    Su tranquilidad legal y patrimonial, ahora más cerca de usted.
                                </p>
                                <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
                                    Llegamos a Nuevo Ideal para ofrecer el mismo nivel de excelencia, compromiso y resultados
                                    que nos respaldan. Somos especialistas en derecho civil, familiar y soluciones inmobiliarias.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <a
                                        href="https://wa.me/5216778711030"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary w-full sm:w-auto"
                                    >
                                        <span className="font-semibold">Contactar por WhatsApp</span>
                                    </a>
                                    <a
                                        href="tel:+526778711030"
                                        className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2"
                                    >
                                        <span className="font-semibold">Llamar: 677 871 1030</span>
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* Services Info Section */}
                    <section className="bg-white py-16 border-y border-gray-100">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    className="text-center mb-12"
                                >
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Servicios en Nuevo Ideal</h2>
                                    <p className="text-gray-600 max-w-2xl mx-auto">
                                        Atendemos asuntos legales con la mayor profesionalidad, enfocándonos en resolver sus problemas de manera ágil y efectiva.
                                    </p>
                                </motion.div>

                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {[
                                        { title: 'Contratos Civiles', desc: 'Redacción, revisión y asesoría integral para que sus acuerdos sean seguros y válidos.', href: '/municipios/nuevo-ideal/servicios/contratos-civiles' },
                                        { title: 'Propiedad y Bienes', desc: 'Trámites de escrituración, regularización de terrenos y conflictos de posesión.', href: '/municipios/nuevo-ideal/servicios/propiedad-bienes' },
                                        { title: 'Sucesiones y Herencias', desc: 'Acompañamiento completo en procesos testamentarios e intestamentarios.', href: '/municipios/nuevo-ideal/servicios/sucesiones-herencias' },
                                        { title: 'Derecho de Familia', desc: 'Discreción y sensibilidad en divorcios, pensiones y custodias.', href: '/municipios/nuevo-ideal/servicios/derecho-familia' },
                                    ].map((s) => (
                                        <motion.div key={s.title} variants={cardVariants}>
                                            <Link
                                                to={s.href}
                                                className="block h-full bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-brand-red/50 hover:shadow-md transition-all group"
                                            >
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-red transition-colors">{s.title}</h3>
                                                <p className="text-gray-600 mb-4">{s.desc}</p>
                                                <span className="text-sm font-semibold text-brand-red group-hover:underline">Leer más →</span>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Location & FAQ Section */}
                    <section className="py-16 md:py-24">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Ubicación</h2>
                                    <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl">
                                        <h3 className="text-xl font-semibold mb-4 text-brand-red">Oficina Nuevo Ideal</h3>
                                        <ul className="space-y-4 text-gray-300">
                                            <li className="flex items-start gap-3">
                                                <span className="text-xl">📍</span>
                                                <p>
                                                    <strong className="text-white block mb-1">Dirección:</strong>
                                                    Emiliano Zapata 707,<br />
                                                    Zona Centro,<br />
                                                    34410 Nuevo Ideal, Dgo.
                                                </p>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-xl">📞</span>
                                                <p>
                                                    <strong className="text-white block mb-1">Teléfono:</strong>
                                                    <a href="tel:+526778711030" className="hover:text-brand-red transition-colors">677 871 1030</a>
                                                </p>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mt-6 text-center">
                                        <Link to="/contacto" className="text-brand-red font-medium hover:underline">
                                            Ver mapa y formulario completo →
                                        </Link>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Preguntas Frecuentes</h2>
                                    <div className="space-y-2">
                                        {faqs.map((faq, i) => (
                                            <FAQItem key={i} q={faq.q} a={faq.a} />
                                        ))}
                                    </div>
                                </motion.div>

                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </PageWrapper>
    );
}

// Minimalist FAQ block for this page
function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-gray-100 bg-white rounded-xl overflow-hidden shadow-sm">
            <button
                onClick={() => setOpen(!open)}
                className="w-full text-left p-4 flex items-center justify-between gap-4 group bg-gray-50/50 hover:bg-gray-50 transition-colors"
            >
                <span className="font-medium text-gray-900 group-hover:text-brand-red transition-colors">
                    {q}
                </span>
                <span className={`text-brand-red text-xl font-light transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
                    +
                </span>
            </button>
            <motion.div
                initial={false}
                animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="overflow-hidden"
            >
                <div className="p-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                    {a}
                </div>
            </motion.div>
        </div>
    );
}
