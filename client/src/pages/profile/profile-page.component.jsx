import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import EmployeesList from '../../components/employees-list/employees-list.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import {PageContainer, Body, CompanyTitle} from './profile-page.styles';
import EmployeeForm from '../../components/employee-form/employee-form.component';
import { Context } from '../../state/store';
import { Actions } from '../../state/constants';
import UserForm from "../../components/user-form/user-form.component";

const EmployeesWithSpinner = WithSpinner(EmployeesList);

const ProfilePage = () => {
    const [state, dispatch] = useContext(Context);
    const { user, company } = state;

    const [loading, setLoading] = useState(company == null);

    useEffect(() => {
        const fetchCompanyData = async () => {
            const response = await axios.get('/api/company');
            dispatch({ type: Actions.SET_COMPANY, payload: response.data });
            setLoading(false);
        };

        if (user.isAdmin && company === null) {
            fetchCompanyData();
        }
    }, []);

    return (
        <PageContainer>
            {user.isAdmin ? (
                <Body>
                    <CompanyTitle>
                        {company !== null ? `${company.name}'s employees management` : ''}
                    </CompanyTitle>
                    <EmployeeForm />
                    <EmployeesWithSpinner isLoading={loading} />
                </Body>
            ) : null}
            <UserForm/>
        </PageContainer>
    );
};

export default ProfilePage;
