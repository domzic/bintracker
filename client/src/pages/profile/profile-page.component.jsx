import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import EmployeesList from '../../components/employees-list/employees-list.component';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { Body, Header, PageContainer, Tabs, Tab } from './profile-page.styles';
import EmployeeForm from '../../components/employee-form/employee-form.component';
import { Context } from '../../state/store';
import { Actions } from '../../state/constants';
import UserForm from "../../components/user-form/user-form.component";
import CompanyForm from "../../components/company-form/company-form.component";

const EmployeesWithSpinner = WithSpinner(EmployeesList);

const ActiveTab = {
    COMPANY: 'company',
    EMPLOYEES: 'employees',
    PROFILE: 'profile',
};

const ProfilePage = () => {
    const [state, dispatch] = useContext(Context);
    const { user, company } = state;

    const [loading, setLoading] = useState(company == null);
    const [activeTab, setActiveTab] = useState(ActiveTab.PROFILE);

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

    const handleTabClick = e =>  {
        setActiveTab(e.target.getAttribute('data-tabname'));
    };

    const isActive = tab => (tab === activeTab ? 'active' : '');
    
    const renderComponent = () => {
        switch (activeTab) {
            case ActiveTab.PROFILE:
                return <UserForm/>;
            case ActiveTab.COMPANY:
                return <CompanyForm title="Update your company" showAdminField={false}/>;
            case ActiveTab.EMPLOYEES:
                return  (
                    <div>
                        <EmployeesWithSpinner/>
                        <EmployeeForm/>
                    </div>
                );
        }
    };

    return (
        <PageContainer>
            <Header>Account Management</Header>
            <Tabs>
                <Tab
                    data-tabname={ActiveTab.PROFILE}
                    className={isActive(ActiveTab.PROFILE)}
                    onClick={handleTabClick}
                >
                    Profile
                </Tab>
                {user.isAdmin ? (
                    <Tab
                        data-tabname={ActiveTab.COMPANY}
                        className={isActive(ActiveTab.COMPANY)}
                        onClick={handleTabClick}
                    >
                        Company
                    </Tab>
                ) : null}
                {user.isAdmin ? (
                    <Tab
                        data-tabname={ActiveTab.EMPLOYEES}
                        className={isActive(ActiveTab.EMPLOYEES)}
                        onClick={handleTabClick}
                    >
                        Employees
                    </Tab>
                ) : null}
            </Tabs>
                <Body>
                    {renderComponent()}
                </Body>
        </PageContainer>
    );
};

export default ProfilePage;
