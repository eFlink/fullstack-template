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
        for (let file of filesToUpload) {
            try {
                const updatedFiles = filesToUpload.map((f) => {
                    if (f === file) {
                        return { ...f, isLoading: true };
                    }
                    return f;
                });
                setFiles(updatedFiles);
                const signedUploadUrl = await createSignedUploadUrl.mutateAsync({name: file.name})
                if (signedUploadUrl.error) {
                    throw new Error("Upload error")
                }
                const { error } = await client.storage.from('test').uploadToSignedUrl(signedUploadUrl.data?.path!, signedUploadUrl.data?.token!, file.file)
                if (error) {
                    throw new Error("Upload error")
                } else {
                    const updatedFiles = filesToUpload.map((f) => {
                        if (f === file) {
                            return { ...f, isSuccess: true, isLoading: false };
                        }
                        return f;
                    });
                    setFiles(updatedFiles);
                }
            } catch (error) {
                const updatedFiles = filesToUpload.map((f) => {
                    if (f === file) {
                        return { ...f, isError: true, isLoading: false };
                    }
                    return f;
                });
                setFiles(updatedFiles);
            }
        }
    }

    // return { state: { loading, isError, success }, uploadFile}
    return {uploadFiles, filesToUpload}

}