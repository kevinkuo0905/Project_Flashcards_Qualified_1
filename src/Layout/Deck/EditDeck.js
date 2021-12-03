import React, { useState, useEffect } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { readDeck, updateDeck } from "../../utils/api"
import DeckForm from "./DeckForm"

export default function EditDeck() {
  const [deck, setDeck] = useState({})
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
  })
  const { deckId } = useParams()
  useEffect(() => {
    const loadDeck = async () => {
      try {
        const response = await readDeck(deckId)
        setDeck(response)
        setFormData({
          id: `${response.id}`,
          name: `${response.name}`,
          description: `${response.description}`,
        })
      } catch (error) {
        throw error
      }
    }
    loadDeck()
  }, [deckId])
  const history = useHistory()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await updateDeck(formData)
    history.push(`/decks/${response.id}`)
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
            Edit Deck
          </li>
        </ol>
      </nav>
      <h3>Edit Deck</h3>
      <DeckForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
    </main>
  )
}
