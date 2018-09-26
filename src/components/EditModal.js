import {Component} from "react";
import {Button} from "react-bootstrap";
import NavBar from "./NavBar";
import Modal from "react-bootstrap/es/Modal";
import Edit from "./Edit";
//import ReactTable from "react-table";
import React from "react";

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

class EditModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({modalIsOpen: true});
    }
    closeModal(){
        this.setState({modalIsOpen: false});
    }

    render() {
        return (
            <div>
                <NavBar/>
                <Button bsStyle="primary" onClick={
                    this.openModal} >Edit
                </Button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Edit"
                >
                    <Edit/>
                </Modal>

                {/*<ReactTable*/}
                    {/*columns={columns}*/}
                    {/*data={this.state.posts}*/}
                    {/*filterable*/}
                    {/*defaultPageSize={10}*/}
                    {/*noDataText={"No results found"}*/}
                {/*>*/}
                {/*</ReactTable>*/}
                <pdf />
            </div>
        );
    }
}

export default EditModal;
