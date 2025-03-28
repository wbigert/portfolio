import { HandleInstructionsContext } from '@/context.js'
import { useContext } from 'react'
import { ModalManager } from '@/models/Modal'
import { AppData } from '@/models/AppData'
import { UserModalData } from '@/models/UserModal'
import { User } from '@/models/User'
import Apply from '../Apply'
import { Modal } from 'react-bootstrap'


export interface ApplyModalProps {
  modal: ModalManager,
  data: ApplyModalData,
  appData: AppData
}

export default function ApplyModal({ modal, data, appData }: ApplyModalProps) {
  function handleModalClose() {
    modal.off(data.name, data.id)
  }
  return (
    <Modal size='xl' fullscreen='lg-down' backdrop="static" show={modal.isModalVisible(data.name, data.id)} onHide={handleModalClose}>
      <Modal.Header closeButton />
      <Modal.Body><Apply handleModals={modal} appData={appData} /></Modal.Body>
    </Modal>

  )
}
