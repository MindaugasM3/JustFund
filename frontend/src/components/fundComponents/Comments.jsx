import { useState } from "react"
import DisplayComments from "./DisplayComments"
import { useComments } from "../../reducers/useComments"

function Comments({fundId}) {
    // console.log(new Date().toISOString(),)
    // const [first, setfirst] = useState(second)
    const {fetchComments, writeComment} = useComments()
    const [commentContent, setCommentContent] = useState({content: '', fund_id: fundId})

    console.log(commentContent)
    
    const handleCreateComment = async _ => {
        const res = await writeComment(commentContent)
    }
    

    return (
        <div>
            <div>
                <label htmlFor="comment"></label>
                <textarea value={commentContent.content} onChange={e => setCommentContent({...commentContent, content: e.target.value})} id="comment"/>
                <button className="green-btn">Skelbti</button>
            </div>
            <div>
                <DisplayComments/>
            </div>
        </div>
    )
}

export default Comments