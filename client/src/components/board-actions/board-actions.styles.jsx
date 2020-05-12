import styled, {keyframes} from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 16px;
    top: 16px;
    z-index: 100;
`;

const loading = keyframes`
    0% {
        width: 50%;
        opacity: 0;
    }
    100% {
        width: 100%;
        opacity: 1;
    }
`;

export const Selection = styled.div`
    margin-bottom: 8px;
`;

export const Top = styled.div`
    display: flex;
`;
