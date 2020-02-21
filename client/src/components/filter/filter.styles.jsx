import styled from 'styled-components';

export const Container = styled.div`
    padding: 15px;
    font-size: 18px;
    border: 1px solid black;

    &:not(:last-of-type) {
        margin-right: 20px;
    }
`;