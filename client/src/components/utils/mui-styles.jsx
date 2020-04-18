import { makeStyles } from '@material-ui/core/styles';

export const useFormButtonStyles = makeStyles({
    root: {
        borderColor: '#D2FFBE',
        '&:hover': {
            borderColor: '#607A2E',
        },
    },
    label: {
        color: '#fff',
        '&:hover': {
            color: '#D2FFBE',
        },
    },
});

export const useTextFieldStyles = makeStyles({
    input: {
        color: '#C8C8C8',
    },
    underline: {
        '&:before': {
            borderBottom: '1px solid #000',
        },
        '&:after': {
            borderBottom: `2px solid #D2FFBE`,
        },
        '&:hover:before': {
            borderBottom: `2px solid #D2FFBE`,
        },
    },
    error: {
        '&:before': {
            borderBottom: '1px solid #FFAAAA',
        },
        '&:after': {
            borderBottom: `2px solid #FFAAAA`,
        },
        '&:hover:before': {
            borderBottom: `2px solid #FFAAAA`,
        },
    }
});
