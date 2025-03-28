import { AppData } from "@/models/AppData"
import { Comment } from "@/models/Comment"
import { Permission } from "@/models/User"
import { makeid } from "@/utils/makeid"
import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { AiOutlinePlus } from "react-icons/ai"
import { RxCross1 } from "react-icons/rx";
interface EditApplicantCommentsProps {
    comments: Comment[]
    appData: AppData
    handleAddComment: (comment: Comment) => void
    handleRemoveComment: (commentId: string) => void
}

export default function EditApplicantComments({
    comments,
    appData,
    handleAddComment,
    handleRemoveComment,
}: EditApplicantCommentsProps) {
    const [newComment, setNewComment] = useState<string>("")
    const { t } = useTranslation()

    const addComment = () => {
        const comment: Comment = {
            author: appData.userDetails?.id || appData.tryout_id || "missing",
            content: newComment,
            id: makeid(10),
            date: new Date(),
        }
        console.log("add comment")

        handleAddComment(comment)
        setNewComment("")
    }
    const isAdmin = (appData?.userDetails?.permissions || []).includes(Permission.Admin) || false
    // const isAdmin = false
    function deleteIcon (comment: Comment) {
      
      if (isAdmin && comment.author === appData.userDetails?.id) {
        return (
          <div className="text-dark" style={{cursor: 'pointer'}}>
            <RxCross1 size='30px' onClick={() => handleRemoveComment(comment.id)}/>
          </div>
        )
      } else if (comment.author === appData.tryout_id) {
        return (
          <div className="text-dark" style={{cursor: 'pointer'}}>
            <RxCross1 size='30px' onClick={() => handleRemoveComment(comment.id)}/>
          </div>
        )
      } else {
        return null
      }
    }

    return (
        <div className="d-flex flex-column gap-2">
            <div className="d-flex flex-column gap-1">
                {(comments || []).map((comment: Comment, index: number) => {
                    const authoredBy =
                        appData &&
                        appData.users &&
                        appData.users.find((user) => user.id === comment.author) 
                        
                        return (
                            <div
                                key={index}
                                className="d-flex flex-row align-items-center gap-2"
                            >
                                <span>
                                    {authoredBy ? (authoredBy.firstName + ' ' + authoredBy.lastName) : comment.author_tryouts_string || "Anonymous Feedback"}
                                    {": "}
                                    <span className="fst-italic">
                                        {comment.content}
                                    </span>
                                </span>
                              {deleteIcon(comment)}
                            </div>
                        )
                    
                })}
            </div>
            <div className="d-flex gap-2 align-items-center">
                <Form.Control
                    as="textarea"
                    className="w-100"
                    placeholder={t("editApplicant.placeholder.comment")}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <Button className="p-2 kth-bg" size="sm" onClick={addComment}>
                    <div className="d-flex justify-content-center align-items-center">
                        <AiOutlinePlus className="d-block" size={20} />
                    </div>
                </Button>
            </div>
        </div>
    )
}
