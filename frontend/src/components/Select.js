import React from 'react'
import { Form } from 'react-bootstrap'

export default function Select({ question, choices }) {
  return (
      <Form.Select aria-label="Default select example" className="select">
          <option>{question}</option>
          {choices.map((choice, idx)=>(
              <option value="1" key={idx}>{choice}</option>
          ))}
      </Form.Select>
  )
}
