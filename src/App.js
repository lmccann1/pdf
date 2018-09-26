import React, { Component } from 'react';
import ReactTable from "react-table";
import pdf from './pdf';
import NavBar from './components/NavBar';
import Edit from './components/Edit';
import "react-table/react-table.css";
import {Button} from 'react-bootstrap';
import editModal from './components/EditModal';

// const customStyles = {
//     content : {
//         top                   : '50%',
//         left                  : '50%',
//         right                 : 'auto',
//         bottom                : 'auto',
//         marginRight           : '-50%',
//         transform             : 'translate(-50%, -50%)'
//     }
// };
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
    }
    // this.state = {
    //     modalIsOpen: false
    // };
    //     this.openModal = this.openModal.bind(this);
    //     this.closeModal = this.closeModal.bind(this);
  }
  // openModal() {
  //     this.setState({modalIsOpen: true});
  // }
  // closeModal(){
  //     this.setState({modalIsOpen: false});
  // }
  componentDidMount(){
    const url = "http://localhost:69/all";
    fetch(url, {
      method: "GET"
    }).then(response => response.json()).then(posts => {
      this.setState({posts: posts})
        console.log(posts)
    });
  }
  deleteRow(Id){
      const index = this.state.posts.filter((row) => row.Id !== Id);
      this.setState({posts: index})
      console.log("Id", Id)
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
        accessor: "metadata.tags",
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
              <Button bsStyle="primary" className="" onClick={
                  this.openModal}>Edit
              </Button>
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
                        this.deleteRow(props.original.Id);
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
    <div>
        <NavBar/>
        <editModal/>
        {/*<Button bsStyle="primary" className="" onClick={this.openModal}>EDIT*/}
        {/*</Button>*/}
        {/*<Button bsStyle="primary" onClick={*/}
            {/*this.openModal} >Edit*/}
        {/*</Button>*/}
        {/*<Modal*/}
            {/*isOpen={this.state.modalIsOpen}*/}
            {/*onAfterOpen={this.afterOpenModal}*/}
            {/*onRequestClose={this.closeModal}*/}
            {/*style={customStyles}*/}
            {/*contentLabel="Edit"*/}
        {/*>*/}
            {/*<Edit/>*/}
        {/*</Modal>*/}

        <ReactTable
        columns={columns}
        data={this.state.posts}
        filterable
        defaultPageSize={10}
        noDataText={"No results found"}
        >
        </ReactTable>
        <pdf />
    </div>
    );
  }
}

export default App;
