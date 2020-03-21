import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import EmployeesList from '../../components/employees-list/employees-list.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { PageContainer, Body } from './profile-page.styles';
import EmployeeForm from '../../components/employee-form/employee-form.component';
import { Context } from '../../state/store';

const EmployeesWithSpinner = WithSpinner(EmployeesList);

const ProfilePage = () => {

    const [state, dispatch] = useContext(Context);
    const { user, company } = state;

    const [loading, setLoading] = useState(company == null);

    useEffect(() => {
        const fetchCompanyData = async () => {
            const response = await axios.get('/api/company');
            dispatch({ type: 'SET_COMPANY', payload: response.data });
            setLoading(false);
        };

        if (user.isAdmin && company == null) {
            fetchCompanyData();
        }
    }, [company, dispatch, user]);

    return (
        <PageContainer>
        {user.isAdmin ? (
            <Body>
                  <EmployeesWithSpinner isLoading={loading} />
                  <EmployeeForm />
                </Body>
            ) : {}}
      </PageContainer>
    );
};

export default ProfilePage;
