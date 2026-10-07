import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMapPin, FiChevronDown, FiX, FiSearch, FiNavigation } from 'react-icons/fi';
import { countries } from '../data/locations';

export default function LocationSelector() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedCity, setSelectedCity] = useState(countries[0].cities[0]);
  const [selectedArea, setSelectedArea] = useState(countries[0].cities[0].areas[0]);
  const [step, setStep] = useState('country'); // country | city | area
  const [searchQuery, setSearchQuery] = useState('');

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setStep('city');
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setStep('area');
  };

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    setIsOpen(false);
    setStep('country');
    // Save to localStorage
    localStorage.setItem('location', JSON.stringify({
      country: selectedCountry.code,
      city: selectedCity.name,
      area,
    }));
  };

  const handleGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setSelectedArea('Current Location');
          setIsOpen(false);
        },
        () => alert('Location access denied. Please select manually.')
      );
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
      >
        <FiMapPin className="text-accent" />
        <div className="text-left hidden sm:block">
          <div className="text-xs text-text-secondary">{t('nav.deliverTo')}</div>
          <div className="font-semibold flex items-center gap-1">
            {selectedArea}, {selectedCity.name}
            <FiChevronDown className="text-xs" />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                {step !== 'country' && (
                  <button
                    onClick={() => setStep(step === 'area' ? 'city' : 'country')}
                    className="p-1 hover:bg-surface rounded"
                  >
                    ←
                  </button>
                )}
                <h2 className="text-xl font-bold">
                  {step === 'country' && t('location.selectCountry')}
                  {step === 'city' && t('location.selectCity')}
                  {step === 'area' && t('location.selectArea')}
                </h2>
              </div>
              <button
                onClick={() => { setIsOpen(false); setStep('country'); }}
                className="p-2 hover:bg-surface rounded-full transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[65vh]">
              {/* GPS Button */}
              <button
                onClick={handleGPS}
                className="w-full flex items-center gap-3 p-4 bg-primary/5 border-2 border-primary/20 
                         rounded-lg hover:bg-primary/10 transition-colors mb-4"
              >
                <FiNavigation className="text-primary" size={20} />
                <div className="text-left">
                  <div className="font-semibold text-primary">{t('location.useCurrent')}</div>
                  <div className="text-xs text-text-secondary">{t('location.autoDetect')}</div>
                </div>
              </button>

              {/* Search */}
              <div className="relative mb-4">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder={t('location.searchArea')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10"
                />
              </div>

              {/* Country List */}
              {step === 'country' && (
                <div className="space-y-2">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                      className="w-full flex items-center gap-3 p-4 hover:bg-surface 
                               rounded-lg transition-colors text-left"
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <span className="font-semibold">{country.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* City List */}
              {step === 'city' && (
                <div className="space-y-2">
                  <div className="text-sm text-text-secondary mb-3 flex items-center gap-2">
                    <span className="text-xl">{selectedCountry.flag}</span>
                    {selectedCountry.name}
                  </div>
                  {selectedCountry.cities.map((city) => (
                    <button
                      key={city.name}
                      onClick={() => handleCitySelect(city)}
                      className="w-full p-4 hover:bg-surface rounded-lg transition-colors text-left font-semibold"
                    >
                      {city.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Area List */}
              {step === 'area' && (
                <div className="space-y-2">
                  <div className="text-sm text-text-secondary mb-3">
                    {selectedCountry.flag} {selectedCountry.name} → {selectedCity.name}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedCity.areas.map((area) => (
                      <button
                        key={area}
                        onClick={() => handleAreaSelect(area)}
                        className="p-3 text-sm hover:bg-surface rounded-lg transition-colors text-left"
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}