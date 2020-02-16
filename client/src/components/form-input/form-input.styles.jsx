import styled from 'styled-components';

export const Group = styled.div`
    position: relative;
    margin-bottom: 20px;
`;

export const Label = styled.label`
        color: grey;
        font-size: 16px;
        font-weight: normal;
        position: absolute;
        pointer-events: none;
        left: 5px;
        top: 5px;
        transition: 300ms ease all;
`;

export const Input = styled.input`
    background: none;
    background-color: white;
    color: $grey;
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 3px;
    border-bottom: 1px solid grey;
    margin: 25px 0;

    &:focus {
        outline: none;
    }

    &:focus + ${Label} {
        top: 0;
        left: 0;
        font-size: 12px;
        color: black;
    }
`;

export const ErrorMessage = styled.span` 
    display: block;
    color: red;
    margin-top: -20px;
    font-size: 12px;
`;