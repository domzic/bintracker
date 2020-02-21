import React from 'react';

import Filter from '../filter/filter.component';

import {
    Container
} from './filters-container.styles';

const FiltersContainer = () => {
    return (
        <Container>
            <Filter>By sensor levels</Filter>
            <Filter>By something else</Filter>
            <Filter>Third filter</Filter>
        </Container>
    );
}

export default FiltersContainer;