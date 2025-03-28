import { HandleInstructionsContext } from '@/context'
import { AppData } from '@/models/AppData'
import { InstructionData } from '@/models/Instruction'
import { Settings } from '@/models/Settings'
import { User } from '@/models/User'
import { useEffect, useContext } from 'react'

export default function useFetchCollections(appData: AppData, setAppData: (appData: AppData) => void, handleInstructions: (instruction: string, data: InstructionData) => any) {
  useEffect(() => {
    async function fetchData() {
      let requests = []
      let settingsRequestIndex = null
      let usersRequestIndex = null
      if (!appData.settings) {
        requests.push(handleInstructions('fetchSettings', { delayUpdate: true }))
        settingsRequestIndex = 0
      }
      if (localStorage.getItem('loggedIn') || appData.tryout_id) {
        requests.push(handleInstructions('fetchUsers', { delayUpdate: true }))
        usersRequestIndex = requests.length - 1
      }
      
      const result = await Promise.all(requests)
      
      const settingsResult: Settings = settingsRequestIndex !== null ? result[settingsRequestIndex] : null
      const usersResult: User[] = usersRequestIndex !== null ? result[usersRequestIndex] : [] 
      setAppData({
        ...appData,
        users: usersResult.sort((a, b) => a.firstName.localeCompare(b.firstName)),
        settings: settingsResult || appData.settings,
        didFetchCollections: true
      })
    }
    if (!appData.didFetchCollections) {
      fetchData()
    }
  }, [setAppData, appData])
}
