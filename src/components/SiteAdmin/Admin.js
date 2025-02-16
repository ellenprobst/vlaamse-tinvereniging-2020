import React, { useState } from 'react'
import styled from 'styled-components'
import Table from './Table'
import { Modal, Result, Button, Tag } from 'antd'
import Form from './Form'
import EmailForm from './EmailForm'
import { firestore } from '../../firebase'
import useFirestoreQuery from '../../hooks/useFirestoreQuery'

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  padding: 10px;
`

const Stats = styled.div`
  margin-bottom: 10px;
`

const Admin = () => {
  const [isVisible, setVisibility] = useState(false)
  const [selected, setSelected] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState('loading')
  const [step, setStep] = useState(0)

  const db = firestore.collection('vragen')
  const [vragen, isLoading, error] = useFirestoreQuery(
    firestore.collection('vragen').orderBy('datum', 'desc')
  )

  const closeModal = () => {
    setSelected(null)
    setSubmitting(false)
    setStep(0)
    setVisibility(false)
  }

  const handleSelect = (item) => {
    setSelected(item)
    setVisibility(true)
  }

  const handleEmailAction = (item) => {
    handleSelect(item)
    handleEmail()
  }

  const handleSubmit = (formData) => {
    setSubmitting(true)

    const status = formData.publiceer ? 'done' : 'open'
    db.doc(selected?._id)
      .update({
        vraag: formData.vraag || '',
        titel: formData.titel || '',
        antwoord: formData.antwoord || '',
        status: status,
        publicatieDatum: formData.publiceer ? new Date(Date.now()) : null,
        imagesToDelete: formData.imagesToDelete || [],
      })
      .then(() => {
        setSubmitting(false)
        setStatus('loading')
        setSelected(formData)
        setStep(1)
      })
      .catch((e) => {
        setSubmitting(false)
        setStatus('loading')
        console.log(e)
      })
  }

  const handleDelete = (item) => {
    db.doc(item._id).delete()
  }

  const handleEmail = () => setStep(2)

  return (
    <div>
      <Stats>
        <Tag>
          gepubliceerd:{` `}
          {vragen.filter((item) => item.status === 'done').length}
        </Tag>
        <Tag>
          open:{` `}
          {vragen.filter((item) => item.status === 'open').length}
        </Tag>
        <Tag>
          new:{` `}
          {vragen.filter((item) => item.status === 'new').length}
        </Tag>
      </Stats>
      <Table
        handleSelect={handleSelect}
        handleDelete={handleDelete}
        handleEmailAction={handleEmailAction}
        data={vragen}
        status={isLoading ? 'loading' : error ? 'error' : 'ready'}
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
          open={isVisible}
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
              title={`Het antwoord is ${
                selected.status === 'done' ? 'gepubliceerd' : 'opgeslagen'
              }! 👍 `}
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
    </div>
  )
}

export default Admin
