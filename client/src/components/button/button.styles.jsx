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
    font-family: 'Open Sans Condensed';
    font-weight: bolder;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;

    &:hover {
        background-color: ${props => props.theme.hBackgroundColor};
        color: black;
        border: ${props => props.theme.hBorder}
    }
`;

Button.defaultProps = {
    theme: {
        hBorder: '1px solid black',
        backgroundColor: 'black',
        hBackgroundColor: 'white',
    }
}