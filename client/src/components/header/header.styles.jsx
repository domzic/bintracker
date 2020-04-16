import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
    width: 100%;
    height: 100px;
    background: rgba(0, 0, 0, .5);
`;
export const HeaderContent = styled.div`
    height: 100%;
    max-width: 1080px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
`;

export const Navigation = styled.div`
    align-self: flex-end;
    height: 100%;

    display: flex;
    align-items: center;
`;

export const Option = styled(Link)`
    min-width: 50px;
    padding: 15px;
    margin: 0 10px;
    text-decoration: none;
    border-radius: 5px;
    color: #fff;
    letter-spacing: 2px;
    text-transform: uppercase;
    transition: all .2s;

    &:hover {
        background: rgba(0, 0, 0, .2);
    }

    &:active {
        transform: scale(0.8);
    }
`;

export const DropdownOption = styled(Link)`
    text-decoration: none;
    padding: 15px;
    margin: 0 10px;
    border-radius: 5px;
    letter-spacing: 2px;
    text-transform: uppercase;
    transition: all .2s;
    color: #026E1B;
`;

export const Logo = styled.img`
    height: 100%;
`;
