import React from "react"
import { Link } from "react-router-dom"
import DeckItem from "./DeckItem"
import ErrorMessage from ".././ErrorMessage"

export default function DeckList({ decks = [], setDecks, error = undefined }) {
  const deckDisplay = decks.map((deck, index) => (
    <DeckItem key={index} setDecks={setDecks} deck={deck} />
  ))
  if (error) return <ErrorMessage error={error} />

  return (
    <main>
      <Link to={`/decks/new`} className="btn btn-secondary mr-2">
        <i className="oi oi-plus"></i> Create Deck
      </Link>
      {decks.length !== 0 ? (
        <section className="mt-2">{deckDisplay}</section>
      ) : (
        <h3 className="mt-2">Loading decks...</h3>
      )}
    </main>
  )
}
