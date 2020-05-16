import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    min-width: 350px;
    padding: 10px;
    max-height: 50vh;
    justify-content: space-around;
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

export const Row = styled.div`
    margin-bottom: 20px;
    height: 64px;
    position: relative;
`;
