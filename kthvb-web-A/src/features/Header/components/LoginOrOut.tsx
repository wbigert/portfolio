import { Button } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { BiLogIn, BiLogOut } from "react-icons/bi"

import styles from "../index.module.css"

export default function LoginOrOut({ loggedIn, handleClick, logout }: any) {
  const { t } = useTranslation()
  if (loggedIn) {
    return (
      <div className={styles.navbar} onClick={() => logout()}>
        <div className='d-flex gap-1'>
          {t('logout')}
          <div className='d-flex align-items-center'>
            <BiLogOut size={20} />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.navbar} onClick={() => handleClick('/auth/login')}>
        <div className='d-flex gap-1'>
          {t('login')}
          <div className='d-flex align-items-center'>
            <BiLogIn size={20} />
          </div>
        </div>
      </div>
    )
  }
}
