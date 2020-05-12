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
    flex-basis: 75%;
    flex-shrink: 0;
    position: relative;
    
    @media (min-width: 768px) {
        height: 70vh;
    }
`;

export const Right = styled.div`
    display: flex;
    flex: 1;
    margin-top: 12px;
    border-radius: 4px;
    flex-direction: column;
    background-color: #424242;
    
    @media (min-width: 768px) {
        margin-top: 0;
        margin-left: 12px;
    }
`;
