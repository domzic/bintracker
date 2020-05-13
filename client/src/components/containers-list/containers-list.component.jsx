import React, { useContext, forwardRef, useState } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { Context } from '../../state/store';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { tableIcons } from '../employees-list/employees-list.component';
import { makeStyles } from '@material-ui/core/styles';
import { useFormButtonStyles } from '../utils/mui-styles';
import ContainerForm from "../container-form/container-form.component";
import Modal from "../modal/modal.component";
import AddIcon from '@material-ui/icons/Add';
import {Actions} from "../../state/constants";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ContainersList = () => {
    const buttonClasses = useFormButtonStyles();
    const { containers } = useContext(Context)[0];
    const [dialogState, setDialogState] = useState({
        opened: false,
        selected: null,
    });
    const [state, dispatch] = useContext(Context);

    const handleClose = () => {
        setDialogState({ selected: null, opened: false });
    };

    const tableData = {
        columns: [
            { title: 'Device id', field: 'ttnDeviceId' },
            { title: 'Address', field: 'address' },
            { title: 'Level, %', field: 'level' },
            { title: 'Height, cm', field: 'height' },
            { title: 'Times serviced', field: 'timesServiced' },
        ],
        data: containers.green.concat(containers.yellow).concat(containers.red),
    };

    const onConfirm = () => {
        axios
            .delete('/api/container', {
                data: { ttnDeviceId: dialogState.selected },
            })
            .then(() => window.location.reload());
    };
    
    const onRowClick = (event, rowData, togglePannel) => {
        dispatch({ type: Actions.SET_ACTIVE_MARKER, payload: rowData._id });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div style={{ width: '100%', marginTop: 12 }}>
    
            <Modal
                icon={<AddIcon/>}
                title="Add container"
                position={{ top: 50, left: 50 }}
                tooltipText="Add container"
            >
                <ContainerForm />
            </Modal>
            <MaterialTable
                title="Containers"
                onRowClick={onRowClick}
                columns={tableData.columns}
                data={tableData.data}
                icons={tableIcons}
                actions={[
                    {
                        icon: DeleteOutline,
                        tooltip: 'Delete Container',
                        onClick: (event, container) =>
                            setDialogState({
                                selected: container.ttnDeviceId,
                                opened: true,
                            }),
                    },
                ]}
            />
            <Dialog
                open={dialogState.opened}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {'Confirmation'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this container? You
                        won't be able to undo this action.
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ justifyContent: 'space-between' }}>
                    <Button
                        classes={makeStyles({
                            root: {
                                borderColor: '#FFAAAA',

                                '&:hover': {
                                    borderColor: '#FF5D5D',
                                },
                            },
                            label: {
                                color: '#fff',
                                '&:hover': {
                                    color: '#FFAAAA',
                                },
                            },
                        })()}
                        onClick={handleClose}
                        variant="outlined"
                        color="primary"
                        className="cancel"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        classes={buttonClasses}
                        variant="outlined"
                        color="primary"
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ContainersList;
