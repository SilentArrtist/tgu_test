import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { AddUserPopUp } from '../../../features';

const AddUserBtn = () => {
    const [show, setShow] = useState(false)
    return (
        <>
            <Button
                onClick={() => setShow(true)}
                variant="primary"
            >
                Add User
            </Button>
            <AddUserPopUp
                show={show}
                setShow={setShow}
            />
        </>
    );
};

export { AddUserBtn };