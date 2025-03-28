import { useContext, useEffect, useState } from 'react'
import { ModalManager } from '@/models/Modal'
import { AppData } from '@/models/AppData'
import { Modal } from 'react-bootstrap'
import { ApplicantModalData } from '@/models/ApplicantModalData'
import { CgProfile } from 'react-icons/cg'
import { IoPersonSharp } from 'react-icons/io5'
import { Tools } from '@/components/Tools'
import { Permission } from '@/models/User'
import ViewApplicant from './components/ViewApplicant'
import { useTranslation } from 'react-i18next'
import EditApplicant from './components/EditApplicant'
import { HandleInstructionsContext } from '@/context'

export interface ApplicantModalProps {
  modal: ModalManager,
  data: ApplicantModalData,
  appData: AppData
}

export const reservedApplicantKeys = ['paid_deposit', 'tryouts_shirt_number', 'picture', 'comments', 'Name (First and Last)', "Email Address"]
export const applicantFormMappings: { [key: string]: string } = {
  "payment_method": "There will be a 100 kr deposit to secure your spot for the tryouts. You will get your deposit back when you show up for the tryout. If you are swishing from another name, please write down your own name in the message."
}
export default function ApplicantModal({ modal, data, appData }: ApplicantModalProps) {
  const handleInstructions = useContext(HandleInstructionsContext)
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null)
  const [mode, setMode] = useState<'view' | 'edit' | null>(null)

  const { t } = useTranslation()
  useEffect(() => {
    if (data.mode) {
      setMode(data.mode)
    }
  }, [data.mode])



  useEffect(() => {
    if (data.id && appData.applicants) {
      const applicant = appData.applicants.find((applicant) => applicant.id === data.applicantId)
      if (applicant) {
        setSelectedApplicant(applicant)
      }
    }
  }, [data.id, appData.applicants])

  function handleModalClose() {
    modal.off(data.name, data.id)
  }

  async function handleConfirmDelete(name: string, id: string, applicant: Applicant) {
    await handleInstructions('deleteApplicant', { toDeleteId: applicant.id })
    modal.off(name, id)
    handleModalClose()
  }

  async function handleClickDelete(id: string) {
    const applicant = (appData.applicants || []).find((e) => e.id === id)
    if (!applicant) {
      throw new Error('handleClickDelete post undefined')
    }
    console.log('handleClickDelete', applicant);

    modal.on({
      name: 'ConfirmModal',
      id: 'ContactModal-Delete',
      title: t('applicantModal.delete'),
      children: <div><span className='fw-light'>{t('applicantModal.deleteDescription')}{': '}</span><span className='fw-bold'>{applicant['Name (First and Last)']}</span></div>,
      mode: 'delete',
      info: applicant,
      handleConfirm: handleConfirmDelete
    })
  }

  function handleClickEdit() {
    setMode('edit')
  }

  function handleClickView() {
    setMode('view')
  }

  function getToolsToShow() {
    if (mode === 'view' && (appData?.userDetails?.permissions || []).includes(Permission.Admin)) {
      return { view: false, edit: true, delete: true }
    } else if (mode === 'edit' && (appData?.userDetails?.permissions || []).includes(Permission.Admin)) {
      return { view: true, edit: false, delete: true }
    } else {
      return { view: false, edit: false, delete: false }
    }
  }

  return (
    <Modal size='xl' fullscreen='lg-down' backdrop="static" show={modal.isModalVisible(data.name, data.id)} onHide={handleModalClose}>

      <Modal.Header closeButton >
        <Tools id={selectedApplicant?.id} handleClickEdit={handleClickEdit} handleClickDelete={handleClickDelete} handleClickView={handleClickView} inline={true} opacity={1} toolsToShow={getToolsToShow()} />
      </Modal.Header>

      <Modal.Body>
        {mode === 'view' && <ViewApplicant appData={appData} applicant={selectedApplicant} handleModalClose={handleModalClose} />}
        {mode === 'edit' && <EditApplicant appData={appData} applicant={selectedApplicant} handleModalClose={handleModalClose} />}
      </Modal.Body>
    </Modal >

  )
}
