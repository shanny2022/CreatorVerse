import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../client'
import CreatorCard from '../components/CreatorCard'

export default function ShowCreators() {
  const [creators, setCreators] = useState([])

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase.from('creators').select('*').order('id')
      if (!error) setCreators(data ?? [])
    }

    fetchCreators()
  }, [])

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
