import React, {useState} from 'react';
import {User} from "../models/user";
import {useForm} from "react-hook-form";
import * as NotesApi from "../network/notes_api";
import {LoginCredentials} from "../network/notes_api";
import {Alert, Button, Form, Modal} from "react-bootstrap";
import styleUtils from "../styles/utils.module.css";
import TextInputField from "./form/TextInputField";
import {UnauthorizedError} from "../errors/http_errors";

interface LoginModalProps {
    onDismiss: () => void,
    onLoginSuccessful: (user: User) => void,
}

const LoginModal = ({onLoginSuccessful, onDismiss}: LoginModalProps) => {
    const [errorText, setErrorText] = useState<string | null>(null);
        const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<LoginCredentials>();

        async function onSubmit(credentials: LoginCredentials) {
            try {
                const user = await NotesApi.login(credentials);
                onLoginSuccessful(user);

            } catch (error) {
                if (error instanceof UnauthorizedError) {
                    setErrorText(error.message)
                } else {
                    alert(error);
                }
                console.error(error);
            }
        }

        return (
            <Modal show onHide={onDismiss}>
                <Modal.Header closeButton>
                    Log In
                </Modal.Header>
                <Modal.Body>
                    {errorText &&
                        <Alert variant="danger">
                            {errorText}
                        </Alert>
                    }
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <TextInputField name="username" label="Username" type="text" placehoder="Username"
                                        register={register}
                                        registerOptions={{required: "Required"}} error={errors.username}/>
                        <TextInputField name="password" label="Password" type="password" placehoder="Password"
                                        register={register}
                                        registerOptions={{required: "Required"}} error={errors.password}/>
                        <Button type="submit" disabled={isSubmitting} className={styleUtils.width100}>
                            Log In
                        </Button>
                    </Form>


                </Modal.Body>

            </Modal>
        )
    }
;

export default LoginModal;