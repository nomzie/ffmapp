import React, { Component } from 'react';
import axios from 'axios';
import { Input, Label, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

class App extends Component {

  // App's starting state
  state = {
    users: [], // at the start, users is an empty array
    newUserModal: false,
    editUserModal: false,
    newUserData: { // create new variables to hold new book value
      id: '',
      title: '',
      completed: ''
    },
    editUserData: { // create new variables to hold new book value
      id: '',
      title: '',
      completed: ''
    }
  }

  // After loading
  componentWillMount(){
    this._refreshUser();
  }

  // update the state of newUserModal
  toggleNewUserModal(){
    this.setState({
      newUserModal: ! this.state.newUserModal // set state to opposite of the newBookModal so it can open and close modal
    })
  }

  // update the state of editUserModal
  toggleEditUserModal(){
    this.setState({
      editUserModal: ! this.state.editUserModal // set state to opposite of the editBookModal so it can open and close modal
    })
  }

  // create function to add user through api
  addUser(){
    // send axios POST request to api
    axios.post('https://jsonplaceholder.typicode.com/posts/', this.state.newUserData)
    .then((response) => {
      console.log(response.data); // log response body in console
      let { users } = this.state; // update users array to current state (with the new user)
      users.push(response.data); // push the new user to the response.data
      this.setState({ // reset the state after adding new user
        users, 
        newUserModal: false,
        newUserData: {
          id: '',
          title: '',
          completed: ''
        }
      })
    })
  }

  // function to select that user to be edited
  editUser(id, title, body){
    //console.log(id, title, body); //use this line to test that it logs the values from the row of Edit button
    this.setState({ 
      editUserData: { id, title, body },
      editUserModal: !this.state.editUserModal
    });
  }

  // function to update selected user's details
  updateUser(){
    let { title, body } = this.state.editUserData; // create variable to hold the edited user details
    axios.put('https://jsonplaceholder.typicode.com/posts/' + this.state.editUserData.id, {
      title, body
    })
    .then((response) => {
      console.log(response.data); // log response body in console
      this._refreshUser();
      let { users } = this.state;
      this.setState({
        users,
        editUserModal: false,
        editUserData: {
          id: '',
          title: '',
          completed: ''
        }
      })
    })
  }

  // function to delete user
  deleteUser(id){
    axios.delete('https://jsonplaceholder.typicode.com/posts/' + id)
    .then((response) => {
      console.log(response.data); // log response body in console
      this._refreshUser();
    });
  }

  _refreshUser(){
    // GET / Api / User
    axios.get('https://jsonplaceholder.typicode.com/posts/')
    .then((response) => {
      // Set app state
      this.setState({
        users: response.data // return the values from api/users
      })
    });
  }

  render(){
    // Create a variable called users to hold api values and put variable inside render
    let users = this.state.users.map((user) => {
      
      // Return the below table
      return(
        <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.title}</td>
              <td>{user.body}</td>
              <td>
                <Button color="success" size="sm" className="mr-2" onClick={this.editUser.bind(this, user.id, user.title, user.body)}>Edit</Button>
                <Button color="danger" size="sm" onClick={this.deleteUser.bind(this, user.id)}>Delete</Button>
              </td>
            </tr>
      );
    });
    return(
      <div className="App container">

      <h1>User Accounts</h1>

        <Button className="my-3" color="primary" onClick={this.toggleNewUserModal.bind(this)}>Add User</Button>
        <Modal isOpen={this.state.newUserModal} toggle={this.toggleNewUserModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewUserModal.bind(this)}>Add a new user</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="id">ID</Label>
              <Input type="text" id="id" value={this.state.newUserData.id} onChange={(e) =>{
                let { newUserData } = this.state;
                newUserData.id = e.target.value;
                this.setState({ newUserData });
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" id="title" value={this.state.newUserData.title} onChange={(e) =>{
                let { newUserData } = this.state;
                newUserData.title = e.target.value;
                this.setState({ newUserData });
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for="body">Body</Label>
              <Input type="text" id="body" value={this.state.newUserData.body} onChange={(e) =>{
                let { newUserData } = this.state;
                newUserData.body = e.target.value;
                this.setState({ newUserData });
              }}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addUser.bind(this)}>Add User</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewUserModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit user details</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="id">ID</Label>
              <Input type="text" id="id" value={this.state.editUserData.id} onChange={(e) =>{
                let { editUserData } = this.state;
                editUserData.id = e.target.value;
                this.setState({ editUserData });
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" id="title" value={this.state.editUserData.title} onChange={(e) =>{
                let { editUserData } = this.state;
                editUserData.title = e.target.value;
                this.setState({ editUserData });
              }}/>
            </FormGroup>
            <FormGroup>
              <Label for="body">Body</Label>
              <Input type="text" id="body" value={this.state.editUserData.body} onChange={(e) =>{
                let { editUserData } = this.state;
                editUserData.body = e.target.value;
                this.setState({ editUserData });
              }}/>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateUser.bind(this)}>Save changes</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Body</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users}
          </tbody>
        </Table>
      </div>
    );

  }

}
export default App;