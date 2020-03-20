import React, {useContext, useEffect, useMemo, useState} from 'react';
import EmployeesList from '../../components/employees-list/employees-list.component';
import { UserContext } from '../../contexts/user.context';
import { CompanyContext } from "../../contexts/company.context";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

import {
    PageContainer
} from './profile-page.styles';
import axios from "axios";

const EmployeesWithSpinner = WithSpinner(EmployeesList);

const ProfilePage = () => {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [ company, setCompany ] = useState(null);

    const providerValue = useMemo(() => ({company, setCompany}), [company, setCompany]);



    useEffect( () => {
        const fetchCompanyData = async () => {
            const response = await axios.get("/api/company/");
            setCompany(response.data);
            console.log('Company: ',response.data);
            setLoading(false);
        };

        fetchCompanyData();
    }, []);

    return (
        <PageContainer>
            {user.isAdmin ?
                <CompanyContext.Provider value={providerValue}>
                    <EmployeesWithSpinner isLoading={loading}/>
                </CompanyContext.Provider>
                :
                {}
            }
            <h3>Hello {user.displayName}!</h3>
        </PageContainer>
    );
};

export default ProfilePage;
