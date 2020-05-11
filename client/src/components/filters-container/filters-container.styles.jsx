import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
`;

export const Text = styled.span`
    font-size: 14px;
    text-transform: uppercase;
    margin-right: 20px;
    letter-spacing: 1px;
    color: #fff;
    margin: 12px 0;
    padding-left: 4px;
    font-size: 14px;
`;

export const Filter = styled.div`
    font-size: 14px;
    position: relative;
    cursor: pointer;
    height: 18px;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    transition: all .2s;
    
    &:not(:last-of-type) {
        margin-right: 4px;
    }
`;

export const Filters = styled.div`
    display: flex;
`;

export const Count = styled.span`
    color: #fff;
    font-size: 14px;
    font-weight: 200;
    transition: all .2s;
    letter-spacing: 2px;
`;
