import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ModalComponent = ({ noCancel, onAction, title,text, open }) => (
    <div className={"modal-component"}>
        <Dialog
            open={open}
            onClose={noCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle color="#0e5173" id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {text}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={noCancel} color="primary">
                    cancel
            </Button>
                <Button onClick={()=>onAction()} color="secondary" autoFocus>
                    ok
            </Button>
            </DialogActions>
        </Dialog>

    </div>
);

export default ModalComponent;
