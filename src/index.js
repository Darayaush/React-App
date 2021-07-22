import './style.css';
var React = require('react');
var ReactDOM = require('react-dom');

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
                    {addComments(this.state.comments, this.onDelete.bind(this))}
                </section>
                <CommentForm onChange={this.handleComment}/>
            </main>
        );
    }
}

function addComments(stateComments, deleteHendler) {
    
    if (stateComments.length === 0 && !localStorage.getItem('comments')) {
        return;
    } 

    let comments = stateComments.map((com) => {
        let comment = <article className="article slideInLeft" key={com.id}>
                    <h2 className="article__heading">{com.name}</h2>
    
                    <p className="article__text">{com.text}</p>
    
                    <div className="article__time">{com.date}</div>
    
                    <div className="article__delete delete" aria-label="Удалить комментарий" id={com.id} tabIndex="0" onClick={deleteHendler}>
                        <span className="delete__span span-top"></span>
                        <span className="delete__span span-bottom"></span>
                    </div>
        </article>;
        return comment;
    });

    return (comments); 
}


class CommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);

        this.state = {
            name: '', 
            text: '',
            invalid: {}
        }
    }

    onChangeInput(e) {
        let name = e.target.name;
        let value = e.target.value;
        
        if (value.length !== 0) {
            let invalid = this.state.invalid;
            invalid[name] = false;
            this.setState({ invalid: invalid });
        }

        this.setState({[name]: value}); 
    }

    onClick(e) {
        e.preventDefault();
        
        if (this.validate()) {
            this.props.onChange(this.state);
            this.setState({
                name: '',
                text: '',
                invalid: {}
            })
        }
    }

    validate() {
        let isValid = true;
        let state = this.state;
        let keys = Object.keys(state);

        for (let key of keys) {
            if (state[key] === '') {
                isValid = false;
                let invalid = this.state.invalid;
                invalid[key] = true;
                this.setState({ invalid: invalid });
                continue
            }
        }

        return isValid;
    }

    render() {
        let inputClassName = getClassName(this.state, 'name') ;
        let textareaClassName = getClassName(this.state, 'text');

        return (
            <form className="form">
                <label className="form__label">
                    Имя:
                    <input type="text" className={inputClassName} name="name" onChange={this.onChangeInput} value={ this.state.name }/>
                </label>
                
                <label className="form__label">
                        Комментарий:
                    <textarea className={textareaClassName} name="text" cols="30" rows="10" onChange={this.onChangeInput} value={ this.state.text } ></textarea>
                    </label>
                <button className="form__btn" onClick={this.onClick}>Добавить</button>
            </form>
        )
    }
}

function getClassName(state, inputType) {
    let classToSet = 'form__input';
    let invalid = state.invalid;

    if(invalid[inputType]) {
       classToSet += ' error';
    }

    return classToSet;
}

ReactDOM.render(
    <CommentSection />,
    document.querySelector('.root')
);
