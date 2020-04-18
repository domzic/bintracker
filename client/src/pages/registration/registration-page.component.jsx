import React, {useEffect, useState} from 'react';

import SignInForm from '../../components/signin-form/signin-form.component';
import CompanyForm from '../../components/company-form/company-form.component';

import {
    PageContainer
} from './registration-page.styles';

const RegistrationPage = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    
    useEffect(() => {
        if (new URL(window.location.href).searchParams.get("authorized")) {
            setError('This email is not yet registered.');
        }
        if (new URL(window.location.href).searchParams.get("success")) {
            setSuccess('You can now login.');
        }
    }, []);
    
    return (
        <PageContainer>
            <SignInForm text={success} error={error}/>
            <CompanyForm showAdminField={true}/>
        </PageContainer>
    );
};

export default RegistrationPage;
