import styled from 'styled-components';

export const Button = styled.button`
    min-width: 165px;
    width: auto;
    height: 50px;
    letter-spacing: 0.5px;
    line-height: 50px;
    padding: 0 35px 0 35px;
    font-size: 15px;
    background-color: ${props => props.theme.backgroundColor};
    color: white;
    text-transform: uppercase;
    font-weight: bolder;
    border: none;
    display: flex;
    justify-content: center;
    border-radius: 3px;
    transition: all .2s;
    cursor: pointer;

    &:hover:not(&:disabled) {
        background-color: ${props => props.theme.hBackgroundColor};
        color: black;
        border: ${props => props.theme.hBorder}
    }

    &:active {
        transform: scale(0.8);
    }

    &:focus {
        outline: none;
    }

    &:disabled {
        background-color: grey;
        cursor: default;
    }
`;

Button.defaultProps = {
    theme: {
        hBorder: '1px solid black',
        backgroundColor: 'black',
        hBackgroundColor: 'white',
    }
}