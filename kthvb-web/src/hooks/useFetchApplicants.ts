import { AppData } from '@/models/AppData'
import { InstructionData } from '@/models/Instruction'
import { Permission } from '@/models/User'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function useFetchApplicants(appData: AppData, setAppData: (appData: AppData) => void, handleInstructions: (instruction: string, data: InstructionData) => void, messages: any) {
  useEffect(() => {
    async function fetchData(tryout_id?: string) {
      const params = tryout_id ? { tryout_id } : {}
      handleInstructions('fetchApplicants', params)
    }
    if (!appData.applicants && appData.didFetchCollections && appData.tryout_id) {
      fetchData(appData.tryout_id)
    } else if (!appData.applicants && appData.didFetchCollections && appData.loggedIn && (appData.userDetails?.permissions?.includes(Permission.Admin) || appData.userDetails?.permissions?.includes(Permission.Tryouts))) {
      fetchData()
    }

  }, [setAppData, appData])

  useEffect(() => {
    if (messages.length > 0) {
      console.log("messages:", messages);
      const message = messages[messages.length - 1]
      if (message.type === 'applicantUpdated') {
        handleInstructions('fetchApplicants', {})
      }
    }
  }, [messages])
}
