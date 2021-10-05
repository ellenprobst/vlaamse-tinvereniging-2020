import React, { useState } from 'react'
import styled from 'styled-components'
import { boxShadow, media } from '../themes'
import { Upload, message, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'

const FormContainer = styled.form`
  padding: 15px 25px 35px;
  @media ${media.mobile} {
    padding: 15px 15px 35px;
  }
`

const Wrapper = styled.div`
  max-width: 450px;
`

const Container = styled.div`
  flex-grow: 1;
  padding: 15px 25px 35px;
  min-height: 535px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
  // if (showSuccess)
  //   return (
  //     <Container>
  //       <div>
  //         <p>Bedankt voor uw vraag.</p>
  //         <p> We nemen zo snel mogelijk contact op.</p>
  //         <Submit shape='round' onClick={() => setShowSuccess(false)}>
  //           Stel nieuwe vraag
  //         </Submit>
  //       </div>
  //     </Container>
  //   )

  return (
    <FormContainer
    // name='vragen-formulier-test'
    // method='post'
    // // action='/contact/thanks/'
    // data-netlify='true'
    // data-netlify-honeypot='bot-field'
    // onSubmit={handleSubmit}
    >
      <Wrapper>
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
            <Input type={'text'} name={'naam'} id={'naam'} required={true} />
          </div>
        </Field>
        <Field required>
          <label htmlFor={'email'}>Email</label>
          <div>
            <Input type={'text'} name={'email'} id={'email'} required={true} />
          </div>
        </Field>
        <Field required>
          <label htmlFor={'vraag'}>Vraag</label>
          <div>
            <Textarea name='vraag' rows='6' cols='50' />
          </div>
        </Field>

        <div>
          <Submit
            shape='round'
            htmlType='submit'
            // disabled={submitting || uploading}
            // loading={submitting}
          >
            Verstuur
          </Submit>
        </div>
      </Wrapper>
    </FormContainer>
  )
}

export default ContactForm
