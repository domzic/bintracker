import styled from 'styled-components';

export const PageContainer = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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

export const Tabs = styled.div`
    margin: 24px 0;
    display: flex;
    justify-content: center;
`;

export const Tab = styled.button`
    background: transparent;
    color: grey;
    border: none;
    outline: none;
    margin: 0 25px;
    font-size: 16px;
    text-transform: uppercase;
    transition: all .2s;
    cursor: pointer;
    position: relative;
    transform: translateZ(0);
    
    &:before {
        content: "";
        position: absolute;
        z-index: -1;
        left: 50%;
        right: 50%;
        top: 150%;
        background: #D2FFBE;
        height: 4px;
        transition-property: left right;
        transition-duration: 0.3s;
        transition-timing-function: ease-out;
    }
    
    &:hover:before {
        left: 0;
        right: 0;
    }
    
    &.active {
        color: #FFFFFF;
        cursor: default;
        
        &:before {
            left: 0;
            right: 0;
        }
    }
`;

export const Body = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 500px;
    margin-top: 48px;
`;
export const CompanyTitle = styled.div`
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 15px 0;
    font-weight: 200;
    font-size: 22px;
`;
