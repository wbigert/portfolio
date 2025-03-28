import { HandleModalsContext } from "@/context"
import { useContext } from "react"
import { Table } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { BsFillPencilFill } from "react-icons/bs"
import styles from "../index.module.css"
import ApplicantRow from "./ApplicantRow"
import { AppData } from "@/models/AppData"
import { useWindowWidth } from "@/hooks/useWindowWidth"
interface ApplicantTableProps {
  appData: AppData
  applicants: Applicant[]
  headersMap: { [key: string]: string }
  ignoreTeam?: boolean
}

export default function ApplicantTable({ appData, applicants, headersMap, ignoreTeam }: ApplicantTableProps) {
  const { t } = useTranslation()
  const windowWidth = useWindowWidth()

  return (
    <Table size="sm">
      <thead>
        <tr>
          {Object.values(headersMap).filter((header) => !(ignoreTeam && header === 'Team')).map((header, idx) => (
            <th key={idx}>{t(header)}</th>
          ))}
          <th>Day</th>
          <th>Number</th>
        </tr>
      </thead>
      <tbody>
        {applicants.map((applicant: Applicant, index: number) => (
          <ApplicantRow key={index} appData={appData} index={index} applicant={applicant} headersMap={headersMap} ignoreTeam={ignoreTeam} />
        ))}
      </tbody>
    </Table>
  )
}
