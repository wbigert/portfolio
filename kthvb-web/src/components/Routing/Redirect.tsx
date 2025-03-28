import { ModalManager } from '@/models/Modal'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface RedirectProps {
  to: string
  push?: boolean
  openForm?: boolean
  handleModals: ModalManager
}

export default function Redirect({ to, push = false, openForm, handleModals }: RedirectProps) {
  const navigateTo = useNavigate()
  useEffect(() => {
    if (push) {
      navigateTo(to, { replace: true })
    } else {
      navigateTo(to)
    }
    if (openForm) {
      handleModals.on({
        name: 'ApplyModal',
        id: 'ApplyModal',
      })
    }
  }, [to, push, navigateTo])
  return null
}

