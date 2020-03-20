import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-basis: 60%;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    border: 1px solid #015408;
    min-width: 250px;
    padding: 10px;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

export const Error = styled.div`
    color: red;
    font-size: 12px;
    margin-top: 5px;
    font-style: italic;
`;

export const Label = styled.label`
    text-transform: uppercase;
    color: #015408;
    font-size: 16px;
    margin-bottom: 5px;
    text-align: center;
`;
