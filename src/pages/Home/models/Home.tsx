import { Button } from 'react-bootstrap';

import { cleanSelectedUsersAction, deleteUsersAction } from '../../../app/store/reducers/userReducer';
import { AddUserBtn, DeleteUsersBtn, UnselectUsersBtn } from '../../../widgets';
import { UsersList } from '../../../widgets/UsersList';

const Home = () => {

    return (
        <div className='container'>
            <div className="btns" style={{ margin: "10px 0" }}>
                <AddUserBtn />
                {' '}
                <DeleteUsersBtn />
                {' '}
                <UnselectUsersBtn />
            </div>
            <UsersList />
        </div>
    );
};

export { Home };