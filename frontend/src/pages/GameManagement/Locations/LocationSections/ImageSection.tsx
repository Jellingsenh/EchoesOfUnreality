import OutlinedDiv from "../../../../components/helpers/OutlinedDiv"

export default function ImageSection({
    viewMode,
    imageInput,
    setImageInput,
}:{
    viewMode: boolean,
    imageInput: string | null,
    setImageInput: React.Dispatch<React.SetStateAction<string | null>>,
}) {
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
    }}>
        {!viewMode && ! imageInput && <div style={{
            marginLeft: '15px', // spacer div
        }} />}
        <div style={{
            width: '100%',
            minWidth: 'max-content',
            // overflowX: 'auto',
        }}>
            <OutlinedDiv 
                label={'Image'}
                locked={viewMode}
            >
                {imageInput ? <div style={{
                    marginLeft: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                }}>
                        {/* IMAGE DISPLAY */}
                        {/* josh todo */}
                        <button onClick={() => {
                            setImageInput(null)
                        }}>
                            {imageInput}
                        </button>
                </div> : 
                <div style={{
                    marginLeft: '5px',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '5px',
                }}>
                    <div style={{
                        minWidth: 'max-content',
                    }}>
                        {'No image found.  '}
                    </div>
                    {!viewMode && <button style={{
                        minWidth: 'max-content',
                    }}
                    onClick={() => {
                        setImageInput('josh new image') // josh todo make image
                    }}>
                        {'Upload'}
                    </button>}
                </div>}
            </OutlinedDiv>
        </div>
    </div>
}