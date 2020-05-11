import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-direction: column;
    
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

export const MapWrapper = styled.div`
    flex-basis: 80%;
    flex-shrink: 0;
    position: relative;
    
    @media (min-width: 768px) {
        height: 70vh;
    }
`;

export const Right = styled.div`
    display: flex;
    padding: 2px;
    flex-direction: column;
    background-color: #424242
`;
