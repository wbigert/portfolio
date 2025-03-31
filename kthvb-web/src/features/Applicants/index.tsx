import { AppData } from "@/models/AppData"
import { ModalManager } from "@/models/Modal"
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react"
import moment from "moment"
import { Permission } from "@/models/User"
import ApplicantTeam from "./components/ApplicantTeam"
import { useWindowWidth } from "@/hooks/useWindowWidth"
import PageContainer from "@/components/PageContainer"
import { AiOutlineSearch } from "react-icons/ai"

interface ApplicantsProps {
    appData: AppData
    handleModals: ModalManager
}

export default function Applicants({ appData, handleModals }: ApplicantsProps) {
    const { t } = useTranslation()
    const [teams, setTeams] = useState<{ [key: string]: any[] }>({})
    const [search, setSearch] = useState<string>("")
    const windowWidth = useWindowWidth()
    const headersMap: { [key: string]: string } = {
        name: "Name",
        email: "Email",
        previousExperience: "Experience",
        teamAppliedFor: "Team",
    }
    if (windowWidth >= 1200) {
        headersMap["THSMember"] = "THS"
        headersMap["studyAtKTH"] = "KTH"
    }
    headersMap["paid_deposit"] = "Paid"

    function getApplicantTeams(applicants: Applicant[]) {
        const teamsTemp: { [key: string]: Applicant[] } = {}
        
        applicants.forEach((applicant: Applicant) => {
            const applicantTeam = applicant["teamAppliedFor"] || "No team"
            if (applicantTeam === "No team") {
                console.log("No team", applicant)
            }
            if (!teamsTemp[applicantTeam]) {
                teamsTemp[applicantTeam] = []
            }

            teamsTemp[applicantTeam].push(applicant)
        })

        return teamsTemp
    }

    function sortApplicants(applicants: Applicant[]) {
        const formStartDate = appData.settings?.formStartDate
        const timeFormat = "MM/DD/YYYY HH:mm:ss"
        
        return applicants
            .filter((applicant) => {
                if (formStartDate) {
                    const applicantDate = moment(
                        applicant.time,
                        timeFormat
                    ).toDate()
                    if (applicantDate.getTime() <= formStartDate.getTime()) {
                      console.log("Applicant date", applicantDate.getTime(), "Form start date", formStartDate.getTime())
                    }
                    return applicantDate.getTime() > formStartDate.getTime()
                }
                return true
            })
            .sort((a, b) => {
                const aDate = moment(a.time, timeFormat).toDate()
                const bDate = moment(b.time, timeFormat).toDate()
                return aDate.getTime() - bDate.getTime()
            })
    }

    useEffect(() => {
        if (appData.applicants) {
            const filteredApplicants = appData.applicants.filter((applicant) =>
                (applicant.name || "").includes(search)
            )
            
            const sortedApplicants = sortApplicants(filteredApplicants)
            const applicantTeams = getApplicantTeams(sortedApplicants)

            setTeams(applicantTeams)
        }
    }, [appData.applicants, search])

    return (
        <PageContainer
            title={t("applicants.title")}
            intro={t("applicants.intro")}
        >
            <div>
                <input
                    placeholder="Filter applicants by name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <AiOutlineSearch size={30} />
            </div>
            <div>
                <span className="fs-5 fw-bold">{t("applicants.all")}</span>
                <hr className="text-dark my-2" />
                {Object.keys(teams).map((key, idx) => (
                    <ApplicantTeam
                        appData={appData}
                        title={key}
                        elements={teams[key]}
                        headersMap={headersMap}
                        key={idx}
                        ignoreTeam={true}
                    />
                ))}
            </div>
            <div>
                <span className="fs-5 fw-bold">
                    {t("applicants.applicantGroups")}
                </span>
                <hr className="text-dark my-2" />
                {appData?.applicants &&
                    appData?.settings?.applicantGroups &&
                    appData.settings.applicantGroups.map((group, idx) => (
                        <ApplicantTeam
                            appData={appData}
                            title={group.name}
                            elements={(appData.applicants || []).filter(
                                (applicant) =>
                                    group.applicants.includes(applicant.id)
                            )}
                            headersMap={headersMap}
                            key={idx}
                        />
                    ))}
            </div>
            <div>
                <span className="fs-5 fw-bold">
                    {t("applicants.tryoutDays")}
                </span>
                <hr className="text-dark my-2" />
                {appData?.applicants &&
                    appData?.settings?.tryoutDays &&
                    appData.settings.tryoutDays
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map((tryoutDay, idx) => (
                            <ApplicantTeam
                                appData={appData}
                                title={tryoutDay.name}
                                elements={(appData.applicants || []).filter(
                                    (applicant) =>
                                        tryoutDay.applicants.includes(
                                            applicant.id
                                        )
                                )}
                                headersMap={headersMap}
                                key={idx}
                            />
                        ))}
            </div>
        </PageContainer>
    )
}
