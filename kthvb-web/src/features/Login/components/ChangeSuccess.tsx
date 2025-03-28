import { useTranslation } from "react-i18next"
import { IoShieldCheckmarkOutline } from "react-icons/io5"

export function ChangeSuccess() {
  const { t, i18n } = useTranslation()
  return (
    <>
      <div className="fs-2 fw-light d-flex align-items-center">
        <IoShieldCheckmarkOutline style={{ marginRight: "10px" }} />
        {t('changeSuccess.title')}
      </div>
      <p className='mt-5'>{t('changeSuccess.text')}</p>
    </>
  )
}