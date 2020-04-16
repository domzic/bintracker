import React from 'react';
import CustomButton from '../button/button.component';

import { Headline,
    FormContainer,
    Error } from './signin-form.styles';

const SignInForm = ({ error }) => {

    const googleButtonTheme = {
        hBorder: 'none',
        backgroundColor: '#4285f4',
        hBackgroundColor: '#357ae8'
    };
    
    const signInWithGoogle = () => {
        window.location.href = '/api/auth/google';
    };

    return (
        <FormContainer>
            {error ? <Error>{error}</Error> : null}
            <Headline>Are you already registered within your company?</Headline>
            <CustomButton theme={googleButtonTheme} onClick={signInWithGoogle}>
            Sign in with Google
            </CustomButton>
      </FormContainer>
    );
};

export default SignInForm;
