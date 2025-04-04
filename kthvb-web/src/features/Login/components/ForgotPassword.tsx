import { Button, Form } from "react-bootstrap"
import { ForgotPasswordFormData } from ".."
import { useTranslation } from "react-i18next"


interface ForgotPasswordProps {
  formData: ForgotPasswordFormData,
  handleStartPasswordReset: (email: string) => void,
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function ForgotPassword({ formData, handleChange, handleStartPasswordReset }: ForgotPasswordProps) {
  const { t, i18n } = useTranslation()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleStartPasswordReset(formData.email)
  }

  return (
    <>
      <div className="fs-2 fw-light d-flex align-items-center">
        {t('forgotPassword.title')}
      </div>
      <Form className='w-100 mt-5' onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBlogTitle'>
          <Form.Label>{t('forgotPassword.label.email')}</Form.Label>
          <Form.Control type='email' placeholder={t('forgotPassword.label.email')} name='email' defaultValue={formData.email} onChange={(e) => e && handleChange(e)} />
        </Form.Group>
        <div className='d-flex gap-2 mt-5 justify-content-between'>
          <Button className='kth-bg' variant='primary' type="submit">
            {t('forgotPassword.primaryButton')}
          </Button>
        </div>
      </Form>
    </>
  )
}