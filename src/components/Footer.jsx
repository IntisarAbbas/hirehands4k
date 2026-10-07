import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiMail, FiPhone, FiMapPin
} from 'react-icons/fi';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent 
                            rounded-lg flex items-center justify-center font-bold text-xl">
                H
              </div>
              <span className="font-bold text-xl">
                Hire<span className="text-accent">Hands</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              {t('footer.brandDescription')}
            </p>
            <div className="flex gap-3">
              {[FiFacebook, FiInstagram, FiTwitter, FiYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-white/10 rounded-full 
                                            flex items-center justify-center 
                                            hover:bg-accent transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-accent">{t('footer.about')}</Link></li>
              <li><Link to="/how-it-works" className="hover:text-accent">{t('footer.howItWorks')}</Link></li>
              <li><Link to="/careers" className="hover:text-accent">{t('footer.careers')}</Link></li>
              <li><Link to="/contact" className="hover:text-accent">{t('footer.contact')}</Link></li>
              <li><Link to="/blog" className="hover:text-accent">{t('footer.blog')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/category/mechanics" className="hover:text-accent">{t('footer.mechanics')}</Link></li>
              <li><Link to="/category/home-services" className="hover:text-accent">{t('footer.homeServices')}</Link></li>
              <li><Link to="/category/appliance-repair" className="hover:text-accent">{t('footer.applianceRepair')}</Link></li>
              <li><Link to="/category/cleaning" className="hover:text-accent">{t('footer.cleaning')}</Link></li>
              <li><Link to="/category/electronics" className="hover:text-accent">{t('footer.electronics')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">{t('footer.contactTitle')}</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <FiMapPin className="mt-1 shrink-0" />
                <span>{t('footer.location')}</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="shrink-0" />
                <span>{t('footer.phone')}</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="shrink-0" />
                <span>{t('footer.email')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row 
                      items-center justify-between gap-4 text-sm text-gray-400">
          <p>{t('footer.rights')}</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-accent">{t('footer.terms')}</Link>
            <Link to="/privacy" className="hover:text-accent">{t('footer.privacy')}</Link>
            <Link to="/faqs" className="hover:text-accent">{t('footer.faqs')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}