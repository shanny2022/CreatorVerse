import { Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CreatorForm from '../components/CreatorForm.jsx';
import { deleteCreator, getCreator, updateCreator } from '../api/creators.js';

const initialFormData = {
  name: '',
  url: '',
  description: '',
  imageURL: ''
};

export default function EditCreator() {
  const { id } = useParams();
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCreator() {
      try {
        const creator = await getCreator(id);
        setFormData({
          name: creator.name || '',
          url: creator.url || '',
          description: creator.description || '',
          imageURL: creator.imageURL || ''
        });
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadCreator();
  }, [id]);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await updateCreator(id, formData);
      navigate(`/creator/${id}`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function handleDelete() {
    try {
      await deleteCreator(id);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  if (isLoading) return <p className="status">Loading creator...</p>;

  return (
    <section className="form-page">
      <p className="eyebrow">Edit creator</p>
      <h1>Update this creator</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <CreatorForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      >
        <button className="danger-button" type="button" onClick={handleDelete}>
          <Trash2 size={18} />
          <span>Delete</span>
        </button>
      </CreatorForm>
    </section>
  );
}
