import React from 'react'
import { Link } from 'react-router-dom'


export default function Game() {
    return (
        <section>
            <h1>Flood Game</h1>
            <h2>Round 3</h2>
            <p>Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit </p>
            <Link to="/form"><button>Finish</button></Link>
        </section>
    )
}
