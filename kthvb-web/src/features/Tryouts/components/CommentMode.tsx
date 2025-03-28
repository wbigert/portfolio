import PageContainer from "@/components/PageContainer";
import { useTranslation } from "react-i18next";
import DecideOption from "./DecideOption";
import { MdAddAPhoto } from "react-icons/md";
import { BiCommentAdd } from "react-icons/bi";
import { AppData } from "@/models/AppData";
import { ModalManager } from "@/models/Modal";
import { Button, Form } from "react-bootstrap";
import { useEffect, useState, useRef, useContext } from "react";
import { TryoutDay } from "@/models/TryoutDays";
import { AddedImage } from "@/features/UserModal/components/AddedImage";
import { uploadImage } from "@/requests/api";
import { HandleInstructionsContext } from "@/context";
import { IoPersonSharp, IoReturnUpBackSharp } from "react-icons/io5";
import { AiOutlineFileImage } from "react-icons/ai";
import ApplicantComments from "@/features/ApplicantModal/components/ApplicantComments";
import EditApplicantComments from "@/features/ApplicantModal/components/EditApplicantComments";
import { Comment } from "@/models/Comment";
import { log } from "console";

interface CommentModeProps {
  appData: AppData
  handleModals: ModalManager
  setMode: (mode: 'photo' | 'comment' | 'decide') => void,
  selectedTryoutDay: string
  setSelectedTryoutDay: (day: string) => void
}

export default function CommentMode({ appData, handleModals, setMode, selectedTryoutDay, setSelectedTryoutDay }: CommentModeProps) {
  const { t } = useTranslation()
  const [matchedApplicants, setMatchedApplicants] = useState<Applicant[]>([])
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | undefined>(undefined)
  const [applicantComments, setApplicantComments] = useState<Comment[]>([])
  const handleInstructions = useContext(HandleInstructionsContext)
  const addPictureRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    if (selectedApplicant) {
      setApplicantComments(selectedApplicant.comments)
    }
  }, [selectedApplicant])

  useEffect(() => {
    if (selectedApplicant) {
      setApplicantComments(appData.applicants?.find(applicant => applicant.id === selectedApplicant.id)?.comments || selectedApplicant.comments)
    }
  }, [appData.applicants])

  useEffect(() => {
    if (selectedTryoutDay && appData?.applicants) {
      const tryoutDay: TryoutDay | undefined = appData.settings?.tryoutDays.find(day => day.name === selectedTryoutDay)
      if (!tryoutDay) {
        return
      }
      const matchedApplicants = appData?.applicants.filter(applicant => tryoutDay.applicants.includes(applicant.id))
      // sort by applicant.tryouts_shirt_number
      matchedApplicants.sort((a, b) => {
        if (a.tryouts_shirt_number && b.tryouts_shirt_number) {
          return a.tryouts_shirt_number - b.tryouts_shirt_number
        }
        if (a.tryouts_shirt_number) {
          return -1
        }
        if (b.tryouts_shirt_number) {
          return 1
        }
        return 0
      })
      setMatchedApplicants(matchedApplicants)
    }
  }, [selectedTryoutDay, appData.applicants])

  function handleBack() {
    setMode('decide')
  }

  function handleAddComment(comment: Comment) {
    if (applicantComments) {
      const newComments = [...(applicantComments || []), comment]
      handleInstructions('updateApplicant', { applicant: { ...selectedApplicant, comments: newComments }, tryout_id: appData.tryout_id  })
    }
  }

  function handleRemoveComment(commentId: string) {
    if (applicantComments) {
      const newComments = applicantComments.filter((comment: Comment) => comment.id !== commentId)
      handleInstructions('updateApplicant', { applicant: { ...selectedApplicant, comments: newComments }, tryout_id: appData.tryout_id })
    }
  }

  if (selectedApplicant) {
    return (
      <PageContainer title={t('tryouts.comment.title') + ': ' + selectedApplicant['name'] + " (" + selectedApplicant['tryouts_shirt_number'] + ')'}>
        <div className="row g-2 ">
          <DecideOption
            icon={<IoReturnUpBackSharp size={70} />}
            text={t('tryouts.button.selectApplicant')}
            onClick={() => setSelectedApplicant(undefined)}
            fullWidth={true}
          />
        </div>
        <Form.Group className='mb-3' controlId='formComments'>
          <EditApplicantComments
            appData={appData}
            comments={applicantComments}
            handleAddComment={handleAddComment}
            handleRemoveComment={handleRemoveComment}
          />
        </Form.Group>
        <div className='d-flex flex-column my-3 justify-content-center align-items-center text-center'>
          <div className='d-flex justify-content-center w-100' style={{ maxWidth: '400px' }}>
            {selectedApplicant['picture'] ? (
              <img
                className='img-fluid'
                src={selectedApplicant['picture']}
                alt={selectedApplicant['name']}
              />
            ) : (
              <IoPersonSharp size={200} />
            )
            }
          </div>
          <span className='fs-4'>{selectedApplicant['picture'] ? t('tryouts.photo.currentPicture') : t('tryouts.photo.noPicture')}</span>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer title={t('tryouts.comment.pickApplicant') + ': ' + selectedTryoutDay} intro={t('tryouts.comment.intro')}>
      <div className="row g-2">
        <DecideOption
          icon={<IoReturnUpBackSharp size={70} />}
          text={t('tryouts.button.selectAction')}
          onClick={() => handleBack()}
        />
        {matchedApplicants && matchedApplicants.map((applicant, idx) => (
          <DecideOption
            key={idx}
            icon={<span className="fs-1 fw-bold text-center">{applicant.tryouts_shirt_number}</span>}
            text={applicant['name']}
            onClick={() => setSelectedApplicant(applicant)}
          />
        ))}
      </div>

    </PageContainer >
  )
}