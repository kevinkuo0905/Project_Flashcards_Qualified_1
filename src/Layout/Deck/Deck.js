import React, { useState, useEffect } from "react"
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom"
import { readDeck, deleteDeck } from "../../utils/api"
import CardList from "../Card/CardList"

export default function Deck({ setDecks }) {
  const [deck, setDeck] = useState({})
  const { deckId } = useParams()
  const history = useHistory()
  const { url } = useRouteMatch()
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
  const handleDelete = async () => {
    if (window.confirm("Delete this deck?\nYou will not be able to recover it.")) {
      await deleteDeck(deck.id)
      setDecks((currentDecks) => currentDecks.filter((currentDeck) => currentDeck.id !== deck.id))
      history.push("/")
    }
  }

  return (
    <main>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="oi oi-home"></i> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      {deck.id ? (
        <>
          <section>
            <h5 className="card-title">{deck.name}</h5>
            <p className="card-text">{deck.description}</p>
            <div className="d-flex">
              <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary mr-2">
                <i className="oi oi-pencil"></i> Edit
              </Link>
              <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
                <i className="oi oi-book"></i> Study
              </Link>
              <Link to={`${url}/cards/new`} className="btn btn-primary">
                <i className="oi oi-plus"></i> Add Cards
              </Link>
              <button onClick={handleDelete} className="btn btn-danger ml-auto">
                <i className="oi oi-trash"></i>
              </button>
            </div>
          </section>
          <CardList cards={deck.cards} setDeck={setDeck} />
        </>
      ) : (
        <h3>Loading deck...</h3>
      )}
    </main>
  )
}
