import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { createDeck } from "../../utils/api"
import DeckForm from "./DeckForm"

export default function CreateDeck({ setDecks }) {
  const initialFormState = {
    name: "",
    description: "",
  }
  const [formData, setFormData] = useState(initialFormState)
  const history = useHistory()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await createDeck(formData)
    setFormData(initialFormState)
    setDecks((currentDecks) => [...currentDecks, response])
    history.push(`/decks/${response.id}`)
  }

  return (
    <main>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h3>Create Deck</h3>
      <DeckForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
    </main>
  )
}
