import styled from 'styled-components';

export const Headline = styled.h2`
    margin-bottom: 30px;
    text-align: center;
    font-size: 18px;
    font-weight: 200;
    text-transform: uppercase;
    letter-spacing: 2px;
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    background-color: #424242;
    padding: 12px;
    border-radius: 4px;
    height: 500px;
    width: 100%;
    @media (min-width: 768px) {
        max-width: 475px;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
`;

export const FormError = styled.div`
    color: #FFAAAA;
    margin-top: 4px;
    font-size: 14px;
`;

export const Row = styled.div`
    margin-bottom: 20px;
    height: 64px;
`;
