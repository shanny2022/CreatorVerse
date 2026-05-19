import { ExternalLink, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCreator } from '../api/creators.js';

export default function ViewCreator() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadCreator() {
      try {
        const creatorData = await getCreator(id);
        setCreator(creatorData);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadCreator();
  }, [id]);

  if (isLoading) return <p className="status">Loading creator...</p>;
  if (errorMessage) return <p className="error">{errorMessage}</p>;
  if (!creator) return <p className="status">Creator not found.</p>;

  return (
    <section className="detail-page">
      {creator.imageURL && <img className="detail-image" src={creator.imageURL} alt={creator.name} />}
      <div className="detail-content">
        <p className="eyebrow">Creator profile</p>
        <h1>{creator.name}</h1>
        <p>{creator.description}</p>
        <a className="plain-url" href={creator.url} target="_blank" rel="noreferrer">{creator.url}</a>
        <div className="detail-actions">
          <a className="button-link" href={creator.url} target="_blank" rel="noreferrer">
            <ExternalLink size={18} />
            <span>Visit Channel</span>
          </a>
          <Link className="secondary-button" to={`/edit/${creator.id}`}>
            <Pencil size={18} />
            <span>Edit Creator</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
