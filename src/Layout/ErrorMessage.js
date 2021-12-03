import React from "react"
import {Link} from "react-router-dom"

export default function ErrorMessage({ error }) {
  return error ? (
    <>
      <p className="text-danger">ERROR: {error.message}</p>
      <Link to="/">
        <p>Go Home</p>
      </Link>
    </>
  ) : null
}
