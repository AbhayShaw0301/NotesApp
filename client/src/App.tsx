import React, {useEffect, useState} from 'react';
import * as NotesApi from "../src/network/notes_api";

import {Button, Col, Container, Row} from "react-bootstrap";
import {Note as NoteModel} from "./models/note";
import Note from "./components/Note";
import styleUtils from "../src/styles/utils.module.css"
import styles from "../src/styles/NotesPage.module.css";
import AddNoteDialog from "./components/AddEditNoteDialog";
import {deleteNote, updateNote} from "../src/network/notes_api";
import {FaPlus} from "react-icons/fa";
import note from "./components/Note";
import AddEditNoteDialog from "./components/AddEditNoteDialog";

function App() {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);
    useEffect(() => {
        async function loadNotes() {
            try {
                const notes = await NotesApi.fetchNotes();

                setNotes(notes);
            } catch (error) {
                console.error(error);
                alert(error);
            }

        }

        loadNotes();
    }, []);

    async function deleteNote(note: NoteModel) {
        try {
            await NotesApi.deleteNote(note._id);
            setNotes(notes.filter(existingNote => existingNote._id !== note._id))
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return <Container>
        <Button className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
                onClick={() => setShowAddNoteDialog(true)}>
            <FaPlus/>
            Add New Note
        </Button>
        <Row xs={1} md={2} xl={3} className="g-4">
            {notes.map(note => <Col key={note._id}>
                <Note note={note} className={styles.note}
                      onNoteClicked={setNoteToEdit}
                      onDeleteNoteClicked={deleteNote}/>
            </Col>)}
        </Row>
        {
            showAddNoteDialog &&
            <AddNoteDialog onDismiss={() => setShowAddNoteDialog(false)}
                           onNoteSaved={(newNote) => {
                               setNotes([...notes, newNote])
                               setShowAddNoteDialog(false)
                           }}/>


        }
        {
            noteToEdit &&
            <AddEditNoteDialog noteToEdit={noteToEdit} onDismiss={() => setNoteToEdit(null)}
                               onNoteSaved={(updatedNote) => {
                                   setNotes((existingNotes) =>
                                       existingNotes.map((existingNote) =>
                                           existingNote._id === updatedNote._id ? updatedNote : existingNote
                                       )
                                   );
                                   setNoteToEdit(null);
                               }}/>
        }
    </Container>;
}

export default App;
