import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #424242;
    padding: 12px;
    border-radius: 4px;
    flex-grow: 1;
    width: 100%;
    @media (min-width: 768px) {
        max-width: 475px;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-between;
`;

export const Title = styled.span`
    letter-spacing: 2px;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 200;
    margin-bottom: 20px;
`;

export const TextFieldLabel = styled.span`
    color: 'red';
`;

export const Row = styled.div`
    margin-bottom: 20px;
    height: 64px;
`;
