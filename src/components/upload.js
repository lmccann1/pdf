import React, { Component } from "react";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { WithContext as ReactTags } from 'react-tag-input';
import 'react-datepicker/dist/react-datepicker.css';

const KeyCodes = {
    comma: 188,
    enter: 13,
    SPACE: 32,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.SPACE];

export default class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date:moment(),
            uploadStatus:false,
            tags: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleChange(date) {
        this.setState({
            date:date
        });
    }

    handleSubmit(ev) {
        ev.preventDefault();

        const data = new FormData();
        data.append('upload', this.uploadInput.files[0]);
        data.append('filename', this.fileName.value);
        data.append('summary', this.fileSummary.value);
        data.append('tags', JSON.stringify(this.state.tags));
        data.append('date', this.fileDate.value);

        axios.post('http://localhost:69/post', data)
            .then(function(response) {
                this.setState({uploadStatus:true})
            })
            .catch(function (error) {
                console.log(error);
            })

        window.location.reload();
    }

    handleDelete(i) {
        let tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
    }

    handleAddition(tag) {
        this.setState(state => ({tags: [...state.tags, tag]}));
        console.log(tag.text);
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
        console.log(tag);
        console.log(tags);
    }

    render() {
        const tags = this.state.tags;
        return (
            <div>
                <h3>Upload file</h3>
                <hr/>
                <form onSubmit = {this.handleSubmit}>
                    <input className = "form-control" ref={(ref) => { this.uploadInput = ref; }} type = "file" accept = ".pdf"/><label id = "filename"></label><br/>
                    Title: <input className = "form-control" placeholder = "Give a title for the file" ref={(ref) => { this.fileName = ref; }}></input><br/>
                    Summary: <input className = "form-control" placeholder = "Give a summary for the file" ref={(ref) => { this.fileSummary = ref; }}></input><br/><br/>
                    <ReactTags
                        tags={tags}
                        handleDelete={this.handleDelete}
                        handleAddition={this.handleAddition}
                        handleDrag={this.handleDrag}
                        delimiters={delimiters}
                        ref={(ref) => { this.fileTags = ref; }}/> <br/>
                    Upload Date: <DatePicker
                    ref={(ref) => { this.fileDate = ref; }}
                    className = "form-control"
                    selected = {this.state.date}
                    onChange = {this.handleChange}
                /><br/>
                    <button type = "submit" className = "btn btn-primary">Create File</button>
                </form>
            </div>
        );
    }
}
