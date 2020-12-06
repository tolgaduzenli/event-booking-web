import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    id="close"
                    name="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export default function CustomDialog(props) {
    const { open, handleClose, modalTitle, children, maxWidth } = props;
    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby={modalTitle}
            id={`${modalTitle}-dialog`}
            open={open}
            maxWidth={maxWidth}
            disableBackdropClick
        >
            <DialogTitle id={`${modalTitle}-dialogTitle`} onClose={handleClose}>
                {modalTitle}
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
        </Dialog>
    );
}
CustomDialog.defaultProps = {
    maxWidth: "sm",
};
CustomDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    modalTitle: PropTypes.string.isRequired,
    maxWidth: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
    children: PropTypes.node,
};
