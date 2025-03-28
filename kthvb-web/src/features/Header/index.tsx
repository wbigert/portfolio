import { Button, Nav, Navbar } from 'react-bootstrap'
import { BiLogIn, BiLogOut } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import LanguageDropDown from '../LanguageDropdown/index.jsx'
import { useTranslation } from 'react-i18next'
import { useContext, useState } from 'react'
import { HandleInstructionsContext } from '@/context'
import { AppData } from '@/models/AppData'
import { AiOutlineHome } from 'react-icons/ai'
import { useWindowWidth } from '@/hooks/useWindowWidth.js'
import { ContactElement } from '@/models/Contact.js'
import Contact from '@/components/Contact.jsx'
import { Permission } from '@/models/User.js'
import UserProfile from './components/UserProfile.jsx'
import LoginOrOut from './components/LoginOrOut.jsx'
import styles from './index.module.css'
import { ModalManager } from '@/models/Modal.js'
interface HeaderProps {
  appData: AppData;
  setAppData: (appData: AppData) => void;
  handleModals: ModalManager
}

export default function Header({ appData, setAppData, handleModals }: HeaderProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const navigateTo = useNavigate()
  const handleInstructions = useContext(HandleInstructionsContext)
  const windowWidth = useWindowWidth()
  const isAdmin = appData?.userDetails?.permissions?.includes(Permission.Admin)
  const isTryouts = appData?.userDetails?.permissions?.includes(Permission.Tryouts)

  // Add this state to manage the collapsed state of the navbar
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);

  const handleNavItemClick = (path: string) => {
    navigateTo(path);
    setNavbarCollapsed(true); // Collapse the navbar after clicking on an item
  };
  async function logout() {
    await handleInstructions('logoutUser')
  }

  function handleApplyModalClick() {
    handleModals.on({
      name: 'ApplyModal',
      id: 'ApplyModal',
    })
  }

  return (
    <Navbar bg='dark' variant='dark' className='px-3' expand='md'>
      <Navbar.Toggle
        aria-controls='basic-navbar-nav'
        onClick={() => setNavbarCollapsed(!navbarCollapsed)} // Toggle the collapsed state when the button is clicked
      />
      <Navbar.Collapse id='basic-navbar-nav' in={!navbarCollapsed}>
        <div className='d-flex flex-column flex-md-row w-100 justify-content-between'>
          <div className='col-12 col-md-3 d-flex justify-content-center justify-content-md-start ps-0 ps-md-5'>
            <Nav className='align-items-center gap-2'>
              <div className={styles.navbar} onClick={() => handleApplyModalClick()}>
                {t('apply.name')}
              </div>
              {isAdmin && <div className={styles.navbar} onClick={() => handleNavItemClick('/settings')}>
                {t('settings.name')}
              </div>}
              {isAdmin && <div className={styles.navbar} onClick={() => handleNavItemClick('/applicants')}>
                {t('applicants.name')}
              </div>}
              {(isAdmin || isTryouts) && <div className={styles.navbar} onClick={() => handleNavItemClick('/tryouts')}>
                {t('tryouts.name')}
              </div>}
              {(isAdmin || isTryouts) && <div className={styles.navbar} onClick={() => handleNavItemClick('/members')}>
                {t('members.name')}
              </div>}
              <div className={styles.navbar} onClick={() => handleNavItemClick('/')}>
                {t('home.name')}
              </div>
            </Nav>
          </div>
          <div className='col-12 col-md-3 d-flex flex-column flex-md-row justify-content-center justify-content-md-end pe-0 pe-md-5'>
            <Nav className='align-items-center gap-2 p-2 p-md-0'>
              <LanguageDropDown />
              <LoginOrOut loggedIn={appData.loggedIn} handleClick={handleNavItemClick} logout={logout} />
              <UserProfile appData={appData} />
            </Nav>
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}
