import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Table from './Table'
import { Modal, Result, Button, message } from 'antd'
import Form from './Form'
import EmailForm from './EmailForm'

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  padding: 10px;
`

const Admin = () => {
  const [isVisible, setVisibility] = useState(false)
  const [selected, setSelected] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [data, setData] = useState([])
  const [status, setStatus] = useState('loading')
  const [step, setStep] = useState(0)

  useEffect(() => {
    let canceled = false

    if (status !== 'loading') return

    fetch('/api/get-all-items')
      .then((response) => {
        if (canceled === true) return
        if (response.status !== 200) {
          console.error('Foutmelding:', response)
          return
        }
        return response.json()
      })
      .then((result) => {
        setData(result.vragen)
        setStatus('loaded')
      })
      .catch((err) => {
        console.log('Foutmelding:', err)
        setStatus('error')
      })

    return () => {
      canceled = true
    }
  }, [status])

  const closeModal = () => {
    setSelected(null)
    setStep(0)
    setVisibility(false)
  }

  const handleSelect = (item) => {
    setSelected(item)
    setVisibility(true)
  }

  const handleSubmit = (formData) => {
    setSubmitting(true)

    const status = formData.publiceer ? 'done' : 'open'
    fetch('/api/edit-item', {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
        id: formData._id,
        status: status,
        publicatieDatum: formData.publiceer ? new Date(Date.now()) : null,
        imagesToDelete: formData.imagesToDelete,
      }),
    })
      .then(() => {
        setSubmitting(false)
        setStatus('loading')
        setSelected(formData)
        status === 'done' ? setStep(1) : closeModal()
      })
      .catch((e) => console.log(e))
  }

  const handleDelete = (item) => {
    const loadingMessage = message.loading('👩‍💻 Even geduld...', 0)
    fetch('/api/delete-item', {
      method: 'POST',
      body: JSON.stringify({
        id: item._id,
        images: item.images,
      }),
    }).then(() => {
      loadingMessage() // hide loading message
      setStatus('loading')
    })
  }

  const handleEmail = () => setStep(2)

  return (
    <>
      <Table
        handleSelect={handleSelect}
        handleDelete={handleDelete}
        data={data}
        status={status}
      />

      {selected && (
        <Modal
          title={
            <Title>
              <p>
                {selected.naam} | email: {selected.email}
              </p>
              <p
                style={{
                  padding: '3px 5px',
                  borderRadius: 3,
                }}
              >
                {new Date(selected.datum).toLocaleDateString('en-gb')}
              </p>
            </Title>
          }
          visible={isVisible}
          onCancel={closeModal}
          footer={null}
          width={'1000px'}
          closable={false}
        >
          {step === 0 && (
            <Form
              initialValues={selected}
              handleSubmit={handleSubmit}
              handleCancel={closeModal}
              disableSubmit={submitting}
            />
          )}
          {step === 1 && (
            <Result
              icon={<></>}
              status='success'
              title='Het antwoord is gepubliceerd! 👍'
              extra={[
                <Button
                  key='email'
                  type='primary'
                  onClick={handleEmail}
                  shape='round'
                >
                  Email sturen ?
                </Button>,
                <Button key='close' type='' onClick={closeModal} shape='round'>
                  Close
                </Button>,
              ]}
            />
          )}

          {step === 2 && (
            <EmailForm
              initialValues={selected}
              handleSubmit={handleSubmit}
              handleCancel={closeModal}
              disableSubmit={submitting}
            />
          )}
        </Modal>
      )}
    </>
  )
}

export default Admin
