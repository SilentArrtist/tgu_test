import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../app/hooks/useTypedSelector';
import { cleanSelectedUsersAction } from '../../../app/store/reducers/userReducer';
const UnselectUsersBtn = () => {
    const selectedUsers = useTypedSelector(state => state.users.selectedUsers)
    const dispatch: any = useDispatch();
    const unselectAllUsers = () => {
        dispatch(cleanSelectedUsersAction())
    }
    return (
        <Button
            onClick={unselectAllUsers}
            disabled={selectedUsers.length === 0}
            variant={`${selectedUsers.length !== 0 ? "secondary" : "outline-secondary"}`}
        >
            Unselect All
        </Button>
    );
};

export { UnselectUsersBtn };