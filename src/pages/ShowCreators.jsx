import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CreatorCard from '../components/CreatorCard'
import { getCreators } from '../api/creators'

export default function ShowCreators() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCreators = async () => {
      const data = await getCreators()
      setCreators(data ?? [])
      setLoading(false)
    }

    fetchCreators()
  }, [])

  if (loading) return <p>Loading creators...</p>

  if (creators.length === 0) {
    return (
      <section>
        <p>No creators yet. Add your first creator!</p>
        <Link className="btn" to="/new">
          Add Creator
        </Link>
      </section>
    )
  }

  return (
    <section className="grid">
      {creators.map((creator) => (
        <CreatorCard key={creator.id} creator={creator} />
      ))}
    </section>
  )
}
