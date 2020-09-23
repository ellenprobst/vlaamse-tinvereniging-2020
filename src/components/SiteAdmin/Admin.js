import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Table from './Table'
import { Modal, Result, Button } from 'antd'
import Form from './Form'

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e2e4d8;
  padding: 10px;
  margin: 15px 25px 0 0;
`

const Admin = () => {
  const [isVisible, setVisibility] = useState(false)
  const [selected, setSelected] = useState(null)
  const [showSucces, setShowSucces] = useState(false)
  const [data, setData] = useState([])
  const [status, setStatus] = useState('loading')

  const closeModal = () => {
    setShowSucces(false)
    setSelected(null)
    return setVisibility(false)
  }

  const handleSelect = (item) => {
    setSelected(item)
    setVisibility(true)
  }

  useEffect(() => {
    let canceled = false

    if (status !== 'loading') return

    fetch('/.netlify/functions/get-all-items')
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

  const handleSubmit = (formData) => {
    fetch('/.netlify/functions/edit-item', {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
        id: formData._id,
      }),
    }).then(() => {
      setStatus('loading')
      setShowSucces(true)
    })
  }

  const handleDelete = (item) => {
    fetch('/.netlify/functions/delete-item', {
      method: 'POST',
      body: JSON.stringify({
        id: item._id,
      }),
    }).then(() => {
      setStatus('loading')
    })
  }

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
                {selected.naam} | {selected.email}{' '}
              </p>
              <p
                style={{
                  padding: '3px 5px',
                  borderRadius: 3,
                }}
              >
                {selected.datum}
              </p>
            </Title>
          }
          visible={isVisible}
          footer={null}
          width={'1000px'}
        >
          {showSucces && (
            <Result
              status='success'
              title='Successfully Purchased Cloud Server ECS!'
              extra={[
                <Button type='primary' onClick={closeModal}>
                  Close
                </Button>,
              ]}
            />
          )}
          {!showSucces && (
            <Form
              initialValues={selected}
              handleSubmit={handleSubmit}
              handleCancel={closeModal}
            />
          )}
        </Modal>
      )}
    </>
  )
}

export default Admin
