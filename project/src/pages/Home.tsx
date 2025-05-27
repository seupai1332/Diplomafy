import React from 'react';
import { Award, Shield, Users, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    // Scroll to features section
    const featuresSection = document.getElementById('recursos');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white">
      {/* Header/Nav */}
      <header className="relative">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
          <div className="w-full py-6 flex items-center justify-between border-b border-blue-500 lg:border-none">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">Diplomafy</Link>
              <div className="hidden ml-10 space-x-8 lg:block">
                <a href="#recursos" className="text-base font-medium text-gray-600 hover:text-gray-900">
                  Recursos
                </a>
                <a href="#planos" className="text-base font-medium text-gray-600 hover:text-gray-900">
                  Planos
                </a>
                <Link to="/verify" className="text-base font-medium text-gray-600 hover:text-gray-900">
                  Verificar Certificado
                </Link>
              </div>
            </div>
            <div className="ml-10 space-x-4">
              <Link
                to="/login"
                className="inline-block bg-blue-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-blue-600"
              >
                Entrar
              </Link>
              <Link
                to="/register"
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-blue-600 hover:bg-gray-50"
              >
                Começar Grátis
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Pessoas celebrando formatura"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-700 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">Crie certificados profissionais</span>
                <span className="block text-blue-200">em minutos</span>
              </h1>
              <p className="mt-6 max-w-lg mx-auto text-center text-xl text-blue-100 sm:max-w-3xl">
                Plataforma completa para criar, gerenciar e distribuir certificados digitais para seus cursos, eventos e treinamentos.
              </p>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                  <Link
                    to="/register"
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-700 bg-white hover:bg-blue-50 sm:px-8"
                  >
                    Começar Grátis
                  </Link>
                  <button
                    onClick={handleDemoClick}
                    className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-500 bg-opacity-60 hover:bg-opacity-70 sm:px-8"
                  >
                    Ver Demonstração
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recursos */}
      <div className="bg-gray-100 py-12" id="recursos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Recursos</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Tudo que você precisa para criar certificados incríveis
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Award className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Templates Profissionais</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Diversos modelos prontos para uso, criados por designers profissionais.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Shield className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Verificação Digital</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  QR Code e sistema de verificação online para garantir a autenticidade.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Users className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Envio em Massa</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Distribua certificados para centenas de pessoas com poucos cliques.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Zap className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Personalização Avançada</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Adapte cores, fontes e layout para combinar com sua marca.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Planos Section */}
      <div className="bg-white py-12" id="planos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Planos</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Escolha o plano ideal para você
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Free Plan */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-semibold text-gray-900">Gratuito</h3>
              <p className="mt-4 text-gray-500">Perfeito para começar</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">R$0</span>
                <span className="text-base font-medium text-gray-500">/mês</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Award className="h-6 w-6 text-green-500" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">5 certificados/mês</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Award className="h-6 w-6 text-green-500" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">3 templates básicos</p>
                </li>
              </ul>
              <Link
                to="/register"
                className="mt-8 block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Começar Grátis
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-white border-2 border-blue-500 rounded-lg shadow-sm p-8 relative">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">Popular</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Profissional</h3>
              <p className="mt-4 text-gray-500">Para profissionais e pequenas empresas</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">R$49</span>
                <span className="text-base font-medium text-gray-500">/mês</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Award className="h-6 w-6 text-green-500" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">100 certificados/mês</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Award className="h-6 w-6 text-green-500" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">Todos os templates</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Award className="h-6 w-6 text-green-500" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">Personalização avançada</p>
                </li>
              </ul>
              <Link
                to="/register"
                className="mt-8 block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Começar Agora
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
              <h3 className="text-xl font-semibold text-gray-900">Empresarial</h3>
              <p className="mt-4 text-gray-500">Para grandes organizações</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">R$99</span>
                <span className="text-base font-medium text-gray-500">/mês</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Award className="h-6 w-6 text-green-500" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">Certificados ilimitados</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Award className="h-6 w-6 text-green-500" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">API dedicada</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <Award className="h-6 w-6 text-green-500" aria-hidden="true" />
                  </div>
                  <p className="ml-3 text-base text-gray-700">Suporte prioritário</p>
                </li>
              </ul>
              <Link
                to="/register"
                className="mt-8 block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Falar com Vendas
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <Link to="/about" className="text-gray-400 hover:text-gray-500">
              Sobre
            </Link>
            <Link to="/blog" className="text-gray-400 hover:text-gray-500">
              Blog
            </Link>
            <Link to="/support" className="text-gray-400 hover:text-gray-500">
              Suporte
            </Link>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2024 Diplomafy. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;