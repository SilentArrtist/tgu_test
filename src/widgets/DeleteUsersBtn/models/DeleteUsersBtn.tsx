import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { DeleteUsersPopUp } from '../../../features';
const DeleteUsersBtn = () => {

    const [show, setShow] = useState(false)
    return (
        <>
            <Button
                onClick={() => setShow(true)}
                variant="danger"
            >
                Delete
            </Button>
            <DeleteUsersPopUp
                show={show}
                setShow={setShow}
            />
        </>
    );
};

export { DeleteUsersBtn };