import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 48px;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    min-width: 350px;
    padding: 10px;
    height: 50vh;
    justify-content: space-around;
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

export const Title = styled.span`
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 200;
`;

