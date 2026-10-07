import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiMapPin, FiStar, FiChevronRight } from 'react-icons/fi';
import { categories } from '../data/categories';

const sampleWorkers = [
  { id: 1, name: 'Ahmed Khan', rating: 4.9, reviews: 127, rate: 1500, experience: '8 years', location: 'DHA, Karachi', verified: true, image: 'https://i.pravatar.cc/150?img=12', skills: ['Engine Repair', 'Transmission', 'Brakes'] },
  { id: 2, name: 'Bilal Ahmed', rating: 4.7, reviews: 89, rate: 1200, experience: '5 years', location: 'Clifton, Karachi', verified: true, image: 'https://i.pravatar.cc/150?img=33', skills: ['Engine Repair', 'AC Repair'] },
  { id: 3, name: 'Usman Ali', rating: 4.8, reviews: 156, rate: 1800, experience: '10 years', location: 'Gulshan, Karachi', verified: true, image: 'https://i.pravatar.cc/150?img=52', skills: ['Engine Repair', 'Diagnostics', 'Suspension'] },
  { id: 4, name: 'Hassan Raza', rating: 4.6, reviews: 72, rate: 1000, experience: '3 years', location: 'North Nazimabad', verified: false, image: 'https://i.pravatar.cc/150?img=15', skills: ['Oil Change', 'Brakes'] },
];

export default function SubcategoryDetail() {
  const { t } = useTranslation();
  const { categoryId, subId } = useParams();
  const category = categories.find((c) => c.id === categoryId);
  const subcategory = category?.subcategories.find((s) => s.id === subId);

  if (!category || !subcategory) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-bold">{t('categories.serviceNotFound')}</h1>
        <Link to="/categories" className="text-primary mt-4 inline-block">
          {t('categories.backToCategoriesLink')}
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb + Header */}
      <div className="bg-surface py-6 border-b border-border">
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
            <Link
              to={`/category/${category.id}`}
              className="text-text-secondary hover:text-primary transition-colors"
            >
              {category.name}
            </Link>
            <FiChevronRight className="text-text-secondary" size={14} />
            <span className="text-text-primary font-semibold">{subcategory.name}</span>
          </nav>

          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-white shadow-sm">
              {subcategory.icon}
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{subcategory.name}</h1>
              <p className="text-text-secondary mt-1">
                {sampleWorkers.length} {t('categories.workersAvailable')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters + Workers */}
      <div className="container-custom py-8">
        <div className="flex flex-wrap gap-3 mb-6">
          <select className="input max-w-xs">
            <option>{t('worker.sortRating')}</option>
            <option>{t('worker.sortPriceLow')}</option>
            <option>{t('worker.sortPriceHigh')}</option>
            <option>{t('worker.sortExperience')}</option>
          </select>
          <select className="input max-w-xs">
            <option>{t('worker.allPrices')}</option>
            <option>{t('worker.under1000')}</option>
            <option>{t('worker.1000to1500')}</option>
            <option>{t('worker.above1500')}</option>
          </select>
          <select className="input max-w-xs">
            <option>{t('worker.anyRating')}</option>
            <option>{t('worker.rating45')}</option>
            <option>{t('worker.rating40')}</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleWorkers.map((worker) => (
            <div key={worker.id} className="card p-6 hover:-translate-y-1 transition-all">
              <div className="flex items-start gap-4 mb-4">
                <img src={worker.image} alt={worker.name} className="w-16 h-16 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">{worker.name}</h3>
                    {worker.verified && (
                      <span className="text-xs bg-success/10 text-success px-2 py-0.5 rounded-full">
                        ✓ {t('worker.verified')}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-text-secondary mt-1">
                    <FiStar className="text-yellow-500 fill-yellow-500" size={14} />
                    <span className="font-semibold text-text-primary">{worker.rating}</span>
                    <span>({worker.reviews} {t('worker.reviews')})</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-text-secondary mt-1">
                    <FiMapPin size={12} /> {worker.location}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {worker.skills.map((skill) => (
                  <span key={skill} className="text-xs bg-surface px-2 py-1 rounded">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <div className="text-xs text-text-secondary">{t('worker.startingFrom')}</div>
                  <div className="font-bold text-lg">
                    Rs. {worker.rate}
                    <span className="text-xs font-normal text-text-secondary">{t('worker.perHour')}</span>
                  </div>
                </div>
                <Link to={`/worker/${worker.id}`} className="btn-primary text-sm py-2 px-4">
                  {t('worker.bookNow')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}