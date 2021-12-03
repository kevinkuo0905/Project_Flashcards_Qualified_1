import React from "react"
import { Link } from "react-router-dom"
import { deleteDeck } from "../../utils/api"

export default function Deck({ deck = {}, setDecks }) {
  const handleDelete = async () => {
    if (window.confirm("Delete this deck?\nYou will not be able to recover it.")) {
      await deleteDeck(deck.id)
      setDecks((currentDecks) => currentDecks.filter((currentDeck) => currentDeck.id !== deck.id))
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex">
          <h5 className="card-title">{deck.name}</h5>
          <p className="ml-auto">{deck.cards?.length} cards</p>
        </div>
        <p className="card-text">{deck.description}</p>
        <div className="d-flex">
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
            <i className="oi oi-eye"></i> View
          </Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
            <i className="oi oi-book"></i> Study
          </Link>
          <button onClick={handleDelete} className="btn btn-danger ml-auto">
            <i className="oi oi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
