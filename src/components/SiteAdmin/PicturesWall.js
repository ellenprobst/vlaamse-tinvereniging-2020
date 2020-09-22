import React, { useState } from 'react'
import { Upload, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

const data = [
  {
    uid: '1',
    name: 'foto1',
    url:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '2',
    name: 'foto12',
    url:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
]

const PicturesWall = () => {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setpreviewImage] = useState('')
  const [imgList, setImgList] = useState(data)

  const handleCancel = () => setPreviewVisible(false)
  const handleChange = ({ fileList }) => setImgList(fileList)
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setpreviewImage(file.url || file.preview)
    setPreviewVisible(true)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  return (
    <div style={{ textAlign: 'right' }}>
      <Upload
        action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
        listType='picture-card'
        fileList={imgList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {imgList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

export default PicturesWall
