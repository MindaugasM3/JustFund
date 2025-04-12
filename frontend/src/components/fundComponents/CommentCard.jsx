import { useState } from "react";
import { useComments } from "../../reducers/useComments";
import { toast } from "react-toastify";

function CommentCard({commentData, editOneAtTheTime, setEditOneAtTheTime}) {

    const [updateCommentState, setUpdateCommentState] = useState(false)
    const [updateCommentValue, setUpdateCommentValue] = useState(commentData.content)
    const [countClicks, setCountClicks] = useState(0)

    const {updateComment, deleteComment} = useComments();

    const handleUpdateComment = async _ => {
        setCountClicks(0)
        if(updateCommentValue.length <= 0) {
            toast.error('negali pakeisti į tuščia komentarą!')
            return
        }

       
        const res = await updateComment({content: updateCommentValue, 
                                        id: commentData.id})
        console.log(res)
        if(res.success){
            toast.success('pavyko pakeisti komentara!');
        } else {
            toast.error('nepavyko pakeisti komentaro!')
        }
    }

    const handleUpdateFuncs = _ => {
        if (countClicks === 0) {
            setEditOneAtTheTime(commentData.id)
        }
        setCountClicks(a => a+1)
        setUpdateCommentState(!updateCommentState)
        if(countClicks >= 1){
            handleUpdateComment()
            setEditOneAtTheTime(null)
        } 
    }

    const handleDeleteComment = async _ => {
        const res = await deleteComment(commentData.id);
        if(res.success){
            toast.success('komentaras sekmingai istrintas')
        }else {
            toast.error('nepavyko istrinti komentaro')
        }
    }


    return (
        <div className="comment-functions">
            <div className="comment-box">
                <div>
                    <div>
                        {commentData.name}
                    </div>
                    <div>
                        <textarea id={`card${commentData.id}`} onChange={e => setUpdateCommentValue(e.target.value)} className="update-comment" disabled={!updateCommentState} value={updateCommentValue}></textarea>
                    </div>
                </div>
                <div className="comment-date">
                    {commentData.created_at.split('T')[0]}
                </div>
            </div>
                {   
                    commentData.user_id === commentData.userID?
                        <div className="btn-functions">
                            <button onClick={handleDeleteComment} className="red-btn">Ištrinti</button>
                            <button disabled={editOneAtTheTime !== commentData.id && editOneAtTheTime !== null} onClick={handleUpdateFuncs} className={updateCommentState? "green-btn" : "yellow-btn"}>Atnaujinti</button>
                        </div>
                        :
                        <></>
                }  
        </div>
    )
}

export default CommentCard;