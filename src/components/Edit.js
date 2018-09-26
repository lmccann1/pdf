import React, { Component } from 'react';

class Edit extends Component {
    constructor(props){
        super(props);
        this.handleEdit = this.handleEdit.bind(this);
        this.state = {
            title: '',
            tags: '',
            date: ''
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            title: nextProps.title,
            tags: nextProps.tags,
            date: nextProps.date
        });
    }
    titleHandler(e){
        this.setState({ title: e.target.value})
    }
    tagsHandler(e){
        this.setState({ tags: e.target.value})
    }
    dateHandler(e){
        this.setState({ date: e.target.value})
    }

    handleEdit(){
        const item = this.state;
        this.props.editModelDetails(item);
    }

    render() {
        return(
            <div id="editModal">
                <form>
                    <input type="text" name="title"  value={this.state.Title} onChange= {(e) => this.titleHandler(e)}/>
                    <input type="text" name="tags"  value={this.state.Tags}  onChange= {(e) => this.tagsHandler(e)}/>
                    <input type="text" name="date"  value={this.state.Date}  onChange= {(e) => this.dateHandler(e)} />
                    <button type="button" onClick={() => {this.handleEdit()}}>Save</button>
                </form>
            </div>
        )};
}
export default Edit;
