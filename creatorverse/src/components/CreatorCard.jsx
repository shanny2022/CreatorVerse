import { ExternalLink, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CreatorCard({ creator }) {
  return (
    <article className="creator-card">
      <Link className="creator-card__image-link" to={`/creator/${creator.id}`} aria-label={`View ${creator.name}`}>
        {creator.imageURL ? (
          <img src={creator.imageURL} alt={creator.name} />
        ) : (
          <div className="image-placeholder">{creator.name.slice(0, 1)}</div>
        )}
      </Link>
      <div className="creator-card__content">
        <div>
          <Link className="creator-name" to={`/creator/${creator.id}`}>{creator.name}</Link>
          <p>{creator.description}</p>
        </div>
        <div className="creator-card__actions">
          <a href={creator.url} target="_blank" rel="noreferrer" aria-label={`Visit ${creator.name}`}>
            <ExternalLink size={18} />
            <span>Visit</span>
          </a>
          <Link to={`/edit/${creator.id}`} aria-label={`Edit ${creator.name}`}>
            <Pencil size={18} />
            <span>Edit</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
