import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import HeroForm from '../components/HeroForm';

function Home() {
  const [superheroes, setSuperheroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchSuperheroes = async () => {
      try {
        const response = await fetch('http://localhost:3000/superheroes');
        
        if (!response.ok) {
          throw new Error('Failed to fetch superheroes');
        }
        
        const data = await response.json();
        setSuperheroes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error('Fetch error:', err);
      }
    };

    fetchSuperheroes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Superheroes</h1>
        <button 
          onClick={() => setModal(true)} 
          className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
        >
          <Plus size={24} />
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Superpower</th>
            <th className="py-2 px-4 border-b">Humility Score</th>
          </tr>
        </thead>
        <tbody>
          {superheroes
            .sort((a, b) => b.humilityScore - a.humilityScore)
            .map((hero, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{hero.name}</td>
                <td className="py-2 px-4 border-b">{hero.superpower}</td>
                <td className="py-2 px-4 border-b">{hero.humilityScore}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {modal && (
        <HeroForm 
          onSubmit={(newHero) => setSuperheroes([...superheroes, newHero])}
          onClose={() => setModal(false)} 
        />
      )}
    </div>
  );
}

export default Home;
