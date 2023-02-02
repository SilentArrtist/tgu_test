import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, CardGroup, Form, FormText, ListGroup, Modal, Placeholder } from 'react-bootstrap';
import { useTypedSelector } from '../../../app/hooks/useTypedSelector';
import { IUser } from '../../../shared/types';
import { SelectAvatarPopUp, UserItem } from '../..';
import { Input } from '../../../shared/ui';
import { useDispatch } from 'react-redux';
import { cleanSelectedUsersAction, createUserAction, deleteUsersAction, editUserAction } from '../../../app/store/reducers/userReducer';
import { fullName } from '../../../shared/utils/fullname';
import { useNavigate } from 'react-router-dom';

const DeleteUsersPopUp = ({ show, setShow }: any) => {

    const selectedUsers = useTypedSelector(state => state.users.selectedUsers)
    const navigate = useNavigate();
    const users = useTypedSelector(state => state.users.users);
    const [usersToDelete, setUsersToDelete] = useState<IUser[] | undefined>();
    const dispatch: any = useDispatch();

    const deleteUsers = () => {
        dispatch(deleteUsersAction(selectedUsers))
        dispatch(cleanSelectedUsersAction())
        setShow(false);
        navigate("/", { replace: true })
    }

    useEffect(() => {
        const usersArray: IUser[] = [];
        for (const id of selectedUsers) {
            usersArray.push(users.filter(user => user.id === id)[0])
        }
        setUsersToDelete(usersArray)
    }, [selectedUsers])
    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete users
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
                <Card style={{ width: '18rem' }}>
                    <ListGroup variant="flush">
                        {
                            usersToDelete?.length !== 0
                                ?
                                usersToDelete?.map((user) => (
                                    <ListGroup.Item key={user.id}>{fullName(user)}</ListGroup.Item>
                                ))
                                :
                                <ListGroup.Item>NO USERS SELECTED</ListGroup.Item>
                        }
                    </ListGroup>
                </Card>
            </Modal.Body>
            <Button
                onClick={deleteUsers}
            >
                Submit
            </Button>
        </Modal>

    );
};

export { DeleteUsersPopUp };