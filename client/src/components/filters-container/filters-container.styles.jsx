import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 10px;
    flex: 1;
`;

export const Text = styled.span`
    font-size: 16px;
    text-transform: uppercase;
    margin-right: 20px;
    letter-spacing: 1px;
`;

export const Filter = styled.div`
    font-size: 18px;
    position: relative;
    cursor: pointer;
    width: 33%;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    transition: all .2s;
    
    &:not(:last-of-type) {
        margin-right: 12px;
    }
`;

export const Count = styled.span`
    color: #fff;
    font-size: 12px;
    font-weight: 200;
    transition: all .2s;
    letter-spacing: 2px;
`;
