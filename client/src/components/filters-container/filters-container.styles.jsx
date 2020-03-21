import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;
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
    transition: all .2s;
    
    &:not(:last-of-type) {
        margin-right: 12px;
    }
    
    &:hover {
        transform: scale(1.05);
    }
`;

export const Count = styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    color: #454646;
    font-size: 16px;
`;
