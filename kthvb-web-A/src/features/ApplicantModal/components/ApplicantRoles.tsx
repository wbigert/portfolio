import { AppData } from "@/models/AppData";
import { useTranslation } from "react-i18next";

interface ApplicantRolesProps {
  applicant: Applicant | null,
  label: string,
  fallback: string,
  appData: AppData
}


//applicant.preferredRoles : {
//   "libero": "Prefer not",
//   "setter": "Prefer not",
//   "opposite": "Ok",
//   "middle": "Preferred",
//   "wingSpiker": "Ok"
// }
export default function ApplicantRoles({ applicant, label, fallback, appData }: ApplicantRolesProps) {
  const { t } = useTranslation()

  if (!applicant || !applicant.preferredRoles) {
    return (
      <div className="fs-5 mb-1">
        <span>{label}:</span> <span className="bg-light fst-italic">{fallback}</span>
      </div>
    )
  } else {
    return (
      <div className="fs-5 mb-1 d-flex flex-column">
        <span>{label}:</span>
        {Object.keys(applicant.preferredRoles).map((role: string, index: number) => {
          const rolePreference = applicant.preferredRoles[role]
          if (!rolePreference) {
            return null
          }
          return (
            <div key={index} className="d-flex flex-row ms-4">
              <span>{t(`applicantModal.${role}`)}</span>{': '}
              <span className="ms-1">{rolePreference}</span>
            </div>
          )
        })}
      </div>
    )
  }
}