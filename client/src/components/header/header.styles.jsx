import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.div`
    width: 100%;
    background: orangered;
`;
export const HeaderContent = styled.div`
    height: 70px;
    max-width: 1080px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
`;

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;
`;

export const Navigation = styled.div`
    align-self: flex-end;
    height: 100%;
`;

export const Option = styled(Link)`
    padding: 10px;
`;