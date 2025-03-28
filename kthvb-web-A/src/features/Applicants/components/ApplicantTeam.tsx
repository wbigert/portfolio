import { Collapse } from "react-bootstrap";
import ApplicantTable from "./ApplicantTable";
import { useState } from "react";
import CollapseHeader from "@/components/CollapseHeader";
import { AppData } from "@/models/AppData";

interface ApplicantTeamProps {
  appData: AppData
  title: string
  elements: Applicant[]
  headersMap: { [key: string]: string }
  ignoreTeam?: boolean
}

export default function ApplicantTeam({ appData, title, elements, headersMap, ignoreTeam }: ApplicantTeamProps) {

  const [show, setShow] = useState<boolean>(false)

  return (
    <div>
      <CollapseHeader
        groupTitle={title}
        elements={elements}
        setShow={setShow}
        show={show}

      />
      <Collapse in={show} >
        <div className="overflow-scroll">
          <ApplicantTable
            appData={appData}
            applicants={elements}
            headersMap={headersMap}
            ignoreTeam={ignoreTeam}
          />
        </div>
      </Collapse>
    </div>


  )
}