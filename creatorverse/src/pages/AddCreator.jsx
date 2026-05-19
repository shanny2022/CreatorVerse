import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatorForm from '../components/CreatorForm.jsx';
import { addCreator } from '../api/creators.js';

const initialFormData = {
  name: '',
  url: '',
  description: '',
  imageURL: ''
};

export default function AddCreator() {
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const newCreator = await addCreator(formData);
      navigate(`/creator/${newCreator.id}`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <section className="form-page">
      <p className="eyebrow">Add creator</p>
      <h1>Add someone worth following</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <CreatorForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Add Creator"
      />
    </section>
  );
}
