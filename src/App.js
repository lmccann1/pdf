import React, { Component } from 'react';
import ReactTable from "react-table";
import pdf from './pdf';
import NavBar from './components/NavBar';
import "react-table/react-table.css";
import {Button} from 'react-bootstrap';
import Modal from './components/EditModal';
import axios from 'axios';
import Upload from './components/upload'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
    this.state = { isOpen: false };
    this.onClick = this.onClick.bind(this);
  }
  toggleModal = () => {
      this.setState({
          isOpen: !this.state.isOpen
      });
  }
  componentDidMount(){
      const url = "http://localhost:69/all";
      axios.get(url).then(res =>{
          const posts = res.data;
          this.setState({ posts });
      })
  }
  deleteRow(_id){
      const index = this.state.posts.filter((row) => row._id !== _id);
      this.setState({posts: index})
      console.log("Id", _id)
  }
  onClick(passId){
      this.props.findID(passId)
  }
  render() {
      const columns = [
          {
              Header: "Id",
              accessor: "_id",
              show: false,
              style:{
                  textAlign: "right"
              },
              width: 100,
              maxWidth: 100,
              minWidth: 100
          },
          {
              Header: "Title",
              accessor: "filename",
              Cell: e =><a href={e.value}> {e.value} </a>,

              style:{
                  textAlign: "right"
              },
              width: 100,
              maxWidth: 100,
              minWidth: 100
          },
          {
              Header: "Tags",
              accessor: "metadata.tags[0].text"
          },
          {
              Header: "Summary",
              accessor: "metadata.summary",
              filterable: false
          },
          {
              Header: "Date",
              accessor: "uploadDate",
              filterable: false
          },
          {
              Header: "Edit",
              Cell: props =>{
                  return(
                      <Button bsStyle="primary" onClick={this.toggleModal}>Edit Modal</Button>
                  )
              },
              sortable:false,
              filterable: false,
              width: 100,
              maxWidth: 100,
              minWidth: 100
          },
          {
              Header: "Delete",
              Cell: props =>{
                  return(
                      <Button bsStyle="danger" className="" onClick={() =>{
                          this.deleteRow(props.original._id);
                      }}>Delete
                      </Button>
                  )
              },
              sortable:false,
              filterable: false,
              width: 100,
              maxWidth: 100,
              minWidth: 100
          }
          ]
      return (
          <div className="App">
              <NavBar/>
              <Upload />
        {/*<button onClick={this.toggleModal}>Edit Modal</button>*/}
        <Modal show={this.state.isOpen}
               onClose={this.toggleModal}>
        </Modal>

              <ReactTable
        columns={columns}
        data={this.state.posts}
        filterable
        defaultPageSize={10}
        noDataText={"No results found"}
              >

              </ReactTable>
          </div>
    );
  }
}

export default App;
