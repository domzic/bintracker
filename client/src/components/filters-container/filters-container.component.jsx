import React, { useContext } from 'react';

import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';

import { Container, Text, Filter, Count } from './filters-container.styles';
import { green, yellow, red } from "@material-ui/core/colors";
import { Context } from "../../state/store";

const FiltersContainer = () => {

    const { containers } = useContext(Context)[0];
    let greenCount = 0;
    let yellowCount = 0;
    let redCount = 0;
    containers.forEach(container => {
        if (container.level < 50) {
            greenCount++;
        } else if (container.level < 80) {
            yellowCount++;
        } else {
            redCount++;
        }
    });

    return (
        <Container>
            <Text>Filter by level:</Text>
            <Filter type="green"><RestoreFromTrashIcon fontSize="large" style={{ color: green[500] }}/><Count>{greenCount}</Count></Filter>
            <Filter type="yellow"><RestoreFromTrashIcon fontSize="large" style={{ color: yellow[500] }}/><Count>{yellowCount}</Count></Filter>
            <Filter type="red"><RestoreFromTrashIcon fontSize="large" style={{ color: red[500] }}/><Count>{redCount}</Count></Filter>
        </Container>
    );
};

export default FiltersContainer;
