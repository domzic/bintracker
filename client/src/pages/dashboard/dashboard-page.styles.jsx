import styled from 'styled-components';

export const PageContainer = styled.div`
    height: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const PageHeading = styled.div`
    display: flex;
    height: 100px;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
`;

export const ActionsTitle = styled.div`
    font-size: 24px;
    color: grey;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 25px;
`;

export const MainContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const MapContainer = styled.div`
    padding: 15px;
    max-width: 80%;
    flex: 1;
`;