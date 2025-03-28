import { AppData } from "@/models/AppData"
import { Comment } from "@/models/Comment"
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"
interface ApplicantGroupsProps {
  applicant: Applicant | null,
  label: string,
  fallback: string,
  appData: AppData
}

export default function ApplicantGroups({ applicant, label, fallback, appData }: ApplicantGroupsProps) {
  const { t } = useTranslation()
  const [applicantGroups, setApplicantGroups] = useState<string[]>([]);

  useEffect(() => {
    if (appData && appData.settings && appData.settings.applicantGroups) {
      const newApplicantGroups = appData.settings.applicantGroups.filter((group) => group.applicants.includes(applicant?.id))
    }
  }, [appData.settings])

  if (applicantGroups.length === 0) {
    return (
      <div className="fs-5 mb-1">
        <span>{label}:</span> <span className="bg-light fst-italic">{fallback}</span>
      </div>
    )
  } else {
    return (
      <div className="fs-5 mb-1 d-flex flex-column">
        <span>{label}:</span>
        {applicantGroups.map((group: string, index: number) => (
          <div key={index} className="d-flex flex-row ms-4">
            <span>{group}</span>
          </div>
        ))}
      </div>
    )
  }
}
