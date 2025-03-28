import ElementGroup from '@/components/ElementGroup.jsx'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Spinner } from 'react-bootstrap'
import { AppData } from '@/models/AppData'
import { DynamicYearGroup } from '@/models/DynamicYearGroup'
import generateGroupsInfo from '@/utils/getDynamicYearGroupsInfo'
import { Permission } from '@/models/User'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { getButtonSize, getDescriptionSize, getTitleSize } from '@/utils/fontSizing'
import { ModalManager } from '@/models/Modal'
import { ContactElement } from '@/models/Contact'
import { getMemberElements } from '@/utils/getMemberElements'

interface TeamProps {
  appData: AppData
  handleModals: ModalManager
}

export default function Members({ appData, handleModals }: TeamProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const [boardMemberElements, setBoardMemberElements] = useState<ContactElement[]>([])
  const [otherMemberElements, setOtherMemberElements] = useState<ContactElement[]>([])
  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (!appData.users) return
    // event groups divided based on year
    const boardMembers = appData.users.filter((e) => e.info.boardPosition !== 'none')
    const otherMembers = appData.users.filter((e) => e.info.boardPosition === 'none')
    setBoardMemberElements(getMemberElements(boardMembers, windowWidth))
    setOtherMemberElements(getMemberElements(otherMembers, windowWidth))
  }, [appData, i18n.language, windowWidth])

  function handleCreateClick() {
    handleModals.on({
      name: 'UserModal',
      id: 'UserModal-Edit',
      user: {},
      mode: 'edit',
    })
  }
  const toolsToShow = (appData?.userDetails?.permissions || []).includes(Permission.Admin) ? { edit: true, delete: true } : { edit: false, delete: false }

  useEffect(() => {
    console.log('boardMemberElements', boardMemberElements, 'otherMemberElements', otherMemberElements)
  }, [boardMemberElements, otherMemberElements])


  return (
    <div className='container-fluid mb-5' id='hanging-icons'>
      <div className='row row-cols-1 justify-content-center'>
        <div className='mb-5 mt-3 col-11 col-md-9'>
          <div>
            <div className='fw-bold pt-2 fs-1'>{t('members.title')}</div>
            <div className={`fs-5`}>{t('members.intro')}</div>
            {toolsToShow.edit && (
              <div className='d-flex gap-2 mt-3'>
                <Button className='kth-bg' size={getButtonSize(windowWidth)} onClick={() => handleCreateClick()}>{t('members.primaryButton')}</Button>
              </div>
            )}
          </div>
        </div>
        <div className='container-fluid col-11 col-md-9'>
          <div className='row'>
            <ElementGroup expandStart={true} type='contacts' appData={appData} idx={0} groupTitle={t('members.boardMembers')} elements={boardMemberElements} toolsToShow={toolsToShow} />
          </div>
          <div className='row'>
            <ElementGroup expandStart={true} type='contacts' appData={appData} idx={1} groupTitle={t('members.otherMembers')} elements={otherMemberElements} toolsToShow={toolsToShow} />
          </div>
        </div>
      </div>
    </div>
  )


}
