export default function CreateLocationButton({
    isModalHidden,
    setModalHidden,
    setEditMode,
    setRefreshOnCloseModal,
}:{
    isModalHidden: boolean,
    setModalHidden: React.Dispatch<React.SetStateAction<boolean>>,
    setEditMode: (mode: 'VIEW' | 'EDIT' | 'CREATE') => void,
    setRefreshOnCloseModal: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    return <>
        {isModalHidden && <button className="fadeInItem"
          style={{
            aspectRatio: '1 / cos(30deg)',
            background: '#3498db',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            marginBottom: '-3px',
            border: 'none',
            width: '15px',
            height: '15px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={() => {
            // e.stopPropagation() // this stops the clickOut event
            setEditMode('CREATE')
            setRefreshOnCloseModal(false)
            setModalHidden(false)
          }}>
          +
        </button>}
    </>
}