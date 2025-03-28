import { useTranslation } from "react-i18next"
import { IoMailOutline } from "react-icons/io5"

export function CheckEmail() {
  const { t, i18n } = useTranslation()
  return (
    <>
      <div className="fs-2 fw-light d-flex align-items-center" >
        <IoMailOutline style={{ marginRight: "10px" }} />
        {t('checkEmail.title')}
      </div>
      <p className='mt-5'>{t('checkEmail.text')}</p>
    </>
  )
}