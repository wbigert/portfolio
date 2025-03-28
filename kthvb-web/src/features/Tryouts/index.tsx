import { AppData } from "@/models/AppData"
import { ModalManager } from "@/models/Modal"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import DecideMode from "./components/DecideMode"
import PhotoMode from "./components/PhotoMode"
import CommentMode from "./components/CommentMode"
interface TryoutsProps {
  appData: AppData
  handleModals: ModalManager
}

export default function Tryouts({ appData, handleModals }: TryoutsProps) {

  const { t } = useTranslation()
  const [mode, setMode] = useState<'photo' | 'comment' | 'decide'>('decide')
  const [selectedTryoutDay, setSelectedTryoutDay] = useState<string>('')

  switch (mode) {
    case 'decide':
      return <DecideMode appData={appData} handleModals={handleModals} setMode={setMode} selectedTryoutDay={selectedTryoutDay} setSelectedTryoutDay={setSelectedTryoutDay} />
    case 'photo':
      return <PhotoMode appData={appData} handleModals={handleModals} setMode={setMode} selectedTryoutDay={selectedTryoutDay} setSelectedTryoutDay={setSelectedTryoutDay} />
    case 'comment':
      return <CommentMode appData={appData} handleModals={handleModals} setMode={setMode} selectedTryoutDay={selectedTryoutDay} setSelectedTryoutDay={setSelectedTryoutDay} />
    default:
      return null
  }
}