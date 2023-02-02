import React, { useEffect, useState } from 'react';
import { Card, CardGroup } from 'react-bootstrap';
import { useTypedSelector } from '../../../app/hooks/useTypedSelector';
import { IUser } from '../../../shared/types';
import { GridLayout, UserItem } from '../../../features';

const UsersList = () => {
    const [sortedUsers, setSortedUsers] = useState<IUser[]>([]);
    const users = useTypedSelector(state => state.users.users);
    useEffect(() => {
        const usersArr = [...users].sort(function (a, b) {
            return +b.createDate - +a.createDate;
        })
        setSortedUsers(usersArr);
    }, [users])

    return (
        <GridLayout colCount={4} md={3}>
            {
                sortedUsers.map((element: IUser) => (
                    <UserItem user={element} key={element.id} />
                ))
            }
        </GridLayout>
    );
};

export { UsersList };