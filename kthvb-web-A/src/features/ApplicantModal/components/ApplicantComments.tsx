import { AppData } from "@/models/AppData"
import { Comment } from "@/models/Comment"
import { useTranslation } from "react-i18next"

interface ApplicantCommentsProps {
  comments: Comment[],
  label: string,
  fallback: string,
  appData: AppData
}

export default function ApplicantComments({ comments, label, fallback, appData }: ApplicantCommentsProps) {
  const { t } = useTranslation()

  if (!comments || comments.length === 0) {
    return (
      <div className="fs-5 mb-1">
        <span>{label}:</span> <span className="bg-light fst-italic">{fallback}</span>
      </div>
    )
  } else {
    return (
      <div className="fs-5 mb-1">
        <span>{label}:</span>
        {comments.map((comment: Comment, index: number) => {
          const authoredBy = appData && appData.users && appData.users.find((user) => user.id === comment.author)

          if (authoredBy) {
            return (
              <div key={index} className="ms-4">
                <span>{authoredBy.firstName}{' '}{authoredBy.lastName}</span>{': '}
                <span className="ms-1">{comment.content}</span>
              </div>
            )
          } else {
            return (
              <div key={index} className="ms-4">
                <span>{comment.author_tryouts_string || 'null'}</span>{': '}
                <span className="ms-1">{comment.content}</span>
              </div>
            )
          }
        })}
      </div>
    )
  }
}
