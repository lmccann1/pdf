import React, { Component } from 'react';
import axios from 'axios';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.findID = this.findID.bind(this);

        this.state = {
            id: '',
            filename: '',
            summary: '',
            date: ''
        }

    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(e.target.name)

    }
    findID(passId) {
        this.setState({
            id: passId
        })
    }
    onSubmit(e) {
      e.preventDefault();

        const update = {
            filename: this.state.filename,
            summary: this.state.summary,
            date: this.state.date
        };
        axios.put('http://localhost:69/update/'+this.state.id, update).then(res => console.log(res.data));

        this.setState({
            id: '',
            filename: '',
            summary: '',
            date: ''
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>Title: </label>
                    <input type="text" name="filename"  onChange={this.handleChange} />
                    <label>Summary: </label>
                    <input type="text" name="summary" onChange={this.handleChange} />
                    <label>Date: </label>
                    <input type="text" name="date" onChange={this.handleChange}/>
                    <input type="submit" value="Update"/>
                </form>
            </div>
        )
    }
}

export default Edit;


















































