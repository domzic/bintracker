import styled from 'styled-components';

export const PageContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    & > *:not(:last-child) {
        margin-bottom: 50px;
    }
`;

export const Header = styled.span`
    margin-top: 50px;
    font-weight: 800;
    color: #D2FFBE;
    font-size: 20px;
    letter-spacing: 2px;
    text-transform: uppercase;
    align-self: flex-start;
`;

export const TopStats = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

export const StatCards = styled.div`
    display: flex;
    
    & > *:not(:last-child) {
        margin-right: 20px;
    }
`;

export const DoughnutWrapper = styled.div`
    align-self: flex-end;
`;

export const BarWrapper = styled.div`
    width: 100%;
`;
