import React, { useState, useEffect } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import { readDeck } from "../../utils/api"

export default function Study() {
  const [deck, setDeck] = useState({})
  const [currentCard, setCurrentCard] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const { deckId } = useParams()
  const history = useHistory()
  const flipCard = () => setFlipped((flipped) => !flipped)
  const nextCard = () => {
    flipCard()
    setCurrentCard((currentCard) => currentCard + 1)
  }
  const finish = () => {
    if (window.confirm("Restart cards?\nClick 'cancel' to return to the home page.")) {
      setCurrentCard(0)
      flipCard()
    } else {
      history.push("/")
    }
  }
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

  return (
    <main>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="oi oi-home"></i> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Study
          </li>
        </ol>
      </nav>
      <h3> {deck.name}: Study</h3>
      {deck.cards ? (
        deck.cards.length > 2 ? (
          <>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Card {currentCard + 1} of {deck.cards.length}
                </h5>
                <p>{flipped ? deck.cards[currentCard].back : deck.cards[currentCard].front}</p>
                <button onClick={flipCard} className="btn btn-secondary mr-2">
                  Flip
                </button>
                {flipped ? (
                  <button
                    onClick={1 + currentCard !== deck.cards.length ? nextCard : finish}
                    className="btn btn-primary"
                  >
                    Next
                  </button>
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <>
            <h5>Not enough cards.</h5>
            <p>
              You need at least 3 cards to study. There
              {deck.cards.length === 1 ? ` is 1 card ` : ` are ${deck.cards.length} cards `}
              in this deck.
            </p>
            <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
              <i className="oi oi-plus"></i> Add Cards
            </Link>
          </>
        )
      ) : (
        <h3>Loading deck...</h3>
      )}
    </main>
  )
}
