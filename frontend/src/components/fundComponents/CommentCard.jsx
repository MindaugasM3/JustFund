import { useState } from "react";
import { useComments } from "../../reducers/useComments";

function CommentCard({commentData}) {

    const [updateCommentState, setUpdateCommentState] = useState(false)
    const [updateCommentValue, setUpdateCommentValue] = useState(commentData.content)

    const {} = useComments();

    const handleUpdateComment = _ => {

    }


    return (
        <div className="comment-functions">
            <div className="comment-box">
                <div>
                    <div>
                        {commentData.name}
                    </div>
                    <div>
                        <textarea onChange={e => setUpdateCommentValue(e.target.value)} className="update-comment" disabled={!updateCommentState} value={updateCommentValue}></textarea>
                    </div>
                </div>
                <div className="comment-date">
                    {commentData.created_at.split('T')[0]}
                </div>
            </div>
                {   
                    commentData.user_id === commentData.userID?
                        <div className="btn-functions">
                            <button className="red-btn">Ištrinti</button>
                            <button onClick={e => setUpdateCommentState(!updateCommentState)} className={updateCommentState? "green-btn" : "yellow-btn"}>Atnaujinti</button>
                        </div>
                        :
                        <></>
                }  
        </div>
    )
}

export default CommentCard;