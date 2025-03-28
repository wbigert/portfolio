
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { AppData } from '@/models/AppData'
import DynamicHero from '@/components/DynamicHero'
import bgTrainings from "@/assets/images/trainings.jpg"
import bgTryouts from "@/assets/images/tryouts.jpg"
import bgTournaments from "@/assets/images/tournaments.jpg"
import bgEvents from "@/assets/images/events.jpg"
import { IntroSection } from './components/IntroSection'
import WaveDivider from '@/components/WaveDivider'
import { ModalManager } from '@/models/Modal'

export default function Homepage({ appData, handleModals }: { appData: AppData, handleModals: ModalManager }): JSX.Element {
  const { t, i18n } = useTranslation()
  const navigateTo = useNavigate()
  async function tryoutsPrimaryButton() {
    handleModals.on({
      name: 'ApplyModal',
      id: 'ApplyModal',
    })
  }
  return (
    <div className='container-fluid g-0' id='hanging-icons'>
      <div className='row row-cols-1 justify-content-center g-0'>
        <IntroSection />
        <WaveDivider direction='down' />
        <div className='row row-cols-1 mt-2 mb-5 mt-lg-5 g-0'>
          <DynamicHero align='left' title={t('about.trainings.title')} description={t('about.trainings.description')} bgImg={bgTrainings} />
          <DynamicHero align='right' title={t('about.tryouts.title')} description={t('about.tryouts.description')} bgImg={bgTryouts} primaryButtonText={t('about.tryouts.buttonPrimary')} handleClickPrimary={tryoutsPrimaryButton} />
          <DynamicHero align='left' title={t('about.events.title')} description={t('about.events.description')} bgImg={bgEvents} />
          <DynamicHero align='right' title={t('about.tournaments.title')} description={t('about.tournaments.description')} bgImg={bgTournaments} />
        </div>
      </div>
    </div>
  )

}
