import React, { Component } from 'react';
//import {Link} from 'react-router-dom';
import axios from 'axios';
// functional component - lacks state and lifecycle methods used when we need only to accept props and return jsx.
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
       <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);
    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = {exercises: []};
  }
  // this code runs before the page gets rendered and the setState method will assign the value to the exercises property of components state object. 
  componentDidMount() {
    axios.get('https://backend-activity-tracker.onrender.com/exercises/')
     .then(response => {
       this.setState({ exercises: response.data });
     })
     .catch((error) => {
        console.log(error);
     })
  }
  //delete method will delete from list of exercises and then setstate method will filter out the exercise that was deleted using filter method.
  deleteExercise(id) {
    axios.delete('https://backend-activity-tracker.onrender.com/exercises/'+id)
      .then(res => console.log(res.data));
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }
  // this method iterates through list of exercises using map, each exercise item is output with the exercise component.
  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }
  // return statement of render function will display list in the form of table.
  render() {
    return (
      <div>
  <h3>Activities Logged</h3>
  <table className="table">
    <thead className="thead-light">
      <tr>
        <th>Username</th>
        <th>Description</th>
        <th>Duration</th>
        <th>Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      { this.exerciseList() }
    </tbody>
  </table>
</div>
    )
  }
}