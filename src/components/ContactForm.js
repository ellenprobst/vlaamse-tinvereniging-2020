import React, { useState } from 'react'
import styled from 'styled-components'
import { boxShadow, media } from '../themes'
import { Button } from 'antd'

const FormContainer = styled.form`
  padding: 15px 25px 35px;
  @media ${media.mobile} {
    padding: 15px 15px 35px;
  }
`

const Wrapper = styled.div`
  max-width: 450px;
`

const Field = styled.div`
  margin: 15px 0;
  font-size: 14px;

  label:after {
    content: ' *';
    color: red;
    display: ${(props) => (props.required ? '' : 'none')};
  }

  input[type='file'] {
    display: none;
  }

  button {
    background: white;
    border: 1px solid grey;
    border-radius: 3px;

    display: inline-flex;
    align-items: center;
    span {
      margin-left: 10px;
    }
  }
`

const Input = styled.input`
  padding: 5px;
  border-radius: 3px;

  width: 100%;
  border: 1px solid var(--input--color);
`
const Textarea = styled.textarea`
  padding: 5px;
  border-radius: 3px;

  width: 100%;
  border: 1px solid var(--input--color);
`

const Submit = styled(Button)`
  color: var(--white);
  margin: 25px 0 0;
  background: var(--theme--color);
  border: 2px solid var(--theme--color);
  box-shadow: ${boxShadow};
  :hover {
    border: 2px solid var(--theme--color);
    color: var(--theme--color);
  }
`

function encode(data) {
  const formData = new FormData()
  for (const key of Object.keys(data)) {
    formData.append(key, data[key])
  }
}
const ContactForm = () => {
  const initialState = { naam: '', email: '', vraag: '' }
  const [showSuccess, setShowSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [eachEntry, setEachEntry] = useState(initialState)
  const { naam, email, vraag } = eachEntry

  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    const form = e.target

    fetch('/', {
      method: 'POST',
      body: encode({
        'form-name': form.getAttribute('name'),
        ...eachEntry,
      }),
    })
      .then((res) => {
        setSubmitting(false)
        if (res.status !== 200) return
        setShowSuccess(true)
        setEachEntry(initialState)
      })
      .catch((error) => {
        setSubmitting(false)
      })
  }

  return (
    <FormContainer
      name='contact'
      method='post'
      data-netlify='true'
      data-netlify-honeypot='bot-field'
      onSubmit={handleSubmit}
    >
      <Wrapper>
        {showSuccess && (
          <>
            <p>Bedankt voor uw vraag.</p>
            <p> We nemen zo snel mogelijk contact op.</p>
          </>
        )}
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type='hidden' name='form-name' value='file-upload' />
        <div hidden>
          <label>
            Don’t fill this out: <Input name='bot-field' />
          </label>
        </div>
        <Field required>
          <label htmlFor={'naam'}>Naam</label>
          <div>
            <Input
              type={'text'}
              name={'naam'}
              id={'naam'}
              required={true}
              value={naam}
              onChange={handleInputChange}
            />
          </div>
        </Field>
        <Field required>
          <label htmlFor={'email'}>Email</label>
          <div>
            <Input
              type={'text'}
              name={'email'}
              id={'email'}
              required={true}
              value={email}
              onChange={handleInputChange}
            />
          </div>
        </Field>
        <Field required>
          <label htmlFor={'vraag'}>Vraag</label>
          <div>
            <Textarea
              name='vraag'
              rows='6'
              cols='50'
              value={vraag}
              onChange={handleInputChange}
            />
          </div>
        </Field>

        <div>
          <Submit
            shape='round'
            htmlType='submit'
            disabled={submitting}
            loading={submitting}
          >
            Verstuur
          </Submit>
        </div>
      </Wrapper>
    </FormContainer>
  )
}

export default ContactForm
