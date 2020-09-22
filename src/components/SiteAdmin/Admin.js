import React, { useState } from 'react'
import Table from './Table'
import { Modal } from 'antd'
import Form from './Form'

const Admin = () => {
  const [isVisible, setVisibility] = useState(false)
  const [selected, setSelected] = useState(null)
  const closeModal = () => {
    setSelected(null)
    return setVisibility(false)
  }

  const selectItem = (item) => {
    setSelected(item)
    setVisibility(true)
  }
  return (
    <>
      <Table selectItem={selectItem} />

      {selected && (
        <Modal
          title={
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: '#e2e4d8',
                padding: '10px ',
                margin: '15px 25px 0 0',
              }}
            >
              <p>
                {selected.naam} | {selected.email}{' '}
              </p>

              <p
                style={{
                  // background: '#e2e4d8',
                  padding: '3px 5px',
                  borderRadius: 3,
                }}
              >
                {selected.datum}
              </p>
            </div>
          }
          visible={isVisible}
          onOk={closeModal}
          onCancel={closeModal}
          width={'1000px'}
        >
          {/* <pre>{JSON.stringify(selected, null, 2)}</pre> */}
          <Form initialValues={selected} />
        </Modal>
      )}
    </>
  )
}

export default Admin
