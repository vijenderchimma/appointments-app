// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointmentList: [], title: '', date: '', filterStarredOne: false}

  filterStarredAppointment = () => {
    const {filterStarredOne} = this.state
    this.setState({filterStarredOne: !filterStarredOne})
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onClickAddButton = event => {
    event.preventDefault()
    const {title, date} = this.state

    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeTextInput = event => {
    this.setState({title: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({date: event.target.value})
  }

  getFilteredStarredAppointment = () => {
    const {appointmentList, filterStarredOne} = this.state
    if (filterStarredOne) {
      return appointmentList.filter(
        eachTransaction => eachTransaction.isStarred === true,
      )
    }
    return appointmentList
  }

  render() {
    const {title, date} = this.state
    const filteredStarredAppointment = this.getFilteredStarredAppointment()
    return (
      <div className="app-container">
        <div className="content-container">
          <h1 className="main-heading">Add Appointment</h1>
          <div className="form-image-container">
            <form>
              <label htmlFor="textInput" className="label-input">
                TITLE
              </label>
              <br />
              <input
                value={title}
                id="textInput"
                className="text-input"
                placeholder="Title"
                onChange={this.onChangeTextInput}
              />
              <br />
              <label className="label-input" htmlFor="dateInput">
                DATE
              </label>
              <br />
              <input
                type="date"
                value={date}
                id="dateInput"
                className="date-input"
                onChange={this.onChangeDateInput}
              />
              <br />
              <button
                type="submit"
                className="add-button"
                onClick={this.onClickAddButton}
              >
                Add
              </button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="appointment-image"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="appointment-container">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              className="starred-button"
              onClick={this.filterStarredAppointment}
            >
              Starred
            </button>
          </div>
          <ul className="appointment-list-container">
            {filteredStarredAppointment.map(eachAppointment => (
              <AppointmentItem
                eachAppointment={eachAppointment}
                key={eachAppointment.id}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
