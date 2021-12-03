import React, { useState, useEffect } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { readDeck, readCard, updateCard } from "../../utils/api"
import CardForm from "./CardForm"

export default function EditDeck() {
  const [deck, setDeck] = useState({})
  const [card, setCard] = useState({})
  const [formData, setFormData] = useState({
    id: "",
    front: "",
    back: "",
    deckId: "",
  })
  const { deckId, cardId } = useParams()
  useEffect(() => {
    const loadDeck = async () => {
      try {
        const cardResponse = await readCard(cardId)
        const deckResponse = await readDeck(deckId)
        setCard(cardResponse)
        setDeck(deckResponse)
        setFormData({
          id: cardResponse.id,
          front: cardResponse.front,
          back: cardResponse.back,
          deckId: deckResponse.id,
        })
      } catch (error) {
        throw error
      }
    }
    loadDeck()
  }, [cardId, deckId])
  const history = useHistory()
  const handleSubmit = async (event) => {
    event.preventDefault()
    await updateCard(formData)
    history.goBack()
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
            Edit Card {card.id}
          </li>
        </ol>
      </nav>
      <h3>Edit Card</h3>
      <CardForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        add={false}
      />
    </main>
  )
}
