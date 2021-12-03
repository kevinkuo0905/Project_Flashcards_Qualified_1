import React from "react"
import { Link } from "react-router-dom"

function NotFound() {
  return (
    <main>
      <div className="NotFound">
        <h1>Not Found</h1>
        <Link to="/">
          <p>Go Home</p>
        </Link>
      </div>
    </main>
  )
}

export default NotFound
