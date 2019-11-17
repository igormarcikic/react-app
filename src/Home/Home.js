import React, { useState, useEffect } from 'react';
import Note from './../DisplayNote/Note'
import AddNote from './../AddNote/AddNote'
import Draft from './../NoteDraft/NoteDraft'
import axios from 'axios'

const Home = () => {
  // App states initialization
  const [initialNotesState, setInitialNotesState] = useState({notes: []})
  const [notesState,setNotesState] = useState({notes: []});
  const [notesDraftState,setNotesDraftState] = useState({notes: []});
  const [titleState, setTitleState] = useState({title: null})
  const [bodyState, setBodyState] = useState({body: null})
  const [authorState, setAuthorState] = useState({author: null})

  // Helper variables for handling UI until state is loaded
  const [isLoading, setIsLoading] = useState(false);

   // Fetch notes from JSON file and use as initial state
   useEffect( () => {
    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios('./Data/Notes.JSON')
      setInitialNotesState({
        notes: response.data.data
      })
      setNotesState({
        notes: response.data.data
      })
      setIsLoading(false);
    }
    fetchData()
  }, [])

  // Method for authenticating modal data before submitting
  const authenticateModalHandler = (event) => {
    if(titleState.title === null || bodyState.body === null || authorState.author === null) {
      alert('You must fill in all fields!')
    } else {
      if(event.target.name === 'post') {
        addNoteHandler('note')
        alert('Note Added!')
        document.getElementById('myForm').reset()  
      } else {
        addNoteHandler('draft')
        alert('Note Draft Added!')
        document.getElementById('myForm').reset() 
      }
    }
  }

  // Method for updating note attributes state from the child component
  const attrChangedHandler = (event) => {
    if(event.target.name === 'title') {
      setTitleState({
        title: event.target.value
      })
    } else if(event.target.name === 'body') {
      setBodyState({
        body: event.target.value
      })
    } else {
      setAuthorState({
        author: event.target.value
      })
    }
  }

  // Method for adding new note (published and draft) depending on the passed parameter
  const addNoteHandler = (type) => {
    const date = new Date().toLocaleDateString('en-GB')
    const newNote = {
      title: titleState.title,
      body: bodyState.body,
      author_name: authorState.author,
      status: 'ongoing',
      date: date,
      url: 'https://cdn.pixabay.com/photo/2019/11/02/20/18/fog-4597348_960_720.jpg'
    }
    if(type === 'note') {
      setNotesState({
        notes: [...notesState.notes,newNote]
      })
      setInitialNotesState({
        notes: [...notesState.notes,newNote]
      })
    } else {
      setNotesDraftState({
        notes: [...notesDraftState.notes,newNote]
      })
    }
  }

  // Method for deleting notes (published and draft) depending on the passed parameter
  const deleteNoteHandler = (index, type) => {
    if(type === 'notes') {
      const notes = [...notesState.notes]
      notes.splice(index,1)
      setNotesState({
        notes: notes
      })
      setInitialNotesState({
        notes: notes
      })
    } else {
      const notes = [...notesDraftState.notes]
      notes.splice(index,1)
      setNotesDraftState({
        notes: notes
      })
    }
  }

  // Method for publishing drafts
  const publishDraftHandler = (index) => {
    const draft = notesDraftState.notes[index]
    setNotesState({
      notes: [...notesState.notes, draft]
    })
    setInitialNotesState({
      notes: [...notesState.notes, draft]
    })
    deleteNoteHandler(index, 'draft')
  }

  // Method for filtering published notes
  const filterNotesHandler = (event) => {
    const allNotes = [...initialNotesState.notes]
    const filteredNotes = allNotes.filter( note => {
      return note.title.toUpperCase().indexOf(event.target.value.toUpperCase()) > -1
    })
    setNotesState({
      notes: filteredNotes
    })
  }

  // Method for sorting published notes by date
  const sortByDate = () => {
    const filtered = notesState.notes.sort((a, b) => {
      let aa = a.date.split('/').reverse().join()
      let bb = b.date.split('/').reverse().join()
      return aa > bb ? -1 : 0
    });
      setNotesState({
        notes: filtered
      })
  }

 

  return (
    <div className="home">
      <h4>Filter Notes:</h4>
      <input type='text' onInput={filterNotesHandler} className="m-2 p-1"/>

      <AddNote 
      changed={(event) => attrChangedHandler(event)}
      authenticate={(event) => authenticateModalHandler(event)}/>

      <button className="btn btn-warning m-2" onClick={sortByDate}>Sort By Date</button>
      
      {/* Check if the initial state is loaded before listing notes, else showing "Loading" message */}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
      <div className="App row">

      {notesState.notes.map((note, index) =>
        <Note 
        note = {note}
        delete={() => deleteNoteHandler(index, 'notes')} 
        key={index}/>
      )} 
      </div>
      )} 
      <hr />

      {/* Showing draft component only if the draft's array is not empty */}
      {notesDraftState.notes.length > 0 ? (
        <div className="App row">
        <h2 className="col col-lg-12">Note Drafts:</h2>
        {notesDraftState.notes.map((note, index) =>
          <Draft 
          note = {note}
          delete={() => deleteNoteHandler(index, 'drafts')}
          publish={() => publishDraftHandler(index)}
          key={index}/>
        )} 
        </div>
      ) : (
        <div></div>
      )} 

    </div>
  );
}

export default Home;
