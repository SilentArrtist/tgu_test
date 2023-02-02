import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { IUserProp } from '../../../shared/types';
import { useDispatch } from 'react-redux';
import { selectUserAction } from '../../../app/store/reducers/userReducer';
import { useTypedSelector } from '../../../app/hooks/useTypedSelector';
import { useNavigate } from 'react-router-dom';
const UserItem = ({ user }: IUserProp) => {
    const selectedUsers = useTypedSelector(state => state.users.selectedUsers)
    const [selected, setSelected] = useState(selectedUsers.filter(id => id === user.id).length !== 0);
    const navigate = useNavigate();
    const dispatch: any = useDispatch();
    const userNoImageUrl = "https://purr.objects-us-east-1.dream.io/i/2013-10-19%2016.06.51.jpg";
    const selectUser = (e: any, key: number) => {
        e.stopPropagation();
        setSelected(!selected)
        dispatch(selectUserAction(key))
    }


    useEffect(() => {
        if (!(selectedUsers.includes(user.id))) {
            setSelected(false);
        }
    }, [selectedUsers])
    return (
        <Card
            style={{
                width: "250px",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                gap: "3px",
                textAlign: "center"
            }}
            onClick={(e) => navigate(`/${user.id}`)}
        >
            <Card.Img style={
                {
                    width: '100px',
                    height: '100px',
                    borderRadius: "100%",
                    marginTop: "10px"
                }
            } variant="top" src={user?.avatar || userNoImageUrl} />
            <Card.Body
            >
                <Card.Title>{user.firstName} {user.lastName}</Card.Title>
                <Card.Title>{user.patronymic}</Card.Title>
                <Card.Text>
                    {user.email}
                </Card.Text>
            </Card.Body>
            <Button
                style={
                    {
                        marginBottom: "5px"
                    }
                }
                onClick={(e) => { selectUser(e, user.id) }}
            >{!selected ? "Select" : "Selected"}</Button>
        </Card >
    );
};

export { UserItem };