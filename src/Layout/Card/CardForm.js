import React from "react"
import { useHistory } from "react-router"

export default function CardForm({ formData, setFormData, handleSubmit, add }) {
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
        <label htmlFor="front">Front</label>
        <textarea
          type="text"
          required
          className="form-control"
          id="front"
          placeholder="Front side of card"
          onChange={handleChange}
          value={formData.front}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Back</label>
        <textarea
          type="text"
          required
          className="form-control"
          id="back"
          placeholder="Back side of card"
          onChange={handleChange}
          value={formData.back}
        />
      </div>
      <div onClick={history.goBack} className="btn btn-secondary mr-2">
        {add ? "Done" : "Cancel"}
      </div>
      <button type="submit" className="btn btn-primary">
        {add ? "Save" : "Submit"}
      </button>
    </form>
  )
}
