import React, {useEffect, useState} from 'react';
import * as NotesApi from "../src/network/notes_api";

import {Container} from "react-bootstrap";
import SignUpModal from "./components/SignUpModal";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import {User} from "./models/user";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NotesPage from "./pages/NotesPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFoundPage from "./pages/NotFoundPage";
import styles from "../src/styles/App.module.css";

function App() {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
                const user = await NotesApi.getLoggedInUser();
                setLoggedInUser(user);
            } catch (error) {
                console.error(error);
            }
        }

        fetchLoggedInUser();
    }, []);


    return (
        <BrowserRouter>


            <div>
                <NavBar
                    loggedInUser={loggedInUser}
                    onSignUpClicked={() => setShowSignUpModal(true)}
                    onLoginCLicked={() => setShowLoginModal(true)}
                    onLogoutSuccessful={() => setLoggedInUser(null)}/>


                <Container className={styles.pageContainer}>
                    <Routes>
                        <Route path="/" element={<NotesPage loggedInUser={loggedInUser}/>}/>
                        <Route path="/privacy" element={<PrivacyPage/>}/>
                        <Route path="/*" element={<NotFoundPage/>}/>
                    </Routes>
                </Container>
                {
                    showSignUpModal && <SignUpModal onDismiss={() => setShowSignUpModal(false)}
                                                    onSignUpSuccessful={(user) => {
                                                        setLoggedInUser(user);
                                                        setShowSignUpModal(false);
                                                    }}/>
                }
                {showLoginModal && <LoginModal onDismiss={() => setShowLoginModal(false)}

                                               onLoginSuccessful={(user) => {
                                                   setLoggedInUser(user);
                                                   setShowLoginModal(false);
                                               }}/>}
            </div>
        </BrowserRouter>
    )
}

export default App;
