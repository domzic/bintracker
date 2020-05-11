import styled, {keyframes} from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
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
    padding: 0 16px;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 2px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    color: #fff;
    
    &:before {
        content: "";
        position: absolute;
        top: 100%;
        bottom: 0;
        left: 0;
        background-image: linear-gradient(to top, #7C7C7C, #595959);
        width: 100%;
        transition-property: bottom top;
        transition-duration: 0.2s;
        transition-timing-function: ease-out;
        mix-blend-mode: hard-light;
    }

    &:not(.active):hover:before {
        top: 0;
    }
    
    &:not(.active):hover {
        color: #A5DDA5;
    }
    
    &.active {
        cursor: default;
        
        &:before {
            background-image: linear-gradient(to top, #141414, #323232);
            top: 0;
        }
    }
`;
