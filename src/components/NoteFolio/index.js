import './index.css'
import {v4} from 'uuid'
import {useState, useEffect} from 'react'
import NoteItem from '../NoteItem'

const NoteFoilo = () => {
  const [noteList, setNoteList] = useState([])
  const [titleUserInput, setTitleUserInput] = useState('')
  const [descUserInput, setDescUserInput] = useState('')

  useEffect(() => {
    const stringifiedNoteList = localStorage.getItem('noteList')
    const parsedNoteList = JSON.parse(stringifiedNoteList)
    if (parsedNoteList !== null) {
      setNoteList(parsedNoteList)
    }
  }, [])

  const onClickSaveButton = () => {
    localStorage.setItem('noteList', JSON.stringify(noteList))
  }

  const onAddNoteItem = () => {
    if (titleUserInput === '') {
      alert('Enter Valid Text')
    } else {
      const newNote = {
        id: v4(),
        title: titleUserInput,
        description: descUserInput,
        createdTime: new Date(),
      }

      setNoteList(prevNoteList => [...prevNoteList, newNote])
      setTitleUserInput('')
      setDescUserInput('')
    }
  }

  const changeTitleUserInput = event => {
    setTitleUserInput(event.target.value)
  }

  const changeDescUserInput = event => {
    setDescUserInput(event.target.value)
  }

  const deleteNoteItem = id => {
    setNoteList(prevNoteList =>
      prevNoteList.filter(eachNote => eachNote.id !== id),
    )
  }

  const emptyView = () => (
    <div className='empty-view'>
      <img src='https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png' />
      <p className='empty-view-paragraph'>
        Your list is clear! Add some notes to get started, or take a
        well-deserved break from your conquering ways.
      </p>
    </div>
  )

  const noteItemsList = () => {
    if (noteList.length === 0) {
      return emptyView()
    }

    return (
      <ul className='todo-items-container' id='todoItemsContainer'>
        {noteList.map(eachNote => (
          <NoteItem
            key={eachNote.id}
            noteItem={eachNote}
            deleteNoteItem={deleteNoteItem}
          />
        ))}
      </ul>
    )
  }

  return (
    <div className='todos-bg-container'>
      <h1 className='todos-heading'>NoteFoilo</h1>
      <h1 className='create-task-heading'>
        Add <span className='create-task-heading-subpart'>Note</span>
      </h1>
      <div className='note-input-container'>
        <label className='input-labels' htmlFor='title'>
          Title
        </label>
        <input
          type='text'
          value={titleUserInput}
          className='todo-user-input'
          placeholder='Give your note title'
          onChange={changeTitleUserInput}
          id='title'
        />
      </div>
      <div className='note-input-container'>
        <label className='input-labels' htmlFor='description'>
          Description
        </label>
        <textarea
          type='text'
          value={descUserInput}
          className='todo-user-input'
          placeholder="Write what's on your mind..."
          onChange={changeDescUserInput}
          id='description'
          cols='100'
          rows='5'
        />
      </div>
      <button className='button' onClick={onAddNoteItem}>
        Add
      </button>
      <h1 className='todo-items-heading'>
        My <span className='todo-items-heading-subpart'>Notes</span>
      </h1>
      {noteItemsList()}
      <button className='button' onClick={onClickSaveButton}>
        Save
      </button>
    </div>
  )
}

export default NoteFoilo
