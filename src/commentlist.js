import React from "react";

class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul>
                {addComments(this.props.comments, this.props.onDelete.bind(this))}
            </ul>
        );
    }
}


function addComments(stateComments, deleteHendler) {
    
    if (stateComments.length === 0 && !localStorage.getItem('comments')) {
        return;
    } 

    let comments = stateComments.map((com) => {
        let comment = <li key={com.id}>
                <article className="article slideInLeft">
                        <h2 className="article__heading">{com.name}</h2>
        
                        <p className="article__text">{com.text}</p>
        
                        <div className="article__time">{com.date}</div>
        
                        <div className="article__delete delete" aria-label="Удалить комментарий" id={com.id} tabIndex="0" onClick={deleteHendler}>
                            <span className="delete__span span-top"></span>
                            <span className="delete__span span-bottom"></span>
                        </div>
                </article>
            </li>
        return comment;
    });

    return (comments); 
}

export default CommentList;