import styled from 'styled-components';

export const PageContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #000;
    position: relative;
`;

export const Click = styled.span`
    font-weight: bold;
    cursor: pointer;
    
    &:hover {
        text-decoration: underline;
    }
`;
