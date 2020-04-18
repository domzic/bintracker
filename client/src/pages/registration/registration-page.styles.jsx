import styled from 'styled-components';

export const PageContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;
