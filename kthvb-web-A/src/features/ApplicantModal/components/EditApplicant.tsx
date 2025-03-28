import { AppData } from "@/models/AppData"
import { IoPersonSharp } from "react-icons/io5"
import ApplicantInfoLine from "./ApplicantInfoLine"
import { useTranslation } from "react-i18next"
import { applicantFormMappings, reservedApplicantKeys } from ".."
import ApplicantComments from "./ApplicantComments"
import ApplicantGroups from "./ApplicantGroups"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { AddedImage } from "@/features/UserModal/components/AddedImage"
import { useContext, useEffect, useRef, useState } from "react"
import { uploadImage } from "@/requests/api"
import { IApplicantGroup } from "@/models/ApplicantGroup"
import { Comment } from "@/models/Comment"
import EditApplicantComments from "./EditApplicantComments"
import { HandleInstructionsContext } from "@/context"
import { Settings } from "@/models/Settings"
import { TryoutDay } from "@/models/TryoutDays"
interface EditApplicantProps {
  appData: AppData,
  applicant: Applicant | null,
  handleModalClose: () => void
}

export default function EditApplicant({ appData, applicant, handleModalClose }: EditApplicantProps) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<Applicant | null>(null)
  const [applicantGroups, setApplicantGroups] = useState<IApplicantGroup[]>([])
  const [tryoutDays, setTryoutDays] = useState<TryoutDay[]>([])

  const imageRefs = useRef<HTMLInputElement[]>([])
  const iconRefs = useRef<HTMLImageElement[]>([])
  const addFrontImageRef = useRef<HTMLInputElement>(null)
  const handleInstructions = useContext(HandleInstructionsContext)
  useEffect(() => {
    if (applicant) {
      setFormData({
        id: applicant.id,
        paid_deposit: applicant.paid_deposit || false,
        tryouts_shirt_number: applicant.tryouts_shirt_number || null,
        picture: applicant.picture || '',
        comments: applicant.comments || [],
        groups: applicant.groups || []
      })
    }
    if (appData.settings) {
      setApplicantGroups(appData.settings.applicantGroups)
      setTryoutDays(appData.settings.tryoutDays)
    }
  }, [applicant, appData.settings])

  useEffect(() => {
    console.log(formData);
  }, [formData])

  useEffect(() => {
    console.log(applicantGroups);
  }, [applicantGroups])

  if (!applicant || formData === null) {
    return null
  }

  async function handleSubmit() {
    if (!formData || !appData.settings) return

    const result = await Promise.all([handleInstructions('updateApplicant', { applicant: formData, delayUpdate: true }), handleInstructions('updateSettings', { settings: { ...appData.settings, applicantGroups: applicantGroups, tryoutDays: tryoutDays }, delayUpdate: true })])
    const applicantResults: Applicant[] = result[0] || appData.users || []
    const settingsResult: Settings = result[1] || appData.settings || null
    await handleInstructions('updateAppData', { appData: { ...appData, applicants: applicantResults, settings: settingsResult } })

    handleModalClose()
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target
    console.log(name, value, files);

    if (name === 'picture' && files !== null && files.length > 0) {
      await uploadImage(files[0]).then(url => {
        setFormData({ ...formData, picture: url })
      })
      if (addFrontImageRef.current) {
        addFrontImageRef.current.value = ''
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  function handleDeleteFrontPicture() {
    setFormData({ ...formData, picture: '' });
  }

  function handleGroupChange(e: React.ChangeEvent<HTMLInputElement>, group: { name: string, applicants: string[] }, mode: 'applicantGroups' | 'tryoutDays') {
    const { checked } = e.target;

    if (applicant) {
      let newGroups;
      if (mode === 'applicantGroups') {
        newGroups = applicantGroups.map(g => {
          if (g.name === group.name) {
            if (checked && !g.applicants.includes(applicant.id)) {
              return { ...g, applicants: [...g.applicants, applicant.id] };
            } else if (!checked) {
              return { ...g, applicants: g.applicants.filter(id => id !== applicant.id) };
            }
          }
          return g;
        });
        setApplicantGroups(newGroups);
      } else if (mode === 'tryoutDays') {
        newGroups = tryoutDays.map(g => {
          if (g.name === group.name) {
            if (checked && !g.applicants.includes(applicant.id)) {
              return { ...g, applicants: [...g.applicants, applicant.id] };
            } else if (!checked) {
              return { ...g, applicants: g.applicants.filter(id => id !== applicant.id) };
            }
          }
          return g;
        });
        setTryoutDays(newGroups);
      }
    }
  }


  function handleAddComment(comment: Comment) {
    if (formData) {
      setFormData({ ...formData, comments: [...(formData.comments || []), comment] });
    }
  }

  function handleRemoveComment(commentId: string) {
    if (formData) {
      setFormData({
        ...formData,
        comments: formData.comments.filter((comment: Comment) => comment.id !== commentId),
      });
    }
  }

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center my-3">
        <div className="col border rounded fw-light px-4 py-2">
          <Form>
            <Form.Group className='mb-3 fs-4 fw-light' controlId='formFileMultiple'>
              <Form.Label>{t(`editApplicant.label.changePicture`)}</Form.Label>
              <Form.Control ref={addFrontImageRef} type='file' name='picture' onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
              <div className='d-flex my-3 justify-content-center align-items-center'>
                <div style={{ width: '400px' }}>
                  {formData.picture && <img
                    className='img-fluid'
                    src={formData.picture}
                    alt={'Applicant picture'}
                  />}
                </div>
              </div>
              <Button onClick={(() => setFormData({ ...formData, picture: '' }))} variant='danger' className="py-2">{t('editApplicant.picture.clear')}</Button>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formPaidDeposit'>
              <FloatingLabel controlId='floatingPaidDeposit' label={t('editApplicant.label.paidDeposit')}>
                <Form.Control as='select' name='paid_deposit' value={formData.paid_deposit} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}>
                  {['Has paid', 'Not paid'].map((value, idx) => (
                    <option key={idx} value={value}>{t(`${value}`)}</option>
                  ))}
                </Form.Control>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formShirtNumber'>
              <FloatingLabel label={t('editApplicant.label.shirtNumber')}>
                <Form.Control type='number' placeholder={t('editApplicant.label.shirtNumber')} name='tryouts_shirt_number' value={formData.tryouts_shirt_number} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className='mb-3' controlId='formApplicantGroups'>
              <Form.Label>{t('editApplicant.label.applicantGroups')}</Form.Label>
              {(applicantGroups || []).map((group: { name: string, applicants: string[] }, idx) => (
                <Form.Check
                  key={idx}
                  type='checkbox'
                  name='applicantGroups'
                  value={group.name}
                  label={group.name}
                  checked={group.applicants.includes(applicant.id)}
                  onChange={(e) => handleGroupChange(e, group, 'applicantGroups')}
                />
              ))}
            </Form.Group>
            <Form.Group className='mb-3' controlId='formTryoutDays'>
              <Form.Label>{t('editApplicant.label.tryoutDays')}</Form.Label>
              {(tryoutDays || []).map((group: { name: string, applicants: string[] }, idx) => (
                <Form.Check
                  key={idx}
                  type='checkbox'
                  name='tryoutDays'
                  value={group.name}
                  label={group.name}
                  checked={group.applicants.includes(applicant.id)}
                  onChange={(e) => handleGroupChange(e, group, 'tryoutDays')}
                />
              ))}
            </Form.Group>
            <Form.Group className='mb-3' controlId='formComments'>
              <Form.Label>{t('editApplicant.label.comments')}</Form.Label>
              <EditApplicantComments
                appData={appData}
                comments={formData.comments}
                handleAddComment={handleAddComment}
                handleRemoveComment={handleRemoveComment}
              />
            </Form.Group>
          </Form>
          <div className='mt-3 d-flex justify-content-start'>
            <Button className='kth-bg' onClick={() => handleSubmit()}>{t('editApplicant.button.save')}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}