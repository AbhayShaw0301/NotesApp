import React, {useEffect, useState} from 'react';
import * as NotesApi from "../src/network/notes_api";

import {Button, Col, Container, Row} from "react-bootstrap";
import {Note as NoteModel} from "./models/note";
import Note from "./components/Note";
import styleUtils from "../src/styles/utils.module.css"
import styles from "../src/styles/NotesPage.module.css";
import AddNoteDialog from "./components/AddNoteDialog";

function App() {
    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
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
    return (
        <Container>
            <Button className={`mb-4 ${styleUtils.blockCenter}`}
                onClick={() => setShowAddNoteDialog(true)}>
                Add New Note
            </Button>
            <Row xs={1} md={2} xl={3} className="g-4">
                {notes.map(note => (
                    <Col key={note._id}>
                        <Note note={note} className={styles.note}/>
                    </Col>

                ))}
            </Row>
            {
                showAddNoteDialog &&
                <AddNoteDialog onDismiss={() => setShowAddNoteDialog(false)}
                               onNoteSaved={(newNote) => {
                                   setNotes([...notes,newNote])
                                   setShowAddNoteDialog(false)
                               }}/>

            }
        </Container>
    );
}

export default App;
