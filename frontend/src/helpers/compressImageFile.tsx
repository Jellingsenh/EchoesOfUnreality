import imageCompression from 'browser-image-compression';

export default function compressImageFile(
    imageFile:File,
    setLoadingLocationImage: React.Dispatch<React.SetStateAction<boolean>>,
    setLocationImageEntry: React.Dispatch<React.SetStateAction< File | null>>,
) {
    async function compressImageFile(file: File) {
        // Configuration settings
        const options = {
            maxSizeMB: 9.6,          // Targets slightly under 10MB for safety
            maxWidthOrHeight: 4096,  // Retains high resolution up to 4K
            useWebWorker: true,      // Keeps UI responsive during compression
        };

        try {
            setLoadingLocationImage(true);
            // Compresses file to fit within your specified maxSizeMB
            const compressedBlob = await imageCompression(file, options);
            
            // Converts the Blob back to a standard File object if needed
            const resultFile = new File([compressedBlob], file.name, {
                type: file.type,
            });

            setLocationImageEntry(resultFile);
            console.log(`  > Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
            console.log(`  > New size: ${(resultFile.size / 1024 / 1024).toFixed(2)} MB`);
        } catch (error) {
            console.error("Compression error:", error);
        } finally {
            setLoadingLocationImage(false);
        }
    }
    compressImageFile(imageFile)
}
