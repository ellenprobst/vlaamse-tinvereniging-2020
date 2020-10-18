import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DeleteOutlined } from '@ant-design/icons'
import {
  Form as CustomForm,
  Input,
  Button,
  Checkbox,
  message,
  Image,
  Popconfirm,
} from 'antd'

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

  && .ant-input {
    border-color: #d9d9d973;
  }
`

const Actions = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0;
`

const ImageContainer = styled.div`
  position: relative;
  padding: 5px;
  border-radius: 3px;
  display: inline-block;
  margin-left: 5px;
  margin-bottom: 15px;
  line-height: 0;
  :hover {
    opacity: 0.5;

    ${Actions} {
      opacity: 1;
    }
  }
`

const Form = ({ initialValues, handleSubmit, handleCancel, disableSubmit }) => {
  const [form] = CustomForm.useForm()
  const [images, setImages] = useState(initialValues.images)
  const [imagesToDelete, setImagesToDelete] = useState([])
  useEffect(() => form.resetFields(), [initialValues, form])

  const onFinish = (values) => {
    if (values.publiceer) {
      !values.titel && message.error('Titel ontbreekt')
      !values.vraag && message.error('Vraag ontbreekt')
      !values.antwoord && message.error('Antwoord ontbreekt')

      if (!values.titel || !values.vraag || !values.antwoord) return
    }
    handleSubmit({ ...initialValues, ...values, images, imagesToDelete })
  }

  const onRemoveImage = (id) => {
    setImages(images.filter((image) => image.id !== id))
    setImagesToDelete([...imagesToDelete, id])
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
          verstuurEmail: false,
          publiceer: false,
          emailTemplate: template(initialValues.antwoord),
        }}
        onFinish={onFinish}
      >
        <CustomForm.Item label='Titel' name='titel' {...layout}>
          <Input />
        </CustomForm.Item>
        <CustomForm.Item label='Vraag' name='vraag' {...layout}>
          <Input.TextArea rows={4} />
        </CustomForm.Item>

        <div style={{ textAlign: 'right' }}>
          {images.map((item) => (
            <ImageContainer key={item.id}>
              <Image width={100} height={100} src={item.url} />
              <Actions>
                <Popconfirm
                  title='Foto verwijderen?'
                  onConfirm={() => onRemoveImage(item.id)}
                  okText='Ja'
                  cancelText='Cancel'
                >
                  <Button
                    shape='circle'
                    size='small'
                    style={{ background: '#000', color: '#FFF' }}
                    icon={<DeleteOutlined />}
                  />
                </Popconfirm>
              </Actions>
            </ImageContainer>
          ))}
        </div>
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
        </Group>

        <CustomForm.Item
          {...tailLayout}
          shouldUpdate={(prevValues, curValues) =>
            prevValues.publiceer !== curValues.publiceer
          }
          style={{ margin: ' 10px 0' }}
        >
          {({ getFieldValue }) => {
            let text = 'Opslaan'
            if (getFieldValue('publiceer')) text = 'Publiceer'
            return (
              <>
                <Button
                  type='primary'
                  htmlType='submit'
                  disabled={disableSubmit}
                  loading={disableSubmit}
                  shape='round'
                >
                  {text}
                </Button>

                <Button
                  htmlType='button'
                  onClick={handleCancel}
                  style={{ margin: '0 10px' }}
                  shape='round'
                >
                  Cancel
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
