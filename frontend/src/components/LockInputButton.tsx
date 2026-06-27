import LockRoundedIcon from '@mui/icons-material/LockRounded';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';

export default function LockInputButton({
    locked,
    setLocked,
}:{
    locked: boolean,
    setLocked: React.Dispatch<React.SetStateAction<boolean>>,
}){
    return <div tabIndex={0}
    style={{
        alignSelf: 'center',
        cursor: 'pointer',
        marginRight: '-7px',
        marginLeft: '-3px',
    }}
    onClick={() => {
        setLocked(prev => !prev);
    }}>
        {locked ? 
            <LockRoundedIcon /> : 
            <LockOpenRoundedIcon />
        }
    </div>
}