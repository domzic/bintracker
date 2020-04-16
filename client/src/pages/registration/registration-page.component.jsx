import React, {useEffect, useState} from 'react';

import SignInForm from '../../components/signin-form/signin-form.component';
import CompanyForm from '../../components/company-form/company-form.component';

import {
    PageContainer
} from './registration-page.styles';

const RegistrationPage = () => {
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (new URL(window.location.href).searchParams.get("authorized")) {
            setError('This email is not yet registered.');
        }
    }, []);
    
    return (
        <PageContainer>
            <SignInForm error={error}/>
            <CompanyForm />
        </PageContainer>
    );
};

export default RegistrationPage;
