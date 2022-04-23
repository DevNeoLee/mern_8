
import { Form } from 'react-bootstrap'

export default function Radio({ label, name, inline }) {
  return (
            <Form.Check
                inline={inline}
                label={label}
                name={name}
                type="radio"
                id={`radio-${name}-${label}`}
            />
        )
  }
       
          