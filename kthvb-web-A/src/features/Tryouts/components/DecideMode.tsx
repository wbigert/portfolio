import PageContainer from "@/components/PageContainer";
import { useTranslation } from "react-i18next";
import DecideOption from "./DecideOption";
import { MdAddAPhoto } from "react-icons/md";
import { BiCommentAdd } from "react-icons/bi";
import { AppData } from "@/models/AppData";
import { ModalManager } from "@/models/Modal";
import { Button } from "react-bootstrap";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { log } from "console";

interface DecideModeProps {
  appData: AppData
  handleModals: ModalManager
  setMode: (mode: 'photo' | 'comment' | 'decide') => void
  selectedTryoutDay: string
  setSelectedTryoutDay: (selectedTryoutGroup: string) => void
}

export default function DecideMode({ appData, handleModals, setMode, selectedTryoutDay, setSelectedTryoutDay }: DecideModeProps) {
  const { t } = useTranslation()
  if (selectedTryoutDay) {
    return (
      <PageContainer title={t('tryouts.decideAction.title') + ': ' + selectedTryoutDay} intro={t('tryouts.decideAction.intro')} >
        <div className="row g-2">
          <DecideOption
            icon={<IoReturnUpBackSharp size={70} />}
            text={t('tryouts.button.selectDay')}
            onClick={() => setSelectedTryoutDay('')}
          />
          <DecideOption
            icon={<MdAddAPhoto size={70} />}
            text={t('tryouts.takePhotos')}
            onClick={() => setMode('photo')}
          />
          <DecideOption
            icon={<BiCommentAdd size={70} />}
            text={t('tryouts.giveFeedback')}
            onClick={() => setMode('comment')}
          />
        </div>
      </PageContainer >
    )
  } else {
    return (
      <PageContainer title={t('tryouts.selectDay.title')} intro={t('tryouts.selectDay.intro')}>
        <div className="row g-2">
          {appData?.settings && appData.settings.tryoutDays.map((tryoutDay, idx) => (
            <DecideOption
              key={idx}
              text={tryoutDay.name}
              onClick={() => setSelectedTryoutDay(tryoutDay.name)}
            />
          ))}
        </div>
      </PageContainer>
    )
  }
}