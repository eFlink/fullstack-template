import { useEffect, useState } from "react"
import { FilePreview } from "~/app/_components/image-upload";
import { api } from "~/trpc/react"
import { createClient } from "~/util/supabase/client"

interface FileUpload extends FilePreview {
    isLoading: boolean
    isError: boolean
    isSuccess: boolean
}

export function useFileUpload(filePreview: FilePreview[]) {
    const [filesToUpload, setFiles] = useState<FileUpload[]>([]);
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
                const { error } = await client.storage.from('test').uploadToSignedUrl(signedUploadUrl.data?.path!, signedUploadUrl.data?.token!, file.file)
                if (error) {
                    throw new Error("Upload error")
                } else {
                    setFiles(prevFiles => prevFiles.map((f, idx) => idx === i ? { ...f, isSuccess: true, isLoading: false } : f));
                }
            } catch (error) {
                setFiles(prevFiles => prevFiles.map((f, idx) => idx === i ? { ...f, isError: true, isLoading: false } : f));
            }
        }
    }

    return {uploadFiles, filesToUpload}

}