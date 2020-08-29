import React from 'react'
import kannetje from '../img/kannetje.jpg'
import styled from 'styled-components'
import { boxShadow, media } from '../themes'

const FormContainer = styled.form`
  flex-grow: 1;
  padding: 15px 25px 35px;
  @media ${media.mobile} {
    padding: 15px 15px 35px;
  }
`
const Field = styled.div`
  margin: 15px 0;
  font-size: 14px;

  label:after {
    content: ' *';
    color: red;
    display: ${(props) => (props.required ? '' : 'none')};
  }
`
const Input = styled.input`
  padding: 5px;
  border-radius: 3px;
  max-width: 350px;
  width: 100%;
  border: 1px solid var(--input--color);
`
const Textarea = styled.textarea`
  padding: 5px;
  border-radius: 3px;
  max-width: 350px;
  width: 100%;
  border: 1px solid var(--input--color);
`

const Submit = styled.button`
  padding: 8px;
  border-radius: 50px;
  width: 180px;
  color: var(--white);
  font-size: 16px;
  margin: 25px 0 0;
  background: var(--theme--color);
  border: 2px solid var(--theme--color);
  box-shadow: ${boxShadow};
`
const Form = () => {
  return (
    <FormContainer
      name='file-upload'
      method='post'
      action='/contact/thanks/'
      data-netlify='true'
      data-netlify-honeypot='bot-field'
      // onSubmit={this.handleSubmit}
    >
      {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
      <Input type='hidden' name='form-name' value='file-upload' />
      <div hidden>
        <label>
          Don’t fill this out: <Input name='bot-field' />
        </label>
      </div>
      <Field required>
        <label htmlFor={'name'}>Naam</label>
        <div>
          <Input type={'text'} name={'name'} id={'name'} required={true} />
        </div>
      </Field>
      <Field required>
        <label htmlFor={'email'}>Email</label>
        <div>
          <Input type={'text'} name={'email'} id={'email'} required={true} />
        </div>
      </Field>
      <Field required>
        <label htmlFor={'text'}>Vraag</label>
        <div>
          <Textarea name='text' rows='6' cols='50' />
        </div>
      </Field>
      <div>
        <Field>
          <label>
            <span>
              <span>Upload foto 1: {` `}</span>
            </span>
            <input type='file' name='attachment' />
          </label>
        </Field>
        <Field>
          <label>
            <span>
              <span>Upload foto 2: {` `}</span>
            </span>
            <input type='file' name='attachment' />
          </label>
        </Field>
      </div>
      <div>
        <Submit is-link type='submit'>
          Verstuur
        </Submit>
      </div>
    </FormContainer>
  )
}

export default Form
