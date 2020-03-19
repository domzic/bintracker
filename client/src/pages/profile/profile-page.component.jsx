import React, { useContext } from 'react';
import EmployeesList from '../../components/employees-list/employees-list.component';

import { UserContext } from '../../contexts/user.context';

import {
    PageContainer
} from './profile-page.styles';

const ProfilePage = () => {
    const { user } = useContext(UserContext);
    return (
        <PageContainer>
            <EmployeesList/>
            <h3>Hello {user.displayName}!</h3>
        </PageContainer>
    );
};

export default ProfilePage;
