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
import { HandleInstructionsContext } from "@/context";
import { IoPersonSharp, IoReturnUpBackSharp } from "react-icons/io5";
import { AiOutlineFileImage } from "react-icons/ai";

interface PhotoModeProps {
  appData: AppData
  handleModals: ModalManager
  setMode: (mode: 'photo' | 'comment' | 'decide') => void,
  selectedTryoutDay: string
  setSelectedTryoutDay: (day: string) => void
}

export default function PhotoMode({ appData, handleModals, setMode, selectedTryoutDay, setSelectedTryoutDay }: PhotoModeProps) {
  const { t } = useTranslation()
  const [matchedApplicants, setMatchedApplicants] = useState<Applicant[]>([])
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | undefined>(undefined)
  const [applicantPicture, setApplicantPicture] = useState<string>('')
  const handleInstructions = useContext(HandleInstructionsContext)
  const imageRefs = useRef<HTMLInputElement[]>([])
  const iconRefs = useRef<HTMLImageElement[]>([])
  const addPictureRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (selectedApplicant) {
      setApplicantPicture(selectedApplicant.picture)
    }
  }, [selectedApplicant])

  useEffect(() => {
    console.log("applicantPicture", applicantPicture);

  }, [applicantPicture])

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

  async function handleChangePicture(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target
    if (!files) {
      return
    }
    throw new Error('No API calls in tech demo!')
    // await uploadImage(files[0]).then(url => {
    //   setApplicantPicture(url)
    //   handleInstructions('updateApplicant', { applicant: { ...selectedApplicant, picture: url }, tryout_id: appData.tryout_id })
    // })
    // if (addPictureRef.current) {
    //   addPictureRef.current.value = ''
    // }
  }

  if (selectedApplicant) {
    return (
      <PageContainer title={t('tryouts.photo.title') + ': ' + selectedApplicant['name']}>
        <div className="row g-2">
          <DecideOption
            icon={<IoReturnUpBackSharp size={70} />}
            text={t('tryouts.button.selectApplicant')}
            onClick={() => setSelectedApplicant(undefined)}
          />
          <DecideOption
            icon={<AiOutlineFileImage size={70} />}
            text={t(`editApplicant.label.changePicture`)}
            onClick={() => addPictureRef.current?.click()}
          />

        </div>
        <input
          style={{ display: 'none' }}
          ref={addPictureRef}
          type='file'
          name='picture'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangePicture(e)}
        />
        <div className='d-flex flex-column my-3 justify-content-center align-items-center text-center'>
          <div className='d-flex justify-content-center w-100' style={{ maxWidth: '400px' }}>
            {applicantPicture ? (
              <img
                className='img-fluid'
                src={applicantPicture}
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
    <PageContainer title={t('tryouts.photo.pickApplicant') + ': ' + selectedTryoutDay} intro={t('tryouts.photo.intro')}>
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