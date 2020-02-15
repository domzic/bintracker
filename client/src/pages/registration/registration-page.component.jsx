import React from 'react';

import SignInForm from '../../components/signin-form/signin-form.component';
import CompanyForm from '../../components/company-form/company-form.component';

import {
    PageContainer
} from './registration-page.styles';

const RegistrationPage = () => (
    <PageContainer>
        <SignInForm />
        <CompanyForm />
    </PageContainer>
);

export default RegistrationPage;