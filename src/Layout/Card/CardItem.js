import React from "react"
import { Link, useRouteMatch } from "react-router-dom"
import { deleteCard } from "../../utils/api"

export default function CardItem({ card = {}, setDeck }) {
    const {url} = useRouteMatch()
  const handleDelete = async () => {
    if (window.confirm("Delete this card?\nYou will not be able to recover it.")) {
      await deleteCard(card.id)
      setDeck((currentDeck) => {
        return {
          ...currentDeck,
          cards: currentDeck.cards.filter((currentCard) => currentCard.id !== card.id),
        }
      })
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex">
          <p className="w-50 mr-3">{card.front}</p>
          <p className="w-50 ml-3">{card.back}</p>
        </div>
        <div className="d-flex justify-content-end">
          <Link to={`${url}/cards/${card.id}/edit`} className="btn btn-secondary">
            <i className="oi oi-pencil"></i> Edit
          </Link>
          <button onClick={handleDelete} className="btn btn-danger ml-2">
            <i className="oi oi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
