import React from "react"
import { Link, useHistory } from "react-router-dom"

export default function ErrorMessage({ error }) {
  const history = useHistory()
  const handleClick = () => history.go(0)
  return error ? (
    <>
      <p className="text-danger">ERROR: {error.message}</p>
      <Link onClick={handleClick}>
        Refresh
      </Link>
    </>
  ) : null
}
