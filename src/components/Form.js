import React, { useState } from 'react'
import styled from 'styled-components'
import { boxShadow, media } from '../themes'
import { Upload, message, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'

const FormContainer = styled.form`
  flex-grow: 1;
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

  return formData
}

const kbToMb = (sizeInKb) => {
  return (sizeInKb / 1024 / 1024).toFixed(1)
}

const FILE_LIMIT = 10
const BASE_URL = 'https://api.cloudinary.com/v1_1/dljqgwvnc'

const Form = () => {
  const initialState = { naam: '', email: '', vraag: '' }
  const [eachEntry, setEachEntry] = useState(initialState)
  const [images, setImages] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)
  //const [size, setSize] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { naam, email, vraag } = eachEntry

  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value })
  }

  // const beforeUpload = (file) => {
  //   if (kbToMb(file.size + size) > 10) {
  //     message.error(`Maximale upload limiet is bereikt`)
  //     return false
  //   }
  //   return true
  // }

  const uploadImage = async (option) => {
    const { onSuccess, onError, file } = option
    setUploading(true)
    fetch(`${BASE_URL}/image/upload`, {
      method: 'POST',
      body: encode({ file, upload_preset: 'upload' }),
    })
      .then((response) => response.json())
      .then((response) => {
        onSuccess(response)
        setUploading(false)
      })
      .catch((err) => {
        onError(err)
        setUploading(false)
      })
  }

  const handleAttachmentChange = async (info) => {
    if (info.file.status === 'done') {
      // const size = info.fileList.reduce((res, item) => res + item.size, 0)
      // setSize(size)
    } else if (info.file.status === 'error') {
      message.error(`${info.file.error.message}`)
    }
    setImages(info.fileList.filter((file) => !!file.status))
  }

  const onRemove = (removeFile) => {
    setImages(images.filter((file) => file.uid !== removeFile.uid))
    //setSize(size - removeFile.size)

    // remove from cloudinary
    fetch(`${BASE_URL}/delete_by_token`, {
      method: 'POST',
      body: encode({ token: removeFile.response.delete_token }),
    })
      .then()
      .catch((err) => console.log(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    const form = e.target
    const imageList = images.map((file) => ({
      url: file.response.secure_url,
      id: file.response.public_id,
    }))

    fetch('/', {
      method: 'POST',
      body: encode({
        'form-name': form.getAttribute('name'),
        ...eachEntry,
        images: JSON.stringify(imageList),
      }),
    })
      .then((res) => {
        setSubmitting(false)
        if (res.status !== 200) return
        setShowSuccess(true)
        setEachEntry(initialState)
        setImages([])
      })
      .catch((error) => {
        setSubmitting(false)
        console.log(error)
      })
  }

  if (showSuccess)
    return (
      <Container>
        <div>
          <p>Bedankt voor uw vraag.</p>
          <p> We nemen zo snel mogelijk contact op.</p>
          <Submit shape='round' onClick={() => setShowSuccess(false)}>
            Stel nieuwe vraag
          </Submit>
        </div>
      </Container>
    )

  return (
    <FormContainer
      name='vragen-formulier-test'
      method='post'
      // action='/contact/thanks/'
      data-netlify='true'
      data-netlify-honeypot='bot-field'
      onSubmit={handleSubmit}
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
          <label htmlFor={'images'} hidden>
            Images
          </label>
          <Input
            type={'text'}
            name={'images'}
            id={'images'}
            hidden
            value={'test'}
          />
        </div>
        <ImgCrop>
          <Upload
            fileList={images}
            //beforeUpload={beforeUpload}
            onChange={handleAttachmentChange}
            customRequest={uploadImage}
            onRemove={onRemove}
            method='POST'
            accept='.jpeg,.jpg,.png'
          >
            <Button icon={<UploadOutlined />}>Foto toevoegen </Button>
          </Upload>
        </ImgCrop>
        <div>
          <Submit
            shape='round'
            htmlType='submit'
            disabled={submitting || uploading}
            loading={submitting}
          >
            Verstuur
          </Submit>
        </div>
      </Wrapper>
    </FormContainer>
  )
}

export default Form
