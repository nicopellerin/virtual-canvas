import React, { useState } from "react"
import styled from "styled-components"

const LoginPage = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = e => {
    e.preventDefault()
    const user = {
      username,
      password,
    }

    alert(JSON.stringify(user, null, 2))
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username</label>
        <input
          name="username"
          id="username"
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          id="password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button>Submit</button>
    </form>
  )
}

export default LoginPage
