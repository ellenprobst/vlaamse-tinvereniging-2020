import React, { useState } from 'react'
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

function encode(data) {
  const formData = new FormData()

  for (const key of Object.keys(data)) {
    formData.append(key, data[key])
  }

  return formData
}

const Form = () => {
  const initialState = { naam: '', email: '', vraag: '', images: [] }
  const [eachEntry, setEachEntry] = useState(initialState)
  const { naam, email, vraag, images } = eachEntry

  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value })
  }

  const handleAttachment = (e) => {
    // setState({ [e.target.name]: e.target.files[0] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(eachEntry)
    const form = e.target
    // fetch('/', {
    //   method: 'POST',
    //   body: encode({
    //     'form-name': form.getAttribute('name'),
    //     ...eachEntry,
    //   }),
    // })
    //   .then(() => {
    //     alert('success')
    //     setEachEntry(initialState)
    //   })
    //   .catch((error) => alert('error'))

    fetch('/api/create-item', {
      method: 'POST',
      body: JSON.stringify({
        // 'form-name': form.getAttribute('name'),
        ...eachEntry,
        datum: '2020-09-22',
      }),
    })
      .then((res) => {
        console.log(res)
        alert('success')
        setEachEntry(initialState)
      })
      .catch((error) => alert('error'))
  }

  return (
    <FormContainer
      name='vragen-formulier'
      method='post'
      // action='/contact/thanks/'
      // data-netlify='true'
      // data-netlify-honeypot='bot-field'
      onSubmit={handleSubmit}
    >
      {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
      <Input type='hidden' name='form-name' value='file-upload' />
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
        <Field>
          <label>
            <span>
              <span>Foto 1: {` `}</span>
            </span>
            <input type='file' name='attachment' />
          </label>
        </Field>
        <Field>
          <label htmlFor={'attachment1'}>
            <span>
              <span>Foto 2: {` `}</span>
            </span>
            <button type='button'>
              <svg
                width='20px'
                height='20px'
                viewBox='0 0 16 16'
                class='bi bi-cloud-arrow-up'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z'
                />
                <path
                  fill-rule='evenodd'
                  d='M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z'
                />
              </svg>
              <span> Upload</span>
            </button>
            <input type='file' name='attachment1' />
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
