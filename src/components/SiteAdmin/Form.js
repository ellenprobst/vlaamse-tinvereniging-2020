import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Form as CustomForm, Input, Button, Checkbox, Row, Col } from 'antd'
import PicturesWall from './PicturesWall'

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
}
const tailLayout = {
  wrapperCol: { offset: 4, span: 20 },
}

const Group = styled.div`
  && .ant-form-item {
    margin-bottom: 0;
  }
`

const FormWrapper = styled.div`
  && .ant-form-item-control-input {
    min-height: 0;
  }
`

const Form = ({ initialValues }) => {
  const [form] = CustomForm.useForm()
  const [showField, setShowField] = useState(false)
  useEffect(() => form.resetFields(), [initialValues], [])
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onReset = () => {
    form.resetFields()
  }

  const template = (placeholder) =>
    `Beste ${initialValues.naam}, \n\nHieronder vindt u het antwoord op uw vraag: \n \n ${placeholder} \n \n Met vriendelijke groeten, \n Vlaamse Tinvereniging`

  return (
    <FormWrapper>
      <CustomForm
        form={form}
        name='basic'
        initialValues={{
          ...initialValues,
          emailTemplate: template(initialValues.antwoord),
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <CustomForm.Item label='Vraag' name='vraag' {...layout}>
          <Input.TextArea rows={4} />
        </CustomForm.Item>
        <PicturesWall />
        <CustomForm.Item
          label='Antwoord'
          name='antwoord'
          {...layout}
          onChange={(e) =>
            !form.isFieldTouched('emailTemplate') &&
            form.setFieldsValue({ emailTemplate: template(e.target.value) })
          }
        >
          <Input.TextArea rows={8} />
        </CustomForm.Item>

        <Group>
          <CustomForm.Item
            {...tailLayout}
            name='publiceer'
            valuePropName='checked'
          >
            <Checkbox>Publiceer</Checkbox>
          </CustomForm.Item>
          <CustomForm.Item
            {...tailLayout}
            name='verstuurEmail'
            valuePropName='checked'
          >
            <Checkbox
            // onChange={(e) => {
            //   setShowField(e.target.checked)
            // }}
            >
              Verstuur email
            </Checkbox>
          </CustomForm.Item>
        </Group>
        <CustomForm.Item
          shouldUpdate={(prevValues, curValues) => prevValues !== curValues}
          style={{ marginTop: 25 }}
        >
          {({ getFieldValue }) => {
            return getFieldValue('verstuurEmail') === true ? (
              <CustomForm.Item label='Email' name='emailTemplate' {...layout}>
                <Input.TextArea rows={8} value={template('ellen')} />
              </CustomForm.Item>
            ) : null
          }}
        </CustomForm.Item>

        <CustomForm.Item
          {...tailLayout}
          shouldUpdate={(prevValues, curValues) =>
            prevValues.verstuurEmail !== curValues.verstuurEmail ||
            prevValues.publiceer !== curValues.publiceer
          }
        >
          {({ getFieldValue }) => {
            let text = 'Save'
            if (getFieldValue('publiceer')) text = 'Publiceer'
            if (getFieldValue('verstuurEmail')) text = 'Verstuur email'
            if (getFieldValue('publiceer') && getFieldValue('verstuurEmail'))
              text = 'Publiceer en verstuur email'
            return (
              <>
                <Button htmlType='button' onClick={onReset}>
                  Reset
                </Button>
                <Button
                  type='primary'
                  htmlType='submit'
                  style={{ marginLeft: 10 }}
                >
                  {text}
                </Button>
              </>
            )
          }}
        </CustomForm.Item>
      </CustomForm>
    </FormWrapper>
  )
}

export default Form
