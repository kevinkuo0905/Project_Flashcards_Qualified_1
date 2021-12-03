import React, { useEffect, useState } from "react"
import { Switch, Route } from "react-router-dom"
import { listDecks } from "../utils/api"
import Header from "./Header"
import DeckList from "./Deck/DeckList"
import Deck from "./Deck/Deck"
import Study from "./Deck/Study"
import CreateDeck from "./Deck/CreateDeck"
import EditDeck from "./Deck/EditDeck"
import AddCard from "./Card/AddCard"
import EditCard from "./Card/EditCard"
import NotFound from "./NotFound"

function Layout() {
  const [decks, setDecks] = useState([])
  const [error, setError] = useState(undefined)
  useEffect(() => {
    const loadDecks = async () => {
      try {
        const response = await listDecks()
        setDecks(response)
      } catch (error) {
        setError(error)
      }
    }
    loadDecks()
  }, [])

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList decks={decks} setDecks={setDecks} error={error} />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck setDecks={setDecks} />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck setDecks={setDecks} />
          </Route>
          <Route exact path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default Layout
