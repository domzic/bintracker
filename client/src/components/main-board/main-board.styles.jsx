import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    flex-direction: column-reverse;
    
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

export const MapWrapper = styled.div`
    flex-basis: 70%;
    position: relative;
    
    @media (min-width: 768px) {
        height: 80vh;
    }
`;
