import React, {useContext, forwardRef, useState} from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { Context } from '../../state/store';
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { tableIcons } from '../employees-list/employees-list.component';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ContainersList = () => {

    const { containers } = useContext(Context)[0];
    const [dialogState, setDialogState] = useState({ opened: false, selected: null });

    const handleClose = () => {
        setDialogState( { selected: null, opened: false })
    };

    const tableData = {
        columns: [
            { title: 'Device id', field: 'ttnDeviceId' },
            { title: 'Latitude', field: 'latitude' },
            { title: 'Longitude', field: 'longitude' },
            { title: 'Current level', field: 'level' },
            { title: 'Times serviced', field: 'timesServiced' }
        ],
        data: containers.green
            .concat(containers.yellow)
            .concat(containers.red)
    };

    const onConfirm = () => {
        axios.delete('/api/container', { data: { ttnDeviceId: dialogState.selected } })
            .then(() => window.location.reload());
    };

    return (
        <div style={{ width: '100%' }}>
            <MaterialTable
                title="Containers"
                columns={tableData.columns}
                data={tableData.data}
                icons={tableIcons}
                actions={[
                    {
                        icon: DeleteOutline,
                        tooltip: 'Delete Container',
                        onClick: (event, container) => setDialogState({ selected: container.ttnDeviceId, opened: true})
                    }
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
                <DialogTitle id="alert-dialog-slide-title">{"Confirmation"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this container? You won't be able to undo this action.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ContainersList;
