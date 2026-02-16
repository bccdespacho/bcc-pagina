import { Award, Shield, Users, Target, Heart, Scale, CheckCircle, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const values = [
    {
      icon: Shield,
      title: 'Integridad',
      description: 'Actuamos con honestidad y transparencia en cada caso que manejamos.',
    },
    {
      icon: Heart,
      title: 'Compromiso',
      description: 'Nos dedicamos al 100% a proteger los intereses de nuestros clientes.',
    },
    {
      icon: Award,
      title: 'Excelencia',
      description: 'Buscamos la excelencia en cada servicio legal que ofrecemos.',
    },
    {
      icon: Users,
      title: 'Atención Personalizada',
      description: 'Cada cliente recibe un servicio adaptado a sus necesidades específicas.',
    },
  ];

  const achievements = [
    'Más de 15 años de experiencia en el ámbito legal',
    'Más de 1,000 casos exitosamente resueltos',
    'Especialistas certificados en múltiples áreas del derecho',
    'Reconocidos por la comunidad de Durango',
    'Atención personalizada y confidencial',
    'Equipo multidisciplinario de expertos',
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-red-50 opacity-60"></div>

      <div className="relative">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 md:mb-16 fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Acerca de Nosotros
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Somos un despacho jurídico comprometido con la defensa de sus derechos
                y la búsqueda de soluciones legales efectivas.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200 mb-12 slide-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-brand-red rounded-xl flex items-center justify-center">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                    <span className="text-brand-red">BCC</span> Despacho Jurídico
                  </h2>
                  <p className="text-gray-600">Tu aliado legal de confianza</p>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
                <p>
                  <strong className="text-gray-900">BCC Despacho Jurídico</strong> es una firma legal establecida
                  en Durango, México, dedicada a brindar servicios jurídicos de la más alta calidad. Con más de
                  15 años de experiencia, nos hemos consolidado como uno de los despachos más confiables y
                  respetados de la región.
                </p>
                <p>
                  Nuestro equipo está conformado por abogados especializados en diversas áreas del derecho,
                  lo que nos permite ofrecer soluciones integrales y personalizadas a cada uno de nuestros clientes.
                  Entendemos que cada caso es único y requiere un enfoque especializado.
                </p>
                <p>
                  Nos caracterizamos por nuestra ética profesional, compromiso con la justicia y trato humano
                  hacia nuestros clientes. Creemos firmemente que la comunicación clara y constante es fundamental
                  para el éxito de cualquier proceso legal.
                </p>
              </div>
            </div>

            <div className="mb-16 fade-in-delayed">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-10">
                Nuestros Valores
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 hover:shadow-xl transition-all group">
                      <div className="w-14 h-14 bg-brand-red/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-red transition-colors">
                        <Icon className="w-7 h-7 text-brand-red group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 md:p-12 text-white mb-16">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-brand-red rounded-xl flex items-center justify-center">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Nuestra Misión
                </h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Proporcionar servicios legales de excelencia, defendiendo los derechos e intereses de nuestros
                clientes con profesionalismo, ética y compromiso. Buscamos ser el aliado legal de confianza
                para particulares y empresas en Durango, ofreciendo soluciones efectivas y personalizadas
                que generen tranquilidad y resultados positivos.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Trabajamos incansablemente para garantizar que cada cliente reciba la mejor representación
                legal posible, manteniendo siempre los más altos estándares de calidad y servicio.
              </p>
            </div>

            <div className="mb-16 fade-in">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-14 h-14 bg-brand-red rounded-xl flex items-center justify-center">
                  <Building2 className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
                  Nuestras Instalaciones
                </h2>
              </div>

              <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
                Contamos con instalaciones modernas y profesionales diseñadas para brindar un entorno
                de confianza y confidencialidad. Nuestras oficinas están equipadas con la tecnología
                más avanzada para garantizar un servicio eficiente y de alta calidad en cada consulta.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img
                    src="/bcc-img-1.jpg"
                    alt="Sala de juntas BCC Despacho Jurídico"
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-xl font-bold mb-2">Sala de Juntas Ejecutiva</h3>
                      <p className="text-sm text-gray-200">Espacios diseñados para reuniones confidenciales y estratégicas</p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img
                    src="/bcc-img-2.jpg"
                    alt="Oficinas privadas BCC"
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-xl font-bold mb-2">Oficinas Privadas</h3>
                      <p className="text-sm text-gray-200">Ambiente profesional que garantiza privacidad absoluta</p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img
                    src="/bcc-img-3.jpg"
                    alt="Área de recepción BCC"
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-xl font-bold mb-2">Recepción Profesional</h3>
                      <p className="text-sm text-gray-200">Atención personalizada desde el primer momento</p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img
                    src="/bcc-img-4.jpg"
                    alt="Biblioteca jurídica BCC"
                    className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-xl font-bold mb-2">Biblioteca Jurídica</h3>
                      <p className="text-sm text-gray-200">Acceso a recursos legales actualizados y especializados</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Compromiso con la Excelencia en Nuestras Instalaciones
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="p-4">
                    <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-brand-red" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Tecnología Avanzada</h4>
                    <p className="text-sm text-gray-600">
                      Sistemas digitales de última generación para gestión eficiente de casos
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-6 h-6 text-brand-red" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Seguridad y Confidencialidad</h4>
                    <p className="text-sm text-gray-600">
                      Espacios diseñados para proteger la privacidad de nuestros clientes
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-brand-red" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">Ambiente Profesional</h4>
                    <p className="text-sm text-gray-600">
                      Entorno que inspira confianza y facilita la comunicación efectiva
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                ¿Por Qué Elegirnos?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-brand-red flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brand-red rounded-2xl shadow-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
                ¿Listo para Comenzar?
              </h2>
              <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
                Permítanos ser su aliado legal. Contáctenos hoy y descubra cómo podemos
                ayudarle a proteger sus derechos e intereses.
              </p>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-red rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Agendar Consulta
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
