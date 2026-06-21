import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import type { JSX } from "react";

export default function ViewLocationModal({
    modalHidden,
    modalOnClose,
    modalTitle,
    modalContent,
    modalFooter,
}:{
    modalHidden: boolean,
    modalOnClose: () => void,
    modalTitle: JSX.Element | null,
    modalContent: JSX.Element,
    modalFooter: JSX.Element | null,
}) {

    return <Dialog 
        open={!modalHidden} 
        onClose={modalOnClose} 
        fullWidth 
        maxWidth={false}
        sx={{
            "& .MuiDialog-container": {
            alignItems: "flex-start", // Aligns the dialog to the top
            },
            '& .MuiPaper-root': {
                backgroundColor: '#828080',
            },
        }}
        slotProps={{ 
            paper: { 
                sx: { 
                    width: '90vw', 
                    minHeight: '200px',
                    maxHeight: '80vh',
                    marginTop: '12vh',
                } 
            } 
    }}>
        {(modalTitle != null) && <DialogTitle sx={{ 
            paddingX: '20px',
            paddingTop: '15px',
            marginBottom: '-20px',
        }}>
            {modalTitle}
        </DialogTitle>}
        <DialogContent className='no-scrollbar' sx={{ 
            mt: 2,
            paddingX: '0px',
            marginX: '20px',
        }}>
            {modalContent}
        </DialogContent>
        {(modalFooter != null) && <DialogActions>{modalFooter}</DialogActions>}
    </Dialog>
}