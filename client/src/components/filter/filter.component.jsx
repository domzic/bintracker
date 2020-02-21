import React from 'react';

import {
    Container
} from './filter.styles';

const Filter = ( { children }) => {
    return (
        <Container>
            {children}
        </Container>
    );
}

export default Filter;