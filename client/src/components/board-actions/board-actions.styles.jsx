import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    margin-right: 50px;
`;

export const Option = styled.div`
    margin-bottom: 25px;
    box-shadow: 0px 5px 20px 0px rgba(0,0,0,0.5);
    transition: all .2s;
    
    &:hover {
        transform: scale(1.05) translateX(25px);
    }
`;
