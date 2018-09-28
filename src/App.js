import React, { Component } from 'react';
import ReactTable from "react-table";
import NavBar from './components/NavBar';
import "react-table/react-table.css";
import {Button} from 'react-bootstrap';
import Modal2 from 'react-modal';
import axios from 'axios';
import Upload from './components/upload'
import Edit from './components/Edit'
import Modal from 'react-modal';

const customStyles = {
    content : {
        top: '20%',
        left: '40%',
        bottom: 'auto',
        right: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%%, -50%)',
    }
}
const customStyles2 = {
    content : {
        top: '20%',
        left: '40%',
        bottom: 'auto',
        right: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%%, -50%)',
    }
}
Modal.setAppElement(document.getElementById('root'));
Modal2.setAppElement(document.getElementById('root'));

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
        modalIsOpen:false,
        modal2IsOpen: false
    }
    this.state = { isOpen: false };
   // this.onClick = this.onClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal2 = this.openModal2.bind(this);
    this.closeModal2 = this.closeModal2.bind(this);
  }
  openModal() {
      this.setState ({ modalIsOpen:true })
  }
  closeModal() {
      this.setState ({ modalIsOpen:false })
  }
  openModal2() {
      this.setState ({ modal2IsOpen:true })
  }
  closeModal2() {
      this.setState ({ modal2IsOpen:false })
  }

  componentDidMount(){
      const url = "http://localhost:69/all";
      axios.get(url).then(res =>{
          const posts = res.data;
          this.setState({ posts });
      })
  }
  deleteRow(id){
      const index = this.state.posts.filter((row) => row.id !== id);
      this.setState({posts: index})
      console.log("Id", id)
  }
  render() {
      const columns = [
          {
              Header: "Id",
              accessor: "id",
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
              accessor: "metadata.tags"
          },
          {
              Header: "Summary",
              accessor: "metadata.summary",
              filterable: false
          },
          {
              Header: "Date",
              accessor: "metadata.uploadDate",
              filterable: false
          },
          {
              Header: "Edit",
              Cell: props =>{
                  return(
                      <Button bsStyle="primary" onClick=
                          {this.openModal2}>Edit</Button>
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
                          this.deleteRow(props.original.id);
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
              <button className='btn btn-secondary' onClick={this.openModal}>Upload</button>
              <Modal
                  isOpen = {this.state.modalIsOpen}
                  onRequestClose = {this.closeModal}
                  style = {customStyles}>
              <Upload />
              </Modal>

              <Modal2
                  isOpen = {this.state.modal2IsOpen}
                  onRequestClose = {this.closeModal2}
                  style = {customStyles2}>
                  <Edit/>
              </Modal2>
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
