import { IoPersonSharp } from "react-icons/io5"

interface ApplicantPictureProps {
  applicant: Applicant | null,
}

export default function ApplicantPicture({ applicant }: ApplicantPictureProps) {
  if (applicant?.picture) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center'">
        <div className="user-picture mb-1" >
          <img src={applicant?.picture} alt="Profile picture" style={{ maxWidth: "300px", maxHeight: "300px", borderRadius: "50%", }} />
        </div>
      </div>)
  } else {
    return (
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <div className="user-picture mb-1">
          <IoPersonSharp size={100} />
        </div>
        <span className='fs-bold'>No Picture</span>
      </div>
    )
  }
}