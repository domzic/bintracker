import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
    Button
} from './button.styles';

class CustomButton extends React.Component {
    render() {
        const {
            theme,
            children,
            ...otherProps
        } = this.props;
        return theme ? (
            <ThemeProvider theme={theme}>
                <Button {...otherProps}>
                    {children}
                </Button>
            </ThemeProvider>
            
        ) : (
            <Button {...otherProps}>
                {children}
            </Button>
        )
    }
}

export default CustomButton;