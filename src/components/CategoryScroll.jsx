import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { categories } from '../data/categories';

export default function CategoryScroll() {
  const { t } = useTranslation();

  return (
    <section className="py-12 bg-surface">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{t('home.popularCategories')}</h2>
          <Link to="/categories" className="text-primary font-semibold hover:underline">
            {t('home.viewAll')} →
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 no-scrollbar">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="flex-shrink-0 w-44 group"
            >
              <div className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg 
                            hover:-translate-y-1 transition-all duration-200 border border-border">
                <div
                  className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-3xl"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  {category.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-text-secondary">
                  {category.subcategories.length} {t('home.services')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}