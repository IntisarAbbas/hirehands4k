import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiChevronRight, FiPlus } from 'react-icons/fi';
import { categories } from '../data/categories';

export default function CategoryDetail() {
  const { t } = useTranslation();
  const { categoryId } = useParams();
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-bold">{t('categories.notFound')}</h1>
        <Link to="/categories" className="text-primary mt-4 inline-block">
          {t('categories.backToCategoriesLink')}
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb + Header */}
      <div className="py-8 border-b border-border" style={{ backgroundColor: `${category.color}08` }}>
        <div className="container-custom">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap">
            <Link to="/" className="text-text-secondary hover:text-primary transition-colors">
              {t('nav.home')}
            </Link>
            <FiChevronRight className="text-text-secondary" size={14} />
            <Link to="/categories" className="text-text-secondary hover:text-primary transition-colors">
              {t('nav.categories')}
            </Link>
            <FiChevronRight className="text-text-secondary" size={14} />
            <span className="text-text-primary font-semibold">{category.name}</span>
          </nav>

          {/* Header with Create Profile Button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl bg-white shadow-sm">
                {category.icon}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
                <p className="text-text-secondary mt-1">
                  {category.subcategories.length} {t('categories.servicesAvailable')}
                </p>
              </div>
            </div>

            {/* Create Profile Button */}
            <Link
              to={`/create-profile/${category.id}`}
              className="btn-primary flex items-center gap-2 whitespace-nowrap"
            >
              <FiPlus /> Create Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Popular Services */}
      <div className="container-custom py-12">
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            🔥 Popular Services
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {category.subcategories
              .filter((sub) => sub.popular)
              .map((sub) => (
                <Link
                  key={sub.id}
                  to={`/category/${category.id}/${sub.id}`}
                  className="card p-4 flex flex-col items-center text-center 
                           hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  <div className="text-3xl mb-2">{sub.icon}</div>
                  <h3 className="font-semibold text-sm">{sub.name}</h3>
                </Link>
              ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">{t('categories.chooseService')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.subcategories.map((sub) => (
              <Link
                key={sub.id}
                to={`/category/${category.id}/${sub.id}`}
                className="card p-5 flex items-center gap-4 hover:-translate-y-1 transition-all"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  {sub.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{sub.name}</h3>
                  <p className="text-xs text-text-secondary">
                    {t('categories.viewWorkers')} →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}