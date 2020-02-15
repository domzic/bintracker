import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../button/button.component';

import {
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
                <h2>Are you already registered within your company?</h2><br></br>
                <span>Sign in with your google account</span>
                <CustomButton theme={this.googleButtonTheme} onClick={this.signInWithGoogle}>
                    Sign in with Google
                </CustomButton>
            </FormContainer>
        )
    }
}

export default SignIn;