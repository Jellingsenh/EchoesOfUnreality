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
                }
            }}
            slotProps={{ 
                paper: { 
                    sx: { 
                        width: '45vw', 
                        height: '65vh',
                        marginTop: '18vh',
                        borderRadius: '10px',
                    } 
                } 
        }}>
            <DialogTitle style={{
                alignSelf: 'center',
                marginRight: '-5px',
            }}>
                {modalParentMode === true ? 
                'Choose a new parent:' : 
                'Choose a new child:'}
            </DialogTitle>
            <DialogContent className='no-scrollbar' sx={{ 
                // mt: 2,
                marginBottom: '20px',
            }}>
                {modalContent}
            </DialogContent>
        </Dialog>
}