import { Link } from 'react-router-dom'

export default function CreatorCard({ creator }) {
  return (
    <article className="card">
      {creator.imageURL ? <img src={creator.imageURL} alt={creator.name} /> : null}
      <h2>
        <Link to={`/creator/${creator.id}`}>{creator.name}</Link>
      </h2>
      <p>{creator.description}</p>
      <p>
        <a href={creator.url} target="_blank" rel="noreferrer">
          Visit channel ↗
        </a>
      </p>
      <Link className="btn" to={`/creator/${creator.id}/edit`}>
        Edit
      </Link>
    </article>
  )
}
