import styled, {keyframes} from 'styled-components';

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

export const PageContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Header = styled.span`
    padding-left: 5px;
    margin: 36px 0;
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
    margin-bottom: 36px;
    animation: ${loading} .3s linear;
`;

export const StatCards = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #424242;
    padding: 24px;
    border-radius: 4px;
    width: 100%;
    & > *:not(:last-child) {
        margin: 0 0 24px 0;
    }
    
    @media (min-width: 768px) {
        flex-direction: row;
        
        & > *:not(:last-child) {
            margin: 0 24px 0 0;
        }
    }
`;

export const DoughnutWrapper = styled.div`
    align-self: flex-end;
    background-color: #424242;
    padding: 10px;
    border-radius: 5px;
    width: 80%;
    height: 80%;
`;

export const BarWrapper = styled.div`
    width: 100%;
    background-color: #424242;
    padding: 10px;
    border-radius: 5px;
`;

export const Main = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    
    @media (min-width: 768px) {
        flex-direction: row;
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 5px;
    margin-right: 24px;
    width: 100%;
    
    @media (min-width: 768px) {
        width: 33%;
        background-color: #424242;
    }
`;

export const View = styled.div`
    height: 500px;
    background-color: #424242;
    padding: 10px;
    border-radius: 5px;
    flex-grow: 1;
    display: flex;
    justify-content: center;
`;

export const Selection = styled.div`
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 2px;
    margin-bottom: 36px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    border: 1px solid #323232;
    border-radius: 4px;
    animation: ${loading} .3s linear;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    
    &:before {
        content: "";
        position: absolute;
        left: 0;
        right: 100%;
        top: 0;
        background-image: linear-gradient(to right, #141414, #323232);
        height: 100%;
        transition-property: left right;
        transition-duration: 0.5s;
        transition-timing-function: ease-out;
        mix-blend-mode: difference;
    }

    &:not(.active):hover:before {
        right: 0;
    }
    
    &.active {
        cursor: default;
        
        &:before {
            background-image: linear-gradient(to right, #141414, #323232);
            right: 0;
        }
    }
`;
