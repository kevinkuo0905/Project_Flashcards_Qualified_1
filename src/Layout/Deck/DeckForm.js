import React from "react"
import { useHistory } from "react-router"

export default function DeckForm({ formData, setFormData, handleSubmit }) {
  const history = useHistory()
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.id]: target.value,
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          required
          className="form-control"
          id="name"
          placeholder="Deck Name"
          onChange={handleChange}
          value={formData.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          required
          className="form-control"
          id="description"
          placeholder="Brief description of the deck"
          onChange={handleChange}
          value={formData.description}
        />
      </div>
      <div onClick={history.goBack} className="btn btn-secondary mr-2">
        Cancel
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  )
}
