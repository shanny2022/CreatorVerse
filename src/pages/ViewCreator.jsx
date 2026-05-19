import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCreator } from '../api/creators'

export default function ViewCreator() {
  const { id } = useParams()
  const [creator, setCreator] = useState(null)

  useEffect(() => {
    const fetchCreator = async () => {
      const data = await getCreator(id)
      setCreator(data)
    }
    fetchCreator()
  }, [id])

  if (!creator) return <p>Loading creator...</p>

  return (
    <section className="detail">
      {creator.imageURL ? <img src={creator.imageURL} alt={creator.name} /> : null}
      <h2>{creator.name}</h2>
      <p>{creator.description}</p>
      <p>
        <a href={creator.url} target="_blank" rel="noreferrer">
          Visit channel ↗
        </a>
      </p>
      <div className="row">
        <Link className="btn" to={`/creator/${creator.id}/edit`}>
          Edit
        </Link>
        <Link className="btn secondary" to="/">
          Back
        </Link>
      </div>
    </section>
  )
}
