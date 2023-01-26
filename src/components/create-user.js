import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: ''
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
    };
    console.log(newUser);
    
    this.setState({
      username: ''
    })
  }
  onSubmit(e) {
    e.preventDefault();
  
    const newUser = {
      username: this.state.username,
      
    };
  
    console.log(newUser);
    axios.post('https://backend-activity-tracker.onrender.com/users/add', newUser)
  .then(res => console.log(res.data));
    
    window.location = '/';
  }

  render() {
    return (
      <div>
  <h3>Create New User</h3>
  <form onSubmit={this.onSubmit}>
    <div className="form-group"> 
      <label>Username: </label>
      <input  type="text"
          required
          className="form-control"
          value={this.state.username}
          onChange={this.onChangeUsername}
          />
    </div>
    <div className="form-group">
      <input type="submit" value="Create User" className="btn btn-primary" />
    </div>
  </form>
</div>
    )
  }
}