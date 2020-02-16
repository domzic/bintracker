import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../button/button.component';

import {
    Headline,
    FormContainer,
    Buttons
} from './signin-form.styles';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.googleButtonTheme = {
            hBorder: 'none',
            backgroundColor: '#4285f4',
            hBackgroundColor: '#357ae8'
        };
    }

    signInWithGoogle = event => {
        window.location.href = "/auth/google";
    }

    render() {
        return (
            <FormContainer>
                <Headline>Are you already registered within your company?</Headline>
                <CustomButton theme={this.googleButtonTheme} onClick={this.signInWithGoogle}>
                    Sign in with Google
                </CustomButton>
            </FormContainer>
        )
    }
}

export default SignIn;