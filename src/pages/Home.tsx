import { Phone, MessageCircle, Scale, Users, Home as HomeIcon, FileText, Briefcase, Clock, Shield, Gavel, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const services = [
    {
      icon: Scale,
      title: 'Litigio Civil',
      description: 'Representación legal experta en disputas civiles, demandas por incumplimiento de contratos y resolución de conflictos patrimoniales.',
    },
    {
      icon: Users,
      title: 'Derecho Familiar',
      description: 'Divorcios, custodias, pensiones alimenticias, adopciones y protección de los derechos familiares con sensibilidad y profesionalismo.',
    },
    {
      icon: Building2,
      title: 'Sucesiones',
      description: 'Tramitación de herencias, sucesiones testamentarias e intestamentarias con eficiencia y transparencia',
    },
    {
      icon: Briefcase,
      title: 'Derecho Mercantil',
      description: 'Asesoría empresarial, constitución de sociedades, contratos mercantiles y cobranza judicial.',
    },
    {
      icon: FileText,
      title: 'Servicios Notariales',
      description: 'Testamentos, poderes notariales, contratos y tramitación de escrituras públicas.',
    },
    {
      icon: Shield,
      title: 'Derecho Penal',
      description: 'Defensa legal en procesos penales, amparos y protección de derechos constitucionales.',
    },
    {
      icon: Gavel,
      title: 'Juicios de Desalojo',
      description: 'Recuperación de inmuebles, desalojos por falta de pago y terminación de contratos de arrendamiento.',
    },
    {
      icon: HomeIcon,
      title: 'Bienes Raíces',
      description: 'Compraventa, arrendamiento, regularización de propiedades y solución de conflictos inmobiliarios',
    },
    {
      icon: Clock,
      title: 'Consultas Legales',
      description: 'Asesoría jurídica personalizada, análisis de casos y orientación legal preventiva para particulares y empresas.',
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-red-50 opacity-60"></div>

      <div className="relative">
        <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="max-w-5xl mx-auto text-center fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Despacho Juridico en  <span className="text-brand-red">Durango</span>
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-semibold mb-6">
              Los mejores abogados en Durango
            </p>

            <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
              Con más de 15 años de experiencia, BCC Despacho Jurídico es su aliado legal de confianza en Durango.
              Ofrecemos soluciones integrales en derecho civil, familiar, mercantil y penal con el más alto nivel
              de profesionalismo, ética y compromiso con nuestros clientes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contacto"
                className="btn-primary group w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
                <span className="font-semibold">Agenda tu Consulta</span>
              </Link>

              <a
                href="https://wa.me/5216181492511"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group w-full sm:w-auto"
              >
                <Phone className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" />
                <span className="font-semibold">618 149 2511</span>
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16 fade-in-delayed">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Nuestros Servicios Legales
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ofrecemos una amplia gama de servicios jurídicos especializados para proteger
                sus derechos e intereses legales
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="service-card group">
                    <div className="w-14 h-14 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-red transition-colors">
                      <Icon className="w-7 h-7 text-brand-red group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                ¿Necesita Asesoría Legal?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-10">
                Nuestro equipo de abogados expertos está listo para ayudarle.
                Agende su consulta hoy mismo y proteja sus derechos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/5216181492511"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary group"
                >
                  <MessageCircle className="w-6 h-6 transition-transform group-hover:scale-110" />
                  <span className="font-semibold">WhatsApp</span>
                </a>
                <a
                  href="tel:+526181492511"
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-gray-900 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ease-out group"
                >
                  <Phone className="w-6 h-6 transition-transform group-hover:scale-110" />
                  <span className="font-semibold">Llamar Ahora</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
