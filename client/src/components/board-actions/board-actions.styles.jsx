import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    
    @media (min-width: 768px) {
        margin-right: 50px;
    }
`;
