import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import CardForm from "./CardForm"
import { readDeck, createCard } from "../../utils/api"

export default function AddCard() {
  const [deck, setDeck] = useState({})
  const { deckId } = useParams()
  useEffect(() => {
    const loadDeck = async () => {
      try {
        const response = await readDeck(deckId)
        setDeck(response)
      } catch (error) {
        throw error
      }
    }
    loadDeck()
  }, [deckId])
  const initialFormState = {
    front: "",
    back: "",
  }
  const [formData, setFormData] = useState(initialFormState)
  const handleSubmit = async (event) => {
    event.preventDefault()
    await createCard(deck.id, formData)
    setFormData(initialFormState)
  }
  return (
    <main>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h3>{deck.name}: Add Card</h3>
      <CardForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        add={true}
      />
    </main>
  )
}
