import React from 'react'
import kannetje from '../img/kannetje.jpg'
import styled from 'styled-components'
import { boxShadow } from '../themes'

const FormContainer = styled.form`
  background: var(--white);
  border-radius: 3px;
  padding: 20px 35px;
  margin-bottom: -35px;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  flex-grow: 1;
`
const Field = styled.div`
  margin: 15px 0;
  font-size: 14px;

  label:after {
    content: ' *';
    color: red;
  }
`
const Input = styled.input`
  padding: 5px;
  border-radius: 3px;
  width: 350px;
  border: 2px solid var(--theme--color);
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
      <Field>
        <label htmlFor={'name'}>Naam</label>
        <div>
          <Input type={'text'} name={'name'} id={'name'} required={true} />
        </div>
      </Field>
      <Field>
        <label htmlFor={'email'}>Email</label>
        <div>
          <Input type={'text'} name={'email'} id={'email'} required={true} />
        </div>
      </Field>
      <Field>
        <label htmlFor={'text'}>Vraag</label>
        <div>
          <textarea name='text' rows='6' cols='50' />
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
          Send
        </Submit>
      </div>
    </FormContainer>
  )
}

export default Form
