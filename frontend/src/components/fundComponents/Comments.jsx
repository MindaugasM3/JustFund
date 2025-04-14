import { useEffect, useState } from "react"
import { useComments } from "../../reducers/useComments"
import CommentCard from "./CommentCard"
import { toast } from "react-toastify"


function Comments({fundId}) {
    // console.log(new Date().toISOString(),)
    // const [first, setfirst] = useState(second)
    const {fetchComments, writeComment, comments, updateComment} = useComments()
    const [commentContent, setCommentContent] = useState({content: '', fund_id: fundId})
    const [editOneAtTheTime, setEditOneAtTheTime] = useState(null)

    console.log(comments)

    useEffect(() => {
        fetchComments(fundId)
    }, [])
    
    
    const handleCreateComment = async _ => {
        if(commentContent.content.length === 0){
            return toast.error('komentaras negali būti tuščias!')
        }

        const res = await writeComment(commentContent);
        console.log(res);
        if(res.success){
            toast.success('komentas išsaugota!')
        }else {
            toast.error('nepavyko išsaugoti komentaro!')
        }
        setCommentContent({content: '', fund_id: fundId})
    }
    

    return (
        <div>
            <div className="write-comment-box">
                <label htmlFor="comment"></label>
                <textarea className="update-comment" value={commentContent.content} onChange={e => setCommentContent({...commentContent, content: e.target.value})} id="comment"/>
                <button onClick={handleCreateComment} className="green-btn comments-btn">Skelbti</button>
            </div>
            <div className="comments-list">
                {comments.map(comment => (
                    <CommentCard key={comment.id+'comment'} editOneAtTheTime={editOneAtTheTime} setEditOneAtTheTime={setEditOneAtTheTime} commentData={comment}/>
                ))}
            </div>
        </div>
    )
}

export default Comments