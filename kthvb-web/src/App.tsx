import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { AppDataContext, HandleInstructionsContext, HandleModalsContext } from '@/context'
import Header from './features/Header/index'
import Login from './features/Login/index'
import { useModalManager } from './hooks/useModalManager'
import Modals from './features/Modals/index.jsx'
import instructionSwitchboard from './utils/instructionSwitchboard.js'
import { AppData } from '@/models/AppData'
import { InstructionArgs, InstructionData } from './models/Instruction'
import WaveDivider from './components/WaveDivider'
import Footer from './features/Footer'
import Homepage from './features/Homepage'
import useFetchCollections from './hooks/useFetchCollections'
import useFetchApplicants from './hooks/useFetchApplicants'
import AppSettings from './features/AppSettings'
import Applicants from './features/Applicants'
import Redirect from './components/Routing/Redirect'
import Tryouts from './features/Tryouts'
import { Button } from 'react-bootstrap'
import Members from './features/Members'
import useWebSocket from './hooks/useWebSocket'
import { UsersSnapshot } from './requests/UsersSnapshot'
import { ApplicantsSnapshot } from './requests/ApplicantsSnapshot'
import { SettingsSnapshot } from './requests/SettingsSnapshot'
import { UserDetailsSnapshot } from './requests/UserDetailsSnapshot'
function App() {
  const [messages, sendSocket, setSocketUrl] = useWebSocket("...")
  const tryout_id = window.location.pathname.split('/')[2] || null
  const [appData, setAppData] = useState<AppData>({
    users: UsersSnapshot,
    blogPosts: null,
    events: null,
    applicants: ApplicantsSnapshot,
    settings: SettingsSnapshot,
    tryout_id: tryout_id,
    loggedIn: true,
    userDetails: UserDetailsSnapshot,
    didFetchCollections: true
  })

  const navigateTo = useNavigate()
  const args = useRef<InstructionArgs>({ appData, setAppData, navigateTo })
  args.current = { appData, setAppData, navigateTo }
  const handleModals = useModalManager()
  async function handleInstructions(instruction: string, data: InstructionData = {}) {
    return await instructionSwitchboard(args.current, instruction, data)
  }
  useFetchCollections(appData, setAppData, handleInstructions)
  useFetchApplicants(appData, setAppData, handleInstructions, messages)

  const waveDividedElement = (element: JSX.Element) => {
    return (<><WaveDivider direction='down' />{element}</>)
  }

  return (
    <div className="bg-dark" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className='app-container d-flex flex-column bg-white'>
        <HandleInstructionsContext.Provider value={handleInstructions}>
          <HandleModalsContext.Provider value={handleModals}>
            <AppDataContext.Provider value={appData}>
              <Modals modal={handleModals} appData={{ ...appData }} />
              <Header appData={appData} setAppData={setAppData} handleModals={handleModals} />
              <Routes>
                <Route path='/' element={<Homepage appData={appData} handleModals={handleModals} />} />
                <Route path='/apply' element={<Redirect to='/' openForm={true} handleModals={handleModals} />} />
                <Route path='/settings' element={waveDividedElement(<AppSettings appData={appData} handleModals={handleModals} />)} />
                <Route path='/applicants' element={waveDividedElement(<Applicants appData={appData} handleModals={handleModals} />)} />
                <Route path='/members' element={waveDividedElement(<Members appData={appData} handleModals={handleModals} />)} />
                <Route path='/tryouts/:tryout_id' element={waveDividedElement(<Tryouts appData={appData} handleModals={handleModals} />)} />
                <Route path='/tryouts' element={waveDividedElement(<Tryouts appData={appData} handleModals={handleModals} />)} />
                <Route path='/auth/:mode/:token?' element={waveDividedElement(<Login appData={appData} setAppData={setAppData} />)} />
              </Routes>
              <WaveDivider direction='up' />
              <Footer appData={appData} />
            </AppDataContext.Provider>
          </HandleModalsContext.Provider>
        </HandleInstructionsContext.Provider>
      </div>
    </div>
  )
}

export default App
