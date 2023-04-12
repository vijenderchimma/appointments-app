// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, toggleIsStarred} = props
  const {id, date, title, isStarred} = eachAppointment
  const starredImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onClickStarredImage = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="list-item">
      <div>
        <p className="heading">{title}</p>
        <p className="formatted-date">Date: {formattedDate}</p>
      </div>
      <button
        type="button"
        className="starred-image"
        data-testid="star"
        onClick={onClickStarredImage}
      >
        <img src={starredImageUrl} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
