export default function CreatorForm({ formData, onChange, onSubmit, submitLabel, children }) {
  return (
    <form className="creator-form" onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={formData.name}
        onChange={onChange}
        placeholder="Creator name"
        required
      />

      <label htmlFor="url">Channel URL</label>
      <input
        id="url"
        name="url"
        type="url"
        value={formData.url}
        onChange={onChange}
        placeholder="https://example.com"
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={onChange}
        placeholder="What kind of content do they make?"
        rows="5"
        required
      />

      <label htmlFor="imageURL">Image URL</label>
      <input
        id="imageURL"
        name="imageURL"
        type="url"
        value={formData.imageURL}
        onChange={onChange}
        placeholder="https://example.com/image.jpg"
      />

      <div className="form-actions">
        <button type="submit">{submitLabel}</button>
        {children}
      </div>
    </form>
  );
}
