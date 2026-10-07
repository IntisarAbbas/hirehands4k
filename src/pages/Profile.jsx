import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiUser, FiPhone, FiMapPin, FiBriefcase, FiDollarSign, FiClock, FiEdit, FiTrash2, FiChevronRight } from 'react-icons/fi';
import { categories } from '../data/categories';

export default function Profile() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const category = categories.find((c) => c.id === categoryId);

  useEffect(() => {
    const saved = localStorage.getItem('workerProfile');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.categoryId === categoryId) {
        setProfile(parsed);
      }
    }
  }, [categoryId]);

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

  if (!profile) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">No Profile Found</h1>
        <p className="text-text-secondary mb-6">
          You haven't created a profile for {category.name} yet.
        </p>
        <Link
          to={`/create-profile/${categoryId}`}
          className="btn-primary inline-block"
        >
          Create Profile
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      localStorage.removeItem('workerProfile');
      navigate(`/category/${categoryId}`);
    }
  };

  return (
    <div className="animate-fade-in bg-surface min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border py-4">
        <div className="container-custom">
          <nav className="flex items-center gap-2 text-sm flex-wrap">
            <Link to="/" className="text-text-secondary hover:text-primary">Home</Link>
            <FiChevronRight className="text-text-secondary" size={14} />
            <Link to="/categories" className="text-text-secondary hover:text-primary">Categories</Link>
            <FiChevronRight className="text-text-secondary" size={14} />
            <Link to={`/category/${category.id}`} className="text-text-secondary hover:text-primary">
              {category.name}
            </Link>
            <FiChevronRight className="text-text-secondary" size={14} />
            <span className="text-text-primary font-semibold">My Profile</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-10 max-w-3xl">
        <div className="bg-white rounded-xl shadow-sm border border-border p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6 pb-6 border-b border-border">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-3xl font-bold">
                {profile.fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{profile.fullName}</h1>
                <p className="text-text-secondary">{category.name} Professional</p>
                <span className="inline-block mt-1 text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                  ✓ Profile Active
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/create-profile/${categoryId}`)}
                className="p-2 hover:bg-surface rounded-lg transition-colors text-primary"
                title="Edit"
              >
                <FiEdit size={18} />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 hover:bg-surface rounded-lg transition-colors text-danger"
                title="Delete"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 text-text-secondary text-sm mb-1">
                <FiPhone /> Phone
              </div>
              <div className="font-semibold">{profile.dialCode} {profile.phone}</div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-text-secondary text-sm mb-1">
                <FiMapPin /> Location
              </div>
              <div className="font-semibold">
                {profile.city}{profile.area && `, ${profile.area}`}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-text-secondary text-sm mb-1">
                <FiBriefcase /> Service
              </div>
              <div className="font-semibold">
                {category.subcategories.find((s) => s.id === profile.service)?.name}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-text-secondary text-sm mb-1">
                <FiClock /> Experience
              </div>
              <div className="font-semibold">{profile.experience} years</div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-text-secondary text-sm mb-1">
                <FiDollarSign /> Hourly Rate
              </div>
              <div className="font-semibold">Rs. {profile.hourlyRate}/hr</div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-text-secondary text-sm mb-1">
                Country
              </div>
              <div className="font-semibold">{profile.countryName}</div>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-6 pt-6 border-t border-border">
            <h2 className="font-bold mb-2">About</h2>
            <p className="text-text-secondary">{profile.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}