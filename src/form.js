var React = require('react');

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

export default CommentForm;