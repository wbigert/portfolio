import { useTranslation } from "react-i18next"
import { IoPersonSharp } from "react-icons/io5"
import ApplicantPicture from "./ApplicantPicture"
import { GiPayMoney } from 'react-icons/gi'
import { AppData } from "@/models/AppData"
import { User } from "@/models/User"
import { Comment } from "@/models/Comment"
import ApplicantComments from "./ApplicantComments"
import ApplicantGroups from "./ApplicantGroups"
import ApplicantInfoLine from "./ApplicantInfoLine"
import { applicantFormMappings, reservedApplicantKeys } from ".."
import ApplicantRoles from "./ApplicantRoles"

interface ViewApplicantProps {
  applicant: Applicant | null,
  appData: AppData,
  handleModalClose: () => void,
}

//list of all the keys that are part of the first hardcoded section
const firstSectionKeys = ['paid_deposit', 'depositInfo', 'tryouts_shirt_number']

export default function ViewApplicant({ applicant, appData, handleModalClose }: ViewApplicantProps) {
  const { t } = useTranslation()

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col text-center">
          {applicant && applicant.picture ? (
            <div className='d-flex my-3 justify-content-center align-items-center'>
              <div style={{ width: '600px' }}>
                <img
                  className='img-fluid'
                  src={applicant.picture}
                  alt={'Applicant picture'}
                />
              </div>
            </div>
          ) : (
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <div className="user-picture mb-1">
                <IoPersonSharp size={100} />
              </div>
            </div>
          )}
          <div className="fs-1 fw-light">
            {applicant && applicant['name'] || t("applicantModal.noName")}
          </div>
          <div className="text-muted mb-1">{applicant?.['email'] || t("applicantModal.noEmail")}</div>
          <div className="text-muted mb-3">{applicant?.phone}</div>
        </div>
      </div>
      <div className="row d-flex justify-content-center my-3">
        <div className="col border rounded fw-light px-4 py-2">
          <ApplicantInfoLine
            label={t("applicantModal.paidDeposit")}
            value={applicant && applicant['paid_deposit']}
            fallback={t("applicantModal.noDeposit")}
          />
          <ApplicantInfoLine
            label={t("applicantModal.depositInfo")}
            value={applicant && applicant['depositInfo']}
            fallback={t("applicantModal.noDepositInfo")}
          />
          <ApplicantInfoLine
            label={t("applicantModal.shirtNumber")}
            value={applicant && applicant['tryouts_shirt_number']}
            fallback={t("applicantModal.noShirtNumber")}
          />
          <ApplicantRoles
            applicant={applicant}
            label={t("applicantModal.roles")}
            fallback={t("applicantModal.noRoles")}
            appData={appData}
          />
          <ApplicantComments
            appData={appData}
            label={t("applicantModal.comments")}
            comments={applicant && applicant['comments']}
            fallback={t("applicantModal.noComments")}
          />
          <ApplicantGroups
            applicant={applicant}
            label={t("applicantModal.groups")}
            fallback={t("applicantModal.noGroups")}
            appData={appData}
          />
        </div>
      </div>
      <div className="row d-flex justify-content-center my-3">
        <div className="col border rounded fw-light px-4 py-2">
          <div className="fs-4 mb-1">
            {t("applicantModal.response")}:
            {applicant && Object.keys(applicant).filter((key) => key !== 'id' && !firstSectionKeys.includes(key) && !reservedApplicantKeys.includes(key)).map((key, idx) => {
              return (
                <ApplicantInfoLine
                  key={idx}
                  label={key}
                  value={applicant && applicant[key]}
                  fallback={t("applicantModal.missingResponse")}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}