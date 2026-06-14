import type { JSX } from "react";
import { baseWebUrl } from "../../resources/constants";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";

export default function WebPage({
    backButton,
    modal,
    modalTitle,
    modalHidden,
    modalFooter,
    modalOnClose,
    secondaryModal,
    title,
    content,
    footer
}:{
    backButton: JSX.Element,
    modal: JSX.Element | null,
    modalTitle: JSX.Element | null,
    modalHidden: boolean | null,
    modalFooter: JSX.Element | null,
    modalOnClose?: () => void | null,
    secondaryModal: JSX.Element | null,
    title: JSX.Element,
    content: JSX.Element | null,
    footer: JSX.Element | null
}) { 
    return (<div style={{ 
        // border: '1px solid red',
        background: 'darkgrey', 
        padding: '60px' ,
    }}>
        {/* TOP BANNER */}
        <div style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                position: 'fixed', 
                top: '0%',
                left: '0%',
                padding: '15px',
                zIndex: 200,
                background: 'slategrey', 
                width: '100%' 
                }}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '15px', placeItems: 'center' }}>
                <a href={baseWebUrl}>Home</a>
                {backButton}
            </div>
            <a href={baseWebUrl + "/routes/account"} style={{transform: 'translate(-60%, 0%)'}}>Account</a>
        </div>
        
        {/* HIDDEN MODAL */}
        <Dialog 
            open={!modalHidden} 
            onClose={modalOnClose} 
            fullWidth 
            maxWidth={false}
            sx={{
                "& .MuiDialog-container": {
                alignItems: "flex-start", // Aligns the dialog to the top
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
                {modal}
            </DialogContent>
            {(modalFooter != null) && <DialogActions>{modalFooter}</DialogActions>}
        </Dialog>

        {/* Secondary MODAL */}
        {secondaryModal}

        {/* PAGE TITLE */}
        <div style={{ 
                display: 'flex', 
                justifyContent: 'center',
                position: 'fixed',
                left: '50%',
                top: '75px',
                zIndex: 50,
                background: 'darkgrey',
                width: '100%',
                transform: 'translate(-50%, -50%)', 
            }}>
            {title}
        </div>
        {/* PAGE CONTENT */}
        <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                flexDirection: 'column', 
                alignItems: 'center',
                gap: '20px',
            }}>
            {content}
        </div>
        {/* FOOTER */}
        <div style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                placeItems: 'center',
                position: 'fixed', 
                bottom: '0%', 
                left: '0%',
                zIndex: 200,
                background: 'slategrey',
                padding: '15px',
                width: '100%' }}>
            <a href={baseWebUrl + "/routes/rules"}>Rules</a>
            {footer}
            <a href={baseWebUrl + "/routes/support"} style={{transform: 'translate(-60%, 0%)'}}>Support</a>
        </div>
    </div>);
}