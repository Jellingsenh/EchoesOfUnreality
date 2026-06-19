import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import type { JSX } from "react";

export default function ChooseParentOrChildModal({
    modalContent,
    chooseLocationModalHidden,
    setChooseLocationModalHidden,
    resetLocationFilters,
    modalParentMode,
}:{
    modalContent: JSX.Element,
    chooseLocationModalHidden: boolean,
    setChooseLocationModalHidden: (chooseLocationModalHidden: boolean) => void,
    resetLocationFilters: () => void,
    modalParentMode: boolean | null,
}){
    return <Dialog 
        open={!chooseLocationModalHidden} 
        onClose={() => {
            setChooseLocationModalHidden(true)
            resetLocationFilters()
        }} 
        disableRestoreFocus
        // closeAfterTransition 
        fullWidth 
        maxWidth={false}
        sx={{
            "& .MuiDialog-container": {
                alignItems: "flex-start", // Aligns the dialog to the top
            },
            '& .MuiPaper-root': {
                backgroundColor: '#ccc9c9',
            },
            '& .MuiDialogContent-root': {
                overflowY: 'hidden', // Completely removes vertical scrollbar
            }
        }}
        // disableScrollLock
        slotProps={{ 
            paper: { 
                sx: { 
                    width: '45vw', 
                    height: '65vh',
                    marginTop: '18vh',
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    // paddingBottom: '20px',
                    // margin: '0px',
                    borderRadius: '10px',
                } 
            } 
        }}>
            <DialogTitle>
                <div style={{
                    minWidth: '100px',
                    marginLeft: '-20px',
                    // marginLeft: '10px',
                    // marginRight: '10px',
                }}>
                    {modalParentMode === true ? 
                    'Choose a new parent:' : 
                    'Choose a new child:'}
                </div>
            </DialogTitle>
            <DialogContent className='no-scrollbar' sx={{ 
                // mt: 2,
                marginTop: '-10px',
                // marginX: '20px',
                // marginBottom: '20px',
                // marginLeft: '-20px',
                // marginRight: '-20px',
            }}>
                {modalContent}
            </DialogContent>
        </Dialog>
}