import React, { Component } from 'react';

class FormComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: false,
            text: '',
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            text: nextProps.text
        })
    }

    onFocus = () => {
        this.setState({
            status: true
        })
    }

    onChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    onSubmit = () => {
        const { text } = this.state;
        this.props.onComment(text);
        this.setState({
            text: ""
        })
        console.log('not', this.state.text)
    }

    render() {
        const { status, text } = this.state;
        return (
            <div className="w-full ml-4">
                <textarea type="text" name="name" placeholder="Nhập nội dung"
                    onFocus={ this.onFocus }
                    onChange={ this.onChange }
                    value={text}
                    className="w-full border-2 border-gray-400 rounded-md focus:outline-none focus:border-green-600 p-2" />
                {status && <button onClick={this.onSubmit} className="bg-green-600 rounded-md px-4 py-1 text-white font-bold shadow-md hover:bg-white hover:text-green-600 border-2 border-green-600">Gửi</button>}
                {status && <button className="rounded-md px-4 py-1 text-gray-500 font-bold shadow-xl hover:text-green-600 border-2 hover:border-green-600 ml-2">Hủy</button>}
            </div>
        );
    }
}

export default FormComment;