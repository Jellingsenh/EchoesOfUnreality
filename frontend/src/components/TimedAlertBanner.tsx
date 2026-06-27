import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import type { SnackbarCloseReason } from "@mui/material/Snackbar";
import Snackbar from "@mui/material/Snackbar";
import type { SyntheticEvent } from "react";
import type { bannerAlertType } from "../resources/constants";

export default function TimedAlertBanner({
    bannerOpen,
    setBannerOpen,
    alertContent,
    alertType,
}:{
    bannerOpen: boolean,
    setBannerOpen: React.Dispatch<React.SetStateAction<boolean>>,
    alertContent: string | null,
    alertType:bannerAlertType,
}) {
    if (!alertContent) return <></>
    
    const handleClose = (
        _event: SyntheticEvent | Event, // underscore represent intentionally unused
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
        return;
        }
        setBannerOpen(false);
    };

    const action = (
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
    );

    return (
        <div>
        <Snackbar
            open={bannerOpen}
            autoHideDuration={3500} // 3.5 seconds
            onClose={handleClose}
            // message="Note archived"
            action={action}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={handleClose}
                severity={alertType}
                variant="standard"
                sx={{ width: '100%' }}
            >
                {alertContent}
            </Alert>
        </Snackbar>
        </div>
    );
}
