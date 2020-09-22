import React from 'react'
import { Table as CustomTable, Tag, Space, Tooltip } from 'antd'
import styled from 'styled-components'

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
const data = [
  {
    key: '1',
    datum: '10/09/2020',
    naam: 'John Brown',
    email: 'user@email.com',
    vraag: 'New York No. 1 Lake Park',
    antwoord: '',
    status: 'new',
  },
  {
    key: '2',
    datum: '10/09/2020',
    naam: 'Jim Green',
    email: 'user@email.com',
    vraag:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    antwoord: '',
    status: 'done',
  },
  {
    key: '3',
    datum: '10/09/2020',
    naam: 'Joe Black',
    email: 'user@email.com',
    vraag:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    antwoord:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    status: 'open',
  },
  {
    key: '4',
    datum: '20/03/2020',
    naam: 'Jim Van den Plas',
    email: 'user@email.com',
    vraag: 'Lorem ipsum',
    antwoord: 'lorem ipsum',
    status: 'done',
  },
  {
    key: '5',
    datum: '10/09/2020',
    naam: 'Joe Black',
    email: 'eprobst@theworkinggroup.ca',
    vraag: 'Sidney No. 1 Lake Park',
    antwoord: 'lorem ipsum',
    status: 'open',
  },
]

const Table = ({ selectItem }) => {
  const columns = [
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size='middle'>
          <Tooltip title='edit'>
            <ActionButton onClick={() => selectItem(record)}>
              <svg
                width='1em'
                height='1em'
                viewBox='0 0 16 16'
                class='bi bi-pencil'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fill-rule='evenodd'
                  d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z'
                />
              </svg>
            </ActionButton>
          </Tooltip>

          <Tooltip title='delete'>
            <svg
              width='1em'
              height='1em'
              viewBox='0 0 16 16'
              class='bi bi-trash'
              fill='currentColor'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
              <path
                fill-rule='evenodd'
                d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
              />
            </svg>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
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
  ]
  return (
    <CustomTable columns={columns} dataSource={data} scroll={{ x: '100vw' }} />
  )
}

export default Table
