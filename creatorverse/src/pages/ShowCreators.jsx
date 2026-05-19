import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CreatorCard from '../components/CreatorCard.jsx';
import { getCreators } from '../api/creators.js';

export default function ShowCreators() {
  const [creators, setCreators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadCreators() {
      try {
        const creatorsData = await getCreators();
        setCreators(creatorsData);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadCreators();
  }, []);

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">WEB103 Prework</p>
          <h1>Favorite content creators</h1>
        </div>
        <Link className="button-link" to="/new">
          <Plus size={18} />
          <span>Add Creator</span>
        </Link>
      </div>

      {isLoading && <p className="status">Loading creators...</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}
      {!isLoading && !errorMessage && creators.length === 0 && (
        <p className="status">No creators yet. Add the first one to start your Creatorverse.</p>
      )}
      <div className="creator-grid">
        {creators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </section>
  );
}
