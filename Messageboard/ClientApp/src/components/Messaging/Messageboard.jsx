import React, { Component } from 'react';
import axios from 'axios';

export class Messageboard extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            body: '',
            messages: [],
            loading: true,
        }
    }

    componentDidMount() {
        this.getAllMessages();
    }

    getAllMessages() {
        axios.get("api/messages").then(result => {
            const response = result.data;
            this.setState({ messages: response, loading: false });
        })
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeBody(e) {
        this.setState({
            body: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        let msg = {
            title: this.state.title,
            body: this.state.body,
        }

        axios.post("api/messages", msg).then(result => {
            this.getAllMessages();
            this.setState({
                title: '',
                body: '',
            });
        })
    }

    renderMessagesTable(messages) {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        messages.slice(0).reverse().map(m => (
                            <tr key={m.id}>
                                <td>{m.title}</td>
                                <td>{m.body}</td>
                                <td><button onClick={() => {
                                    axios.delete('api/messages/' + m.id)
                                        .then(result => { this.getAllMessages(); });
                                }}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        );
    }

    render() {
        let content = this.state.loading ? (
            <p>
                <em>Loading...</em>
            </p>
        ) : (
                this.renderMessagesTable(this.state.messages)
            )

        return (
            <div>
                <div className="message-form" >
                    <h3>Add new message</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Message title:  </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                            />
                        </div>
                        <div className="form-group">
                            <label>Message body: </label>
                            <textarea
                                type="text"
                                className="form-control"
                                value={this.state.body}
                                onChange={this.onChangeBody}
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Add Message" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
                <div>
                    <div className="messageboard">
                        <h1>Message Board</h1>
                        <p>Here you can see all messages, from all the users.</p>
                    </div>
                    {content}
                </div>
            </div>
        )
    }
}