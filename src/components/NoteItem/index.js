import './index.css'
import {AiOutlineDelete} from 'react-icons/ai'

const getTimeDistance = date => {
  const then = new Date(date)
  const now = new Date()
  const diffInMilliseconds = Math.abs(now - then)

  const secondInMilli = 1000
  const minuteInMilli = secondInMilli * 60
  const hourInMilli = minuteInMilli * 60
  const dayInMilli = hourInMilli * 24
  const monthInMilli = dayInMilli * 30
  const yearInMilli = monthInMilli * 12

  let duration

  if (diffInMilliseconds < secondInMilli) {
    duration = 'just now'
  } else if (diffInMilliseconds < minuteInMilli) {
    duration = `${Math.floor(diffInMilliseconds / secondInMilli)} seconds ago`
  } else if (diffInMilliseconds < hourInMilli) {
    duration = `${Math.floor(diffInMilliseconds / minuteInMilli)} minutes ago`
  } else if (diffInMilliseconds < dayInMilli) {
    duration = `${Math.floor(diffInMilliseconds / hourInMilli)} hours ago`
  } else if (diffInMilliseconds < monthInMilli) {
    duration = `${Math.floor(diffInMilliseconds / dayInMilli)} days ago`
  } else if (diffInMilliseconds < yearInMilli) {
    duration = `${Math.floor(diffInMilliseconds / monthInMilli)} months ago`
  } else {
    duration = `${Math.floor(diffInMilliseconds / yearInMilli)} years ago`
  }
  return duration
}

const NoteItem = props => {
  const {noteItem, deleteNoteItem} = props
  const {id, title, description, createdTime} = noteItem

  const onClickDeleteIcon = () => {
    deleteNoteItem(id)
  }

  const duration = getTimeDistance(createdTime)

  return (
    <li className="todo-item-container">
      <div className="label-container">
        <div className="label-text-container">
          <p className="checkbox-label">{title}</p>
          <p className="checkbox-label">{description}</p>
          <div className="time-status-container">
            <p className="duration-para">{duration}</p>
          </div>
        </div>

        <div className="delete-icon-container">
          <AiOutlineDelete
            className="delete-icon"
            onClick={onClickDeleteIcon}
          />
        </div>
      </div>
    </li>
  )
}

export default NoteItem
