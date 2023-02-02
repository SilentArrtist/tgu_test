import React, { useState } from 'react';
import { Alert, Button, Card, CardGroup, Form, FormText, Modal, Placeholder } from 'react-bootstrap';
import { useTypedSelector } from '../../../app/hooks/useTypedSelector';
import { IUser } from '../../../shared/types';
import { SelectAvatarPopUp, UserItem } from '../..';
import { Input } from '../../../shared/ui';
import { useDispatch } from 'react-redux';
import { createUserAction, editUserAction } from '../../../app/store/reducers/userReducer';

const AddUserPopUp = ({ show, setShow, data }: any) => {
    const userNoImageUrl = "https://purr.objects-us-east-1.dream.io/i/2013-10-19%2016.06.51.jpg";
    const [avatar, setAvatar] = useState(data?.avatar || userNoImageUrl);
    const [showAvatarsPopUp, setShowAvatarsPopUp] = useState(false);
    const [firstName, setFirstName] = useState(data?.firstName || "");
    const [lastName, setLastName] = useState(data?.lastName || "");
    const [patronymic, setPatronymic] = useState(data?.patronymic || "");
    const [email, setEmail] = useState(data?.email || "");
    const [emailError, setEmailError] = useState(false);
    const [about, setAbout] = useState(data?.about || "");
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");
    const users = useTypedSelector(state => state.users.users)
    const dispatch: any = useDispatch();

    const emailValidation = (email: string) => {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return email.match(validRegex);
    }
    const checkEmail = () => {
        let emailAlreadyExist = false;
        for (const user of users) {
            if (email === user.email) {
                emailAlreadyExist = true;
            }
        }
        return emailAlreadyExist;
    }

    const emailChangeHandler = (emailFromInput: string) => {
        if (!emailValidation(emailFromInput)) {
            setEmailError(true);
        }
        else {
            setEmailError(false);
        }
        setEmail(emailFromInput);
    }

    const createNewUser = () => {
        if (!data) {
            if (!emailValidation(email)) {
                setAlertText("Wrong email")
                setShowAlert(true);
                return;
            }
            else if (firstName === "") {
                setAlertText("First Name is empty")
                setShowAlert(true);
                return;
            }
            else if (lastName === "") {
                setAlertText("Last Name is empty")
                setShowAlert(true);
                return;
            }
            else if (checkEmail()) {
                setAlertText("User with that Email already exist")
                setShowAlert(true);
                return;
            }
            const newUser: IUser = {
                id: Date.now(),
                createDate: JSON.stringify(Date.now()),
                avatar: avatar,
                firstName: firstName,
                lastName: lastName,
                patronymic: patronymic,
                email: email,
                about: about,
            }
            dispatch(createUserAction(newUser));
            setAvatar(userNoImageUrl);
            setEmail("");
            setFirstName("");
            setLastName("");
            setAbout("");

        }
        else {
            if (firstName === "") {
                setAlertText("First Name is empty")
                setShowAlert(true);
                return;
            }
            else if (lastName === "") {
                setAlertText("Last Name is empty")
                setShowAlert(true);
                return;
            }
            console.log(data);

            const newUser: IUser = {
                id: data?.id,
                createDate: data?.createDate,
                avatar: avatar,
                firstName: firstName,
                lastName: lastName,
                patronymic: patronymic,
                email: data?.email,
                about: about,
            }
            dispatch(editUserAction(newUser))
        }
        setShow(false);
    }
    const showAvatarsPopUpHandler = () => {
        setShowAvatarsPopUp(true);
    }

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Add new User
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={
                    {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }
                }
            >
                <img
                    src={avatar}
                    alt=""
                    onClick={showAvatarsPopUpHandler}
                    style={
                        {
                            display: "block",
                            width: "150px",
                            height: "150px",
                            borderRadius: "100%",
                            marginBottom: "10px",
                            cursor: "pointer"
                        }
                    }
                />
                <SelectAvatarPopUp
                    show={showAvatarsPopUp}
                    setShow={setShowAvatarsPopUp}
                    setPreviousPopUpOpen={setShow}
                    value={avatar}
                    setValue={setAvatar}
                />
                {
                    showAlert &&
                    <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                        <Alert.Heading>Something Wrong!</Alert.Heading>
                        <p>
                            {alertText}
                        </p>
                    </Alert>
                }
                <Form>
                    <Input type={"email"} placeholder={"Email"} value={email} setValue={emailChangeHandler} invalid={emailError || email === ""} disabled={data ? true : false} />
                    <Input placeholder={"First Name"} value={firstName} setValue={setFirstName} invalid={firstName === ""} />
                    <Input placeholder={"Last Name"} value={lastName} setValue={setLastName} invalid={lastName === ""} />
                    <Input placeholder={"Patronymic"} value={patronymic} setValue={setPatronymic} />
                    <Input placeholder={"About"} value={about} setValue={setAbout} />
                </Form>
            </Modal.Body>
            <Button
                onClick={() => createNewUser()}
            >
                {data ? "Save" : "Add"}
            </Button>
        </Modal>

    );
};

export { AddUserPopUp };