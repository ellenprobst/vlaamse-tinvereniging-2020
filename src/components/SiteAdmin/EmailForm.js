import React, { useState, useEffect } from 'react'

import { Form as CustomForm, Input, Button, Result } from 'antd'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}

const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
}

const EmailForm = ({ initialValues, handleCancel, disableSubmit }) => {
  const [form] = CustomForm.useForm()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => form.resetFields(), [initialValues, form])

  const onFinish = (values) => {
    fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify(values),
    })
      .then(() => {
        setSuccess(true)
      })
      .catch((err) => {
        setError(err)
      })
  }

  const template = (placeholder) =>
    `Beste ${initialValues.naam}, \n\nHieronder vindt u het antwoord op uw vraag: \n \n ${placeholder} \n \n Met vriendelijke groeten, \n Vlaamse Tinvereniging`

  if (success)
    return (
      <Result
        icon={<></>}
        status='success'
        title='Email is verstuurd! 👍'
        extra={[
          <Button type='primary' key='close' onClick={handleCancel}>
            Close
          </Button>,
        ]}
      />
    )

  if (error)
    return (
      <Result
        status='error'
        title='Oeps! Fout bij het versturen van email.'
        subTitle={JSON.stringify(error)}
        extra={[
          <Button type='primary' key='console'>
            Close
          </Button>,
        ]}
      />
    )

  return (
    <CustomForm
      form={form}
      name='basic'
      initialValues={{
        naam: initialValues.naam,
        email: initialValues.email,
        titel: `Re: ${initialValues.titel}`,
        antwoord: template(initialValues.antwoord),
      }}
      onFinish={onFinish}
    >
      <CustomForm.Item
        label='Onderwerp'
        name='titel'
        {...layout}
        rules={[{ required: true, message: 'Onderwerp ontbreekt' }]}
      >
        <Input />
      </CustomForm.Item>
      <CustomForm.Item
        label='To'
        name='email'
        {...layout}
        rules={[{ required: true, message: 'Email ontbreekt' }]}
      >
        <Input />
      </CustomForm.Item>
      <CustomForm.Item
        label='Antwoord'
        name='antwoord'
        {...layout}
        rules={[{ required: true, message: 'Text ontbreekt' }]}
      >
        <Input.TextArea rows={8} />
      </CustomForm.Item>

      <CustomForm.Item {...tailLayout}>
        <Button type='primary' htmlType='submit' disabled={disableSubmit}>
          Verstuur
        </Button>
        <Button onClick={handleCancel} style={{ marginLeft: 10 }}>
          Cancel
        </Button>
      </CustomForm.Item>
    </CustomForm>
  )
}

export default EmailForm
