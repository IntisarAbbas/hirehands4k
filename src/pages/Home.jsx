import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiSearch, FiShield, FiClock, FiAward, FiUsers, FiCheckCircle } from 'react-icons/fi';
import CategoryScroll from '../components/CategoryScroll';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary 
                        text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t('home.heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              {t('home.heroSubtitle')}
            </p>
            
            <div className="bg-white rounded-full p-2 flex items-center shadow-lg max-w-2xl">
              <FiSearch className="text-text-secondary ml-4" size={20} />
              <input
                type="text"
                placeholder={t('home.searchServicePlaceholder')}
                className="flex-1 px-4 py-3 text-text-primary focus:outline-none bg-transparent"
              />
              <Link
                to="/search"
                className="bg-accent text-white px-6 py-3 rounded-full font-semibold 
                         hover:bg-accent-dark transition-colors"
              >
                {t('nav.search')}
              </Link>
            </div>

            <div className="flex flex-wrap gap-8 mt-12">
              {[
                { number: '10,000+', label: t('home.statsWorkers') },
                { number: '50,000+', label: t('home.statsJobs') },
                { number: '12', label: t('home.statsCities') },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-accent">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CategoryScroll />

      {/* How It Works */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{t('home.howItWorks')}</h2>
            <p className="text-text-secondary">{t('home.howItWorksSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FiSearch, title: t('home.step1Title'), desc: t('home.step1Desc') },
              { icon: FiClock, title: t('home.step2Title'), desc: t('home.step2Desc') },
              { icon: FiCheckCircle, title: t('home.step3Title'), desc: t('home.step3Desc') },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-accent 
                              rounded-full flex items-center justify-center text-white shadow-lg">
                  <step.icon size={32} />
                </div>
                <div className="text-sm font-bold text-accent mb-2">
                  {t('home.step')} {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-text-secondary">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-surface">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{t('home.whyChooseUs')}</h2>
            <p className="text-text-secondary">{t('home.whySubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FiShield, title: t('home.feature1Title'), desc: t('home.feature1Desc'), color: '#10B981' },
              { icon: FiClock, title: t('home.feature2Title'), desc: t('home.feature2Desc'), color: '#3B82F6' },
              { icon: FiAward, title: t('home.feature3Title'), desc: t('home.feature3Desc'), color: '#F59E0B' },
              { icon: FiUsers, title: t('home.feature4Title'), desc: t('home.feature4Desc'), color: '#8B5CF6' },
            ].map((feature, i) => (
              <div key={i} className="card p-6 text-center hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                     style={{ backgroundColor: `${feature.color}15`, color: feature.color }}>
                  <feature.icon size={28} />
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-8 md:p-12 
                        text-white text-center shadow-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('home.ctaTitle')}
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              {t('home.ctaSubtitle')}
            </p>
            <Link to="/become-worker" 
                  className="inline-block bg-white text-primary px-8 py-4 rounded-lg 
                           font-bold hover:bg-gray-100 transition-colors">
              {t('home.ctaButton')} →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}