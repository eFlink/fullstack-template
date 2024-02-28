import { useEffect, useState } from "react"
import type { FilePreview } from "~/app/_components/image-upload";
import { api } from "~/trpc/react"
import { createClient } from "~/util/supabase/client"

interface FileUpload extends FilePreview {
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
}

/**
 * 
 * @param filePreview 
 * @returns 
 */
export function useFileUpload(filePreview: FilePreview[], bucketName = "test") {
    const [filesToUpload, setFiles] = useState<FileUpload[]>([]);
    const [isUploading, setIsUploading] = useState(false)
    useEffect(() => {
        const updatedFiles: FileUpload[] = filePreview.map((file) => ({
            ...file,
            isLoading: false,
            isError: false,
            isSuccess: false
        }));
        setFiles(updatedFiles)
    }, [filePreview])
    const client = createClient()
    const createSignedUploadUrl = api.image.createSignedUploadUrl.useMutation()

    const uploadFiles = async () => {
        setIsUploading(true)
        for (let i = 0; i < filesToUpload.length; i++) {
            const file = filesToUpload[i];
            try {
                if (!file) {
                    throw new Error("File Not Present")
                }
                setFiles(prevFiles => prevFiles.map((f, idx) => idx === i ? { ...f, isLoading: true } : f));

                const signedUploadUrl = await createSignedUploadUrl.mutateAsync({name: file.name})
                if (signedUploadUrl.error) {
                    throw new Error("Upload error")
                }
                const { error } = await client.storage.from(bucketName).uploadToSignedUrl(signedUploadUrl.data?.path, signedUploadUrl.data?.token, file.file) as { error: Error }
                if (error) {
                    throw new Error("Upload error")
                } else {
                    setFiles(prevFiles => prevFiles.map((f, idx) => idx === i ? { ...f, isSuccess: true, isLoading: false } : f));
                }
            } catch (error) {
                setFiles(prevFiles => prevFiles.map((f, idx) => idx === i ? { ...f, isError: true, isLoading: false } : f));
            }
        }
        setIsUploading(false)
    }

    function removeFile(file: FileUpload) {
        setFiles(prevFiles => prevFiles.filter(f => f.name !== file.name))
    }

    return {uploadFiles, removeFile, filesToUpload, isUploading}

}