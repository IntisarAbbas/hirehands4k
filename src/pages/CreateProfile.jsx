import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiChevronRight, FiUser, FiPhone, FiMapPin, FiBriefcase, FiDollarSign, FiClock, FiCheck } from 'react-icons/fi';
import { categories } from '../data/categories';
import { countriesData } from '../data/countries';

export default function CreateProfile() {
  const { t } = useTranslation();
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = categories.find((c) => c.id === categoryId);

  const [formData, setFormData] = useState({
    fullName: '',
    country: '',
    phone: '',
    service: '',
    experience: '',
    hourlyRate: '',
    city: '',
    area: '',
    bio: '',
    availability: 'available',
  });

  const [errors, setErrors] = useState({});
  const [detectedCountry, setDetectedCountry] = useState(null);

  // Auto-detect country
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        const found = countriesData.find((c) => c.code === data.country_code);
        if (found) {
          setDetectedCountry(found);
          setFormData((prev) => ({ ...prev, country: found.code }));
        }
      } catch (err) {
        // Fallback to Pakistan
        setDetectedCountry(countriesData[0]);
        setFormData((prev) => ({ ...prev, country: countriesData[0].code }));
      }
    };
    detectCountry();
  }, []);

  // Check saved profile
  useEffect(() => {
    const saved = localStorage.getItem('workerProfile');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.categoryId === categoryId) {
        navigate(`/profile/${categoryId}`);
      }
    }
  }, [categoryId, navigate]);

  if (!category) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <Link to="/categories" className="text-primary mt-4 inline-block">
          Back to Categories
        </Link>
      </div>
    );
  }

  const selectedCountry = countriesData.find((c) => c.code === formData.country) || detectedCountry;

  const validatePhone = (phone, country) => {
    if (!country) return 'Please select a country first';
    if (!phone) return 'Phone number is required';
    if (!country.phonePattern.test(phone)) {
      return `Invalid phone number for ${country.name}. Expected ${country.phoneLength} digits.`;
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    
    const phoneError = validatePhone(formData.phone, selectedCountry);
    if (phoneError) newErrors.phone = phoneError;
    
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.experience) newErrors.experience = 'Experience is required';
    if (!formData.hourlyRate) newErrors.hourlyRate = 'Hourly rate is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.bio.trim()) newErrors.bio = 'Bio is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save profile
    const profile = {
      ...formData,
      categoryId,
      categoryName: category.name,
      countryName: selectedCountry.name,
      dialCode: selectedCountry.dialCode,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem('workerProfile', JSON.stringify(profile));
    navigate(`/profile/${categoryId}`);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <div className="animate-fade-in bg-surface min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border py-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-text-secondary hover:text-primary">
              Home
            </Link>
            <FiChevronRight className="text-text-secondary" size={14} />
            <Link to="/categories" className="text-text-secondary hover:text-primary">
              Categories
            </Link>
            <FiChevronRight className="text-text-secondary" size={14} />
            <Link to={`/category/${category.id}`} className="text-text-secondary hover:text-primary">
              {category.name}
            </Link>
            <FiChevronRight className="text-text-secondary" size={14} />
            <span className="text-text-primary font-semibold">Create Profile</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-10 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-4xl bg-white shadow-md">
            {category.icon}
          </div>
          <h1 className="text-3xl font-bold mb-2">Create Your Profile</h1>
          <p className="text-text-secondary">
            Join HireHands as a {category.name} professional
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-border p-6 md:p-8 space-y-6">
          
          {/* Full Name */}
          <div>
            <label className="block font-semibold mb-2 flex items-center gap-2">
              <FiUser className="text-primary" /> Full Name *
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="e.g. Ahmed Khan"
              className={`input ${errors.fullName ? 'border-danger' : ''}`}
            />
            {errors.fullName && (
              <p className="text-danger text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Country + Phone */}
          <div>
            <label className="block font-semibold mb-2 flex items-center gap-2">
              <FiPhone className="text-primary" /> Phone Number *
            </label>
            <div className="flex gap-2">
              {/* Country Selector */}
              <select
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className="input max-w-[180px]"
              >
                {countriesData.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.dialCode}
                  </option>
                ))}
              </select>

              {/* Phone Input */}
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ''))}
                placeholder={selectedCountry ? `e.g. ${selectedCountry.phoneLength} digits` : 'Phone number'}
                maxLength={selectedCountry?.phoneLength || 15}
                className={`input flex-1 ${errors.phone ? 'border-danger' : ''}`}
              />
            </div>
            {detectedCountry && formData.country === detectedCountry.code && (
              <p className="text-xs text-success mt-1 flex items-center gap-1">
                <FiCheck /> Auto-detected: {detectedCountry.name}
              </p>
            )}
            {errors.phone && (
              <p className="text-danger text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Service Selection */}
          <div>
            <label className="block font-semibold mb-2 flex items-center gap-2">
              <FiBriefcase className="text-primary" /> Select Your Service *
            </label>
            <select
              value={formData.service}
              onChange={(e) => handleChange('service', e.target.value)}
              className={`input ${errors.service ? 'border-danger' : ''}`}
            >
              <option value="">-- Choose a service --</option>
              {category.subcategories.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.icon} {sub.name}
                </option>
              ))}
            </select>
            {errors.service && (
              <p className="text-danger text-sm mt-1">{errors.service}</p>
            )}
            <p className="text-xs text-text-secondary mt-1">
              {category.subcategories.length} services available in {category.name}
            </p>
          </div>

          {/* Experience */}
          <div>
            <label className="block font-semibold mb-2 flex items-center gap-2">
              <FiClock className="text-primary" /> Years of Experience *
            </label>
            <select
              value={formData.experience}
              onChange={(e) => handleChange('experience', e.target.value)}
              className={`input ${errors.experience ? 'border-danger' : ''}`}
            >
              <option value="">-- Select experience --</option>
              <option value="1">1 year</option>
              <option value="2">2 years</option>
              <option value="3">3 years</option>
              <option value="5">5 years</option>
              <option value="7">7 years</option>
              <option value="10">10+ years</option>
              <option value="15">15+ years</option>
            </select>
            {errors.experience && (
              <p className="text-danger text-sm mt-1">{errors.experience}</p>
            )}
          </div>

          {/* Hourly Rate */}
          <div>
            <label className="block font-semibold mb-2 flex items-center gap-2">
              <FiDollarSign className="text-primary" /> Hourly Rate (PKR) *
            </label>
            <input
              type="number"
              value={formData.hourlyRate}
              onChange={(e) => handleChange('hourlyRate', e.target.value)}
              placeholder="e.g. 1500"
              className={`input ${errors.hourlyRate ? 'border-danger' : ''}`}
            />
            {errors.hourlyRate && (
              <p className="text-danger text-sm mt-1">{errors.hourlyRate}</p>
            )}
          </div>

          {/* City + Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-2 flex items-center gap-2">
                <FiMapPin className="text-primary" /> City *
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="e.g. Karachi"
                className={`input ${errors.city ? 'border-danger' : ''}`}
              />
              {errors.city && (
                <p className="text-danger text-sm mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="block font-semibold mb-2">Area</label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => handleChange('area', e.target.value)}
                placeholder="e.g. DHA"
                className="input"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block font-semibold mb-2">About You *</label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="Tell customers about your skills, experience, and what makes you special..."
              rows={4}
              maxLength={500}
              className={`input ${errors.bio ? 'border-danger' : ''}`}
            />
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              {errors.bio && <span className="text-danger">{errors.bio}</span>}
              <span className="ml-auto">{formData.bio.length}/500</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary w-full py-4 text-lg font-bold"
          >
            Create Profile
          </button>

          <p className="text-xs text-text-secondary text-center">
            By creating a profile, you agree to our Terms & Privacy Policy
          </p>
        </form>
      </div>
    </div>
  );
}