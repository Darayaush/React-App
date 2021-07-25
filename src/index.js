import './style.css';
var React = require('react');
var ReactDOM = require('react-dom');
import CommentForm from './form';
import CommentList from './commentlist';

class CommentSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        };

        this.handleComment = this.handleComment.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount() {
        let savedComments = localStorage.getItem('comments');

        if (!savedComments) return;

        savedComments = JSON.parse(savedComments);
        this.setState({ comments: savedComments });
    }

    onDelete(e) {
        let elementId = e.target.id;
        let comments = this.state.comments;

        comments = comments.filter(comment => +comment.id !== +elementId);

        this.setState({ comments: comments });
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    handleComment(comment) {
        let id = parseInt(Math.random() * Math.pow(10, 10));
        let date = new Date().toLocaleString();
        let newComment = comment;
        newComment.id = id;
        newComment.date = date;
        let comments = this.state.comments;
        comments.push(newComment);

        this.setState({ comments: comments });
        localStorage.setItem('comments', JSON.stringify(comments));
    }
    
    render() {
        return (
            <main className="main">
                <section className="section">
                    <h1 className="section__heading">Комментарии</h1>
                    <CommentList onDelete={this.onDelete.bind(this)} comments={ this.state.comments }/>
                </section>
                <CommentForm onChange={this.handleComment}/>
            </main>
        );
    }
}

ReactDOM.render(
    <CommentSection />,
    document.querySelector('.root')
);
