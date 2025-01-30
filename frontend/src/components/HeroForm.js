import React, { useState } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';

function HeroForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    superpower: '',
    humilityScore: ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Hero name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Hero name must be at least 2 characters long';
    }

    // Superpower validation
    if (!formData.superpower.trim()) {
      newErrors.superpower = 'Superpower is required';
    } else if (formData.superpower.trim().length < 3) {
      newErrors.superpower = 'Superpower must be at least 3 characters long';
    }

    // Humility Score validation
    const score = parseFloat(formData.humilityScore);
    if (formData.humilityScore === '') {
      newErrors.humilityScore = 'Humility score is required';
    } else if (isNaN(score) || score < 1 || score > 10) {
      newErrors.humilityScore = 'Humility score must be between 1 and 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: undefined
      }));
    }
    
    // Clear server error when user modifies form
    if (serverError) {
      setServerError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    // Start submission
    setSubmitting(true);
    setServerError(null);

    try {
      const response = await fetch('http://localhost:3000/superheroes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          superpower: formData.superpower.trim(),
          humilityScore: parseFloat(formData.humilityScore)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create superhero');
      }

      const newHero = await response.json();
      onSubmit(newHero);
      onClose();
    } catch (error) {
      console.error('Error creating superhero:', error);
      setServerError(error.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-6 text-center">Add New Superhero</h2>
        
        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4 flex items-center">
            <AlertCircle className="mr-2 text-red-600" size={20} />
            <span>{serverError}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Hero Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 
                ${errors.name 
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300'}`}
              placeholder="Enter hero name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="superpower" className="block text-sm font-medium text-gray-700 mb-1">
              Superpower
            </label>
            <input
              type="text"
              id="superpower"
              value={formData.superpower}
              onChange={handleChange}
              className={`block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 
                ${errors.superpower 
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300'}`}
              placeholder="Describe their superpower"
            />
            {errors.superpower && (
              <p className="mt-1 text-sm text-red-600">{errors.superpower}</p>
            )}
          </div>
          
          <div className="mb-6">
            <label htmlFor="humilityScore" className="block text-sm font-medium text-gray-700 mb-1">
              Humility Score (1-10)
            </label>
            <input
              type="number"
              id="humilityScore"
              value={formData.humilityScore}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.1"
              className={`block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 
                ${errors.humilityScore 
                  ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300'}`}
              placeholder="Rate their humility"
            />
            {errors.humilityScore && (
              <p className="mt-1 text-sm text-red-600">{errors.humilityScore}</p>
            )}
          </div>
          
          <div className="flex justify-between space-x-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md 
                hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 
                disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Save size={20} className="mr-2" />
              {submitting ? 'Saving...' : 'Create Hero'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-md 
                hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HeroForm;
