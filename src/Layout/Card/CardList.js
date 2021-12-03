import React from "react"
import CardItem from "./CardItem"

export default function CardList({ cards = [], setDeck }) {
  const cardDisplay = cards.map((card, index) => (
    <CardItem key={index} card={card} setDeck={setDeck} />
  ))

  return (
    <section className="mt-4">
      <h3>Cards</h3>
      {cardDisplay}
    </section>
  )
}
