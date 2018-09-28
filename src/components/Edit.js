import React, { Component } from 'react';
import axios from 'axios';

class Edit extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.findID = this.findID.bind(this);

        this.state = {
          //  id: '',
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
            //id: this.state.id,
            filename: this.state.filename,
            summary: this.state.summary,
            date: this.state.date
        };
        axios.put('http://localhost:69/update/'+this.state.id, update).then(res => console.log(res.data));

        this.setState({
          //  id: '',
            filename: '',
            summary: '',
            date: ''
        });
    }

    render() {
        return (
            <div>
                <h3 align="center">Edit File</h3>
                <hr/>
                <form onSubmit={e => this.onSubmit(e)}>
                    <label>Title: </label>
                    <br/>
                    <input type="text" name="filename" value={this.state.filename}  onChange={this.handleChange} />
                    <br/>
                    <br/>
                    <label>Summary: </label>
                    <br/>
                    <input type="text" name="summary" value={this.state.summary} onChange={this.handleChange} />
                    <br/>
                    <br/>
                    <label>Date: </label>
                    <br/>
                    <input type="text" name="date"  value={this.state.date} onChange={this.handleChange}/>
                    <br/>
                    <br/>
                    <input type="submit" value="Update"/>
                </form>
            </div>
        )
    }
}

export default Edit;


















































