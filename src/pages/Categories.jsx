import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { categories } from '../data/categories';

export default function Categories() {
  const { t } = useTranslation();

  return (
    <div className="container-custom py-12 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('categories.pageTitle')}</h1>
        <p className="text-text-secondary">{t('categories.pageSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="card p-6 hover:-translate-y-1 transition-all"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shrink-0"
                style={{ backgroundColor: `${category.color}15` }}
              >
                {category.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                <p className="text-sm text-text-secondary mb-3">
                  {category.subcategories.length} {t('categories.servicesAvailable')}
                </p>
                <div className="flex flex-wrap gap-1">
                  {category.subcategories.slice(0, 3).map((sub) => (
                    <span
                      key={sub.id}
                      className="text-xs bg-surface px-2 py-1 rounded-full"
                    >
                      {sub.name}
                    </span>
                  ))}
                  {category.subcategories.length > 3 && (
                    <span className="text-xs text-primary">
                      +{category.subcategories.length - 3} {t('categories.more')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}