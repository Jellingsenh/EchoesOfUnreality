import { useEffect, useRef } from "react";
import OutlinedDiv from "../../../../components/OutlinedDiv"
import SquareDiv from "../../../../components/SquareDiv";
import SpinningLoader from "../../../../components/SpinningLoader";
import compressImageFile from "../../../../helpers/compressImageFile";

export default function LocationImageSection({
    viewMode,
    loadingLocationImage,
    setLoadingLocationImage,
    imageUrlInput,
    setImageUrlInput,
    appearanceText,
    locationImageEntry,
    setLocationImageEntry,
    // setWasImageRemoved,
}:{
    viewMode: boolean,
    loadingLocationImage: boolean,
    setLoadingLocationImage: React.Dispatch<React.SetStateAction<boolean>>,
    imageUrlInput: string | null,
    setImageUrlInput: React.Dispatch<React.SetStateAction<string | null>>,
    appearanceText: string,
    locationImageEntry: File | null,
    setLocationImageEntry: React.Dispatch<React.SetStateAction< File | null>>,
    // setWasImageRemoved: React.Dispatch<React.SetStateAction<boolean>>,
}) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!locationImageEntry) {
            setImageUrlInput(null);
            return;
        }
        
        const objectUrl = URL.createObjectURL(locationImageEntry); // Manage memory by creating and revoking the object URL
        // console.log('objectUrl:', objectUrl)
        setImageUrlInput(objectUrl);

        return () => URL.revokeObjectURL(objectUrl); // Clean up memory when the component unmounts or image changes
    }, [locationImageEntry]);

    if (viewMode && !imageUrlInput) {
        return <></> 
    }

    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
    }}>
        {!viewMode && !imageUrlInput && <div style={{
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
                {loadingLocationImage ? <SpinningLoader /> : <>
                {imageUrlInput ? <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                }}>
                    {/* Image */}
                    <SquareDiv>
                        <img 
                            tabIndex={0}
                            src={imageUrlInput} 
                            alt={appearanceText}
                            style={{ 
                                minWidth: '100%',
                                maxWidth: '30vw',
                                // minWidth: 'max-content',
                                height: '100%',
                                objectFit: 'fill',
                                borderRadius: '8px',
                            }} 
                        />
                    </SquareDiv>
                    {/* Remove button */}
                    {!viewMode && <button 
                        onClick={() => {
                            if (!locationImageEntry) {
                                setImageUrlInput(null)
                            } else {
                                setLocationImageEntry(null)
                            }
                        }}
                        style={{ 
                            marginTop: "3px", 
                            alignSelf: 'center',
                            cursor: 'pointer', 
                            minWidth: 'max-content',
                        }}
                    >
                        {'Remove image'}
                    </button>}
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
                    {!viewMode && <>
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            onChange={(e) => {
                                if (!e.target.files) { return }
                                const file = e.target.files[0];
                                if (file.size > 10485760) { // 10 MB    
                                    console.log('File is too large. Compressing...') 
                                    compressImageFile(
                                        file,
                                        setLoadingLocationImage,
                                        setLocationImageEntry,
                                    )
                                }
                                if (file && file.type.startsWith("image/")) {
                                    // console.log('setting new image entry:', file)
                                    setLocationImageEntry(file);
                                    // setWasImageRemoved(false)
                                } else {
                                    alert("Please select a valid image file.");
                                }
                            }} 
                            style={{
                                display: 'none',
                            }}
                            accept="image/*" 
                        />
                        <button style={{
                            marginLeft: '5px',
                            minWidth: 'max-content',
                            cursor: 'pointer',
                        }} onClick={() => {
                            if (fileInputRef.current) { 
                                fileInputRef.current.click() // opens input
                            }
                        }}>
                            {'Upload image'}
                        </button>
                    </>}
                </div>}
                </>}
            </OutlinedDiv>
        </div>
    </div>
}
