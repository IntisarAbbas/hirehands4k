import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiSearch, FiBell, FiUser, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import LocationSelector from './LocationSelector';
import { languages } from '../i18n/config';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsLangOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-3">
        <div className="flex items-center gap-4">
          {/* Logo - Fixed solid blue */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10  bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm">
              H
            </div>
            <span className="font-bold text-[22px] hidden sm:block tracking-tight">
              Hire<span className="text-primary">Hands</span>
            </span>
          </Link>

          {/* Location */}
          <div className="hidden md:flex items-center border-l border-gray-200 pl-5 ml-1">
            <LocationSelector />
          </div>

          {/* Search - REMOVED from navbar for cleaner look (hero me already hai) */}

          {/* Right Side */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-2 hover:bg-gray-50 rounded-full transition-colors"
              >
                <span className="text-base">{currentLang.flag}</span>
                <span className="text-sm font-semibold hidden lg:block">EN</span>
                <FiChevronDown size={14} className="text-gray-500" />
              </button>
              {isLangOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                  <div className="absolute right-0 top-12 bg-white border border-gray-100 rounded-2xl shadow-xl w-56 z-50 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-sm flex items-center gap-3 ${i18n.language === lang.code? 'bg-blue-50 text-primary font-semibold' : ''}`}
                      >
                        <span>{lang.flag}</span><span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button className="relative p-2.5 hover:bg-gray-50 rounded-full transition-colors hidden sm:block">
              <FiBell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full ring-2 ring-white"></span>
            </button>

            <button className="p-2.5 hover:bg-gray-50 rounded-full transition-colors hidden sm:block">
              <FiUser size={20} />
            </button>

            {/* CTA - Orange for pop */}
            <Link to="/become-worker" className="hidden lg:block bg-accent hover:bg-orange-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-colors shadow-sm">
              {t('nav.becomeWorker')}
            </Link>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 hover:bg-gray-50 rounded-full lg:hidden">
              {isMenuOpen? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-1">
            <LocationSelector />
            <Link to="/" className="block p-3 hover:bg-gray-50 rounded-xl mt-3">Home</Link>
            <Link to="/become-worker" className="block p-3 bg-accent text-white rounded-xl text-center font-semibold mt-2">Become a Worker</Link>
          </div>
        </div>
      )}
    </header>
  );
}