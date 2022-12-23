import React from 'react'
import { Table as CustomTable, Tag, Space, Tooltip, Alert, Modal } from 'antd'
import styled from 'styled-components'
const { confirm } = Modal

const ActionButton = styled.button`
  border: none;
  background: transparent;
  padding: 5px;
  width: 30px;
  &:hover {
    background: #cfd1b880;
    border-radius: 20px;
  }
`

function showConfirm(callback, item) {
  confirm({
    title: 'Verwijder deze vraag?',
    okText: 'Ja, verwijder',
    onOk() {
      callback(item)
    },
  })
}

function sortByStatus(a, b) {
  var statusA = a.status.toUpperCase() // ignore upper and lowercase
  var statusB = b.status.toUpperCase() // ignore upper and lowercase
  if (statusA < statusB) {
    return -1
  }
  if (statusA > statusB) {
    return 1
  }

  // names must be equal
  return 0
}

const Table = ({
  handleSelect,
  handleDelete,
  data,
  status,
  handleEmailAction,
}) => {
  const columns = [
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Tooltip title='edit'>
            <ActionButton onClick={() => handleSelect(record)}>
              <svg
                width='1em'
                height='1em'
                viewBox='0 0 16 16'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z'
                />
              </svg>
            </ActionButton>
          </Tooltip>
          <Tooltip title='email'>
            <ActionButton onClick={() => handleEmailAction(record)}>
              <svg
                width='1em'
                height='1em'
                viewBox='0 0 16 16'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z'
                />
              </svg>
            </ActionButton>
          </Tooltip>

          <Tooltip title='delete'>
            <ActionButton onClick={() => showConfirm(handleDelete, record)}>
              <svg
                width='1em'
                height='1em'
                viewBox='0 0 16 16'
                fill='currentColor'
              >
                <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
                <path
                  fillRule='evenodd'
                  d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
                />
              </svg>
            </ActionButton>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      sorter: sortByStatus,
      render: (status) => {
        let color = 'grey'
        if (status === 'done') color = '#81c784'
        if (status === 'open') color = '#ffb74d'
        if (status === 'new') color = '#e33371'
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        )
      },
    },
    {
      title: 'Naam',
      dataIndex: 'naam',
      key: 'naam',
      width: '200px',
    },
    {
      title: 'Datum',
      dataIndex: 'datum',
      key: 'datum',
      width: '200px',
      render: (datum) => new Date(datum).toLocaleDateString('en-gb'),
    },
    {
      title: 'Vraag',
      dataIndex: 'vraag',
      key: 'vraag',
      width: '600px',
    },
    {
      title: 'Antwoord',
      dataIndex: 'antwoord',
      key: 'antwoord',
      width: '600px',
    },
    {
      title: 'Titel',
      dataIndex: 'titel',
      key: 'titel',
      width: '600px',
    },
  ]
  return (
    <>
      {' '}
      {status === 'error' && (
        <Alert
          message='🤔 Foutmelding: check de console voor meer info.'
          type='error'
          showIcon
          style={{ marginBottom: 15 }}
        />
      )}
      <CustomTable
        columns={columns}
        dataSource={data}
        scroll={{ x: '100vw' }}
        rowKey={'_id'}
        loading={status === 'loading'}
      />
    </>
  )
}

export default Table
