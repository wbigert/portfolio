import { Settings } from "@/models/Settings"
import { Button, Form } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"

interface AddApplicantGroupProps {
  formData: Settings | null
  setFormData: React.Dispatch<React.SetStateAction<Settings | null>>
  mode: 'applicantGroups' | 'tryoutDays'
}

export default function AddApplicantGroup({ formData, setFormData, mode }: AddApplicantGroupProps) {

  const { t } = useTranslation()
  const [groupName, setGroupName] = useState<string>('')

  function handleUpdateName(event: React.ChangeEvent<HTMLInputElement>) {
    setGroupName(event.target.value)
  }

  function handleAddName() {
    if (!formData) return
    const newGroupArray = [...formData[mode], { name: groupName, applicants: [] }]
    setFormData({ ...formData as Settings, [mode]: newGroupArray })
    setGroupName('')
  }

  return (
    <Form.Group className="d-flex flex-column">
      <div className="d-flex gap-3 flex-nowrap">
        <Form.Control placeholder='Example Group Name' type="text" value={groupName} onChange={handleUpdateName} />
        <Button className="kth-bg d-flex align-items-center justify-content-center p-2 rounded text-white" onClick={handleAddName} style={{ cursor: 'pointer' }}>
          <AiOutlinePlus size={20} />
        </Button>
      </div>
    </Form.Group>
  )
}
