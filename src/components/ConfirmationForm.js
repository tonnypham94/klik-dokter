import { Modal } from 'antd'

const ConfirmationForm = ({ isDelete, title, content, handleOk, handleCancel }) => {
  return (
    <Modal title={title} visible={isDelete} onOk={handleOk} onCancel={handleCancel}>
      <p>{content}</p>
    </Modal>
  )
}

export default ConfirmationForm
