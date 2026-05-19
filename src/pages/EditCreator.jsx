import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../client'

export default function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' })

  useEffect(() => {
    const fetchCreator = async () => {
      const { data } = await supabase.from('creators').select('*').eq('id', id).single()
      if (data) setForm(data)
    }
    fetchCreator()
  }, [id])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSave = async (e) => {
    e.preventDefault()
    await supabase
      .from('creators')
      .update({ name: form.name, url: form.url, description: form.description, imageURL: form.imageURL || null })
      .eq('id', id)
    navigate(`/creator/${id}`)
  }

  const onDelete = async () => {
    await supabase.from('creators').delete().eq('id', id)
    navigate('/')
  }

  return (
    <form className="form" onSubmit={onSave}>
      <h2>Edit Creator</h2>
      <input name="name" value={form.name ?? ''} required onChange={onChange} />
      <input name="url" value={form.url ?? ''} required onChange={onChange} />
      <textarea name="description" value={form.description ?? ''} required onChange={onChange} />
      <input name="imageURL" value={form.imageURL ?? ''} onChange={onChange} />
      <div className="row">
        <button type="submit">Save</button>
        <button type="button" className="danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </form>
  )
}
