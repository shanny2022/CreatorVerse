import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

export default function AddCreator() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    await supabase.from('creators').insert({
      name: form.name,
      url: form.url,
      description: form.description,
      imageURL: form.imageURL || null,
    })
    navigate('/')
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h2>Add Creator</h2>
      <input name="name" placeholder="Name" required onChange={onChange} />
      <input name="url" placeholder="Channel URL" required onChange={onChange} />
      <textarea name="description" placeholder="Description" required onChange={onChange} />
      <input name="imageURL" placeholder="Image URL (optional)" onChange={onChange} />
      <button type="submit">Create</button>
    </form>
  )
}
