import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteCreator, getCreator, updateCreator } from '../api/creators'

export default function EditCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', url: '', description: '', imageURL: '' })

  useEffect(() => {
    const fetchCreator = async () => {
      const data = await getCreator(id)
      if (data) setForm(data)
    }
    fetchCreator()
  }, [id])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSave = async (e) => {
    e.preventDefault()
    await updateCreator(id, { name: form.name, url: form.url, description: form.description, imageURL: form.imageURL || null })
    navigate(`/creator/${id}`)
  }

  const onDelete = async () => {
    await deleteCreator(id)
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
