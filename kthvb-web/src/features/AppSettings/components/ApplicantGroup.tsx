import { Settings } from "@/models/Settings"
import { Button, Form } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { BsTrash } from "react-icons/bs"

interface ApplicantGroupProps {
  groupName: string
  formData: Settings | null
  setFormData: React.Dispatch<React.SetStateAction<Settings | null>>
  mode: 'applicantGroups' | 'tryoutDays'
}

export default function ApplicantGroup({ groupName, formData, setFormData, mode }: ApplicantGroupProps) {
  const { t } = useTranslation()

  function handleUpdateName(event: React.ChangeEvent<HTMLInputElement>) {
    if (!formData) return
    const newName: string = event.target.value
    const newMembers = formData[mode].find((group) => group.name === groupName)?.applicants || []

    const newGroupArray = formData[mode].map((group) =>
      group.name === groupName
        ? { name: newName, applicants: newMembers }
        : group
    )

    setFormData({ ...formData as Settings, [mode]: newGroupArray })
  }

  function handleDeleteGroup() {
    if (!formData) return
    const newGroupArray = formData[mode].filter((group) => group.name !== groupName)
    setFormData({ ...formData as Settings, [mode]: newGroupArray })
  }

  return (
    <Form.Group>
      <div className="d-flex gap-3 flex-nowrap">
        <Form.Control type="text" value={groupName} onChange={handleUpdateName} />
        <Button className="kth-bg d-flex align-items-center justify-content-center p-2 rounded text-white" onClick={handleDeleteGroup} style={{ cursor: 'pointer' }}>
          <BsTrash size={20} />
        </Button>
      </div>
    </Form.Group>
  )
}
