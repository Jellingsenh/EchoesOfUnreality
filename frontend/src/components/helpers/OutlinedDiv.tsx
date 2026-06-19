import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';

const OutlinedContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    // width: 'max-content',
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    // paddingRight: '12px',
    // display:'flex',
    // justofyContent: 'center',
    // border: `1px solid ${ theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`,
    borderRadius: theme.shape.borderRadius,
    // '&:hover': {
    //     borderColor:  theme.palette.text.primary,
    // },
  }));

export default function OutlinedDiv({ 
    children, 
    label,
    locked,
}:{ 
    children: React.ReactNode, 
    label: string,
    locked: boolean,
}) {
  

  return (
    <OutlinedContainer style={{
      border: '1px solid ' + (locked ? 'rgb(52, 52, 246)' : 'rgba(0, 0, 0, 0.23)'),
      // paddingRight: '5px',
    }}>
      <InputLabel 
        shrink 
        sx={{
          position: 'absolute',
          top: '-9px',
          left: '10px',
          bgcolor: 'background.paper',
          px: '4px',
          color: locked ? 'blue' : 'text.primary',
          // '& .MuiPaper-root': {
              backgroundColor: '#828080',
          // },
        }}
      >
        {label}
      </InputLabel>
      {children}
    </OutlinedContainer>
  );
}
