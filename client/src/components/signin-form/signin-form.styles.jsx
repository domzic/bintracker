import styled from 'styled-components';

export const Headline = styled.h2`
    margin-bottom: 24px;
    font-size: 18px;
    text-align: center;
    
    @media (min-width: 768px) {
        font-size: 24px;
    }
`;

export const FormContainer = styled.div`
    width: 100%;
    height: 240px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding-right: 20px;
        background-color: #333;
    padding: 12px;
    border-radius: 4px;
    margin-bottom: 16px;
    
    @media (min-width: 768px) {
        width: 380px;
        margin: 0 8px 0 0;
    }
`;

export const Error = styled.span`
    color: #FFAAAA;
    text-align: center;
    text-transform: uppercase;
    font-weight: 500;
    margin: 25px 0;
`;
