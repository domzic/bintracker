import styled from 'styled-components';

export const PageContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

export const Header = styled.span`
    font-weight: 800;
    color: #fff;
    font-size: 20px;
    letter-spacing: 2px;
    text-transform: uppercase;
    align-self: flex-start;
`;

export const CardsList = styled.div`
    display: flex;
    align-self: flex-start;
    
    & > * {
        margin-right: 20px;
    }
`;
