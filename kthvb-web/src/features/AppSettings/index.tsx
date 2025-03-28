import { Settings } from "@/models/Settings"
import { useState, useContext, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Button, Form, FormControl } from "react-bootstrap"
import { HandleInstructionsContext } from "@/context"
import Option from "@/components/Option"
import { AiFillLock, AiFillUnlock } from "react-icons/ai"
import { Permission } from "@/models/User"
import { AppData } from "@/models/AppData"
import { ModalManager } from "@/models/Modal"
import ApplicantGroup from "./components/ApplicantGroup"
import AddApplicantGroup from "./components/AddApplicantGroup"

interface SettingsProps {
  appData: AppData
  handleModals: ModalManager
}

export default function AppSettings({ appData, handleModals }: SettingsProps) {

  const { t } = useTranslation()
  const handleInstructions = useContext(HandleInstructionsContext)
  async function initializeSettings() {
    await handleInstructions('initializeSettings')
  }

  const [formData, setFormData] = useState<Settings | null>(null);

  // Use useEffect to update state once appData.settings is defined
  useEffect(() => {
    if (appData.settings?.formStatus && appData.settings?.formUrl) {
      setFormData({
        formUrl: appData.settings.formUrl,
        formStatus: appData.settings.formStatus,
        formStartDate: appData.settings.formStartDate,
        applicantGroups: appData.settings.applicantGroups || [],
        tryoutDays: appData.settings.tryoutDays || []
      });
    }
  }, [appData.settings]);

  if (!formData || !(appData.userDetails?.permissions || []).includes(Permission.Admin)) {
    return null
  }

  function handleClickFormStatus(value: 'open' | 'closed') {
    if (!formData) return
    setFormData({ ...formData as Settings, formStatus: value })
    handleInstructions('updateSettings', { settings: { formStatus: value, formUrl: formData.formUrl, formStartDate: formData.formStartDate, applicantGroups: formData.applicantGroups, tryoutDays: formData.tryoutDays } })
  }

  function handleUpdateUrl(event: React.ChangeEvent<HTMLInputElement>) {
    if (!formData) return
    const newUrl = event.target.value
    setFormData({ ...formData as Settings, formUrl: newUrl })
  }

  if (!appData.settings?.formStatus || !appData.settings?.formUrl) {
    return (
      <div>
        {t('settings.initializeRequired')}
        <Button onClick={() => initializeSettings()}>
          {t('settings.initialize')}
        </Button>
      </div>
    )
  }

  const optionsFormStatus = [
    {
      value: 'open',
      selected: formData.formStatus === 'open',
      icon: AiFillUnlock,
      title: t('settings.open'),
      description: t('settings.open.description')

    },
    {
      value: 'closed',
      selected: formData.formStatus === 'closed',
      icon: AiFillLock,
      title: t('settings.closed'),
      description: t('settings.closed.description')
    }
  ]

  return (
    <div className='container-fluid mb-5' id='hanging-icons'>
      <div className='row row-cols-1 justify-content-center'>
        <div className='mb-5 mt-3 col-11 col-md-9 d-flex flex-column gap-3'>
          <div className='fw-bold pt-2 fs-1'>{t('settings.title')}</div>
          <div>
            <span className="fs-5">{t('settings.changeFormStatus.title')}</span>
            <div className="d-flex flex-row gap-3">
              {
                optionsFormStatus.map((option, index) => {
                  return (
                    <Option
                      key={index}
                      value={option.value}
                      selected={option.selected}
                      handleClickSelect={handleClickFormStatus}
                      icon={option.icon}
                      title={option.title}
                      description={option.description}
                    />
                  )
                })
              }
            </div>
          </div>
          <div className="d-flex flex-column gap-3">

            <Form
              onSubmit={(event: any) => {
                event.preventDefault()
                handleInstructions('updateSettings', { settings: { formStatus: formData.formStatus, formUrl: formData.formUrl, formStartDate: formData.formStartDate, applicantGroups: formData.applicantGroups, tryoutDays: formData.tryoutDays } })
              }}
              className="d-flex flex-column gap-3 p-0"
            >
              <Form.Group controlId="form.changeSettings.formUrl">
                <Form.Label><span className="fs-5">{t('settings.changeFormUrl.title')}</span></Form.Label>
                <FormControl
                  className="py-0"
                  type="text"
                  placeholder="https://example.com"
                  value={formData?.formUrl || ''}
                  onChange={handleUpdateUrl}
                />
              </Form.Group>
              <Form.Group controlId="form.changeSettings.formStartDate">
                <Form.Label><span className="fs-5">{t('settings.changeFormStartDate.title')}</span></Form.Label>
                <FormControl type="date"
                  className="py-0"
                  value={formData?.formStartDate?.toISOString().slice(0, 10) || ''}
                  onChange={(event: any) => {
                    const dateStr = event.target.value
                    if (!formData || !dateStr) return
                    const newDate = new Date(dateStr)
                    setFormData({ ...formData as Settings, formStartDate: newDate })
                  }}
                />
              </Form.Group>
              <div>
                <Form.Label><span className="fs-5">{t('settings.changeApplicantGroups.title')}</span></Form.Label>
                <div className="d-flex flex-column gap-1">
                  {(formData.applicantGroups).map((applicantGroup, index) => (
                    <ApplicantGroup
                      key={index}
                      groupName={applicantGroup.name}
                      formData={formData}
                      setFormData={setFormData}
                      mode='applicantGroups'
                    />))}
                  <AddApplicantGroup
                    formData={formData}
                    setFormData={setFormData}
                    mode='applicantGroups'
                  />
                </div>
              </div>
              <div>
                <Form.Label><span className="fs-5">{t('settings.changeTryoutDays.title')}</span></Form.Label>
                <div className="d-flex flex-column gap-1">
                  {(formData.tryoutDays).map((tryoutDay, index) => (
                    <ApplicantGroup
                      key={index}
                      groupName={tryoutDay.name}
                      formData={formData}
                      setFormData={setFormData}
                      mode='tryoutDays'
                    />))}
                  <AddApplicantGroup
                    formData={formData}
                    setFormData={setFormData}
                    mode='tryoutDays'
                  />
                </div>
              </div>
              <Button className="kth-bg" type="submit">
                {t('settings.formUrl.submit')}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}