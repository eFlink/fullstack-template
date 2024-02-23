"use client"

import clsx from "clsx"
import { useReducer, DragEvent, useState, ChangeEvent, forwardRef } from "react"
import { MAX_FILE_SIZE } from "~/config/image"
import { validateFileType } from "~/util/helper"
import { ImagePreview } from "./image-preview"
import { PlusIcon } from "@heroicons/react/20/solid"
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline"

interface FileWithUrl {
    name: string;
    getUrl: string
    size: number
    error?: boolean | undefined
}

// Reducer action(s)
const addFilesToInput = () => ({
    payload: [] as FileWithUrl[],
})

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> { }

const ImageUpload = forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        const [dragActive, setDragActive] = useState<boolean>()
        const [fileInput, fileDispatch] = useReducer((state: FileWithUrl[], action: ReturnType<typeof addFilesToInput>) => {
            if (state.length + action.payload.length > 10) {
                // Display Toast
                return state
            }
            return [...state, ...action.payload]
        }, [])

        const noInput = fileInput.length === 0

        // Handle drag events
        function handleDrag(e: DragEvent<HTMLFormElement | HTMLDivElement>) {
            e.preventDefault()
            e.stopPropagation()
            if (e.type === 'dragenter' || e.type === 'dragover') {
                setDragActive(true)
            } else if (e.type === 'dragleave') {
                setDragActive(false)
            }
        }

        function addFilesToState(files: FileWithUrl[]) {
            fileDispatch({ payload: files })
        }

        function uploadToClient(eventFiles: FileList | null) {
            if (eventFiles === null || !eventFiles[0]) {
                // Toast Message
                return
            }
            const files = Array.from(eventFiles)
            const validFiles = files.filter((file) => validateFileType(file))
            if (files.length !== validFiles.length) {
                // Toast Message
                // Invalid File Type
                // Only image files are allowed
                console.log('hello')
                return
            }
            setDragActive(false)

            const filesWithUrl = validFiles.map((file) => {
                const { name, size } = file
                // Change to blob in the future
                const getUrl = URL.createObjectURL(file)
                return { name, size, getUrl }
            })

            addFilesToState(filesWithUrl);
        }

        function handleChange(e: ChangeEvent<HTMLInputElement>) {
            e.preventDefault()
            uploadToClient(e.target.files)
        }

        function handleDrop(e: DragEvent<HTMLDivElement>) {
            e.preventDefault()
            e.stopPropagation()
            uploadToClient(e.dataTransfer.files)
            e.dataTransfer.clearData()
        }

        return (
            <form
                onSubmit={(e) => e.preventDefault()}
                onDragEnter={handleDrag}
                className="flex flex-col gap-y-4 h-full items-center w-full lg:w-2/3 justify-start"
            >
                <label
                    htmlFor="dropzone-file"
                    className={clsx(
                        'group relative h-full flex flex-col items-center justify-center w-full aspect-video border-2 border-slate-300 border-dashed rounded-lg border-gray-600 transition',
                        { 'border-slate-400 bg-slate-800': dragActive },
                        { 'h-fit aspect-auto': !noInput },
                        { 'items-start justify-start': !noInput },
                        { 'hover:border-gray-500 hover:bg-slate-800': noInput }
                    )}
                >
                    <div
                        className={clsx(
                            'relative w-full h-full flex flex-col items-center justify-center',
                            { 'items-start': !noInput }
                        )}
                    >
                        {noInput ? (
                            <>
                                <div
                                    className="absolute inset-0 cursor-pointer"
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                />

                                <svg
                                    aria-hidden="true"
                                    className="w-10 h-10 mb-3 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    ></path>
                                </svg>

                                <p className="mb-2 text-sm text-gray-500 ">
                                    <span className="font-semibold">Click to upload</span> or drag
                                    and drop
                                </p>
                                <p className="text-xs text-gray-500 ">
                                    up to 5 images, {(MAX_FILE_SIZE / 1000000).toFixed(0)}MB per
                                    file
                                </p>

                                <input
                                    {...props}
                                    ref={ref}
                                    multiple
                                    onChange={handleChange}
                                    accept="image/jpeg, image/jpg, image/png"
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                />
                            </>
                        ) : (
                            <div className="flex flex-col w-full h-full">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="shadow overflow-hidden sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-slate-600">
                                                <thead className="bg-slate-800">
                                                    <tr>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-slate-300  uppercase tracking-wider"
                                                        >
                                                            Preview
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-slate-300  uppercase tracking-wider"
                                                        >
                                                            Name
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-slate-300  uppercase tracking-wider"
                                                        >
                                                            Size
                                                        </th>
                                                        <th
                                                            scope="col"
                                                            className="px-6 py-3 text-left text-xs font-medium text-slate-300  uppercase tracking-wider"
                                                        >
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-600">
                                                    {fileInput.map((file, index) => (
                                                        <ImagePreview
                                                            key={index}
                                                            //   error={file.error}
                                                            url={file.getUrl}
                                                            name={file.name}
                                                        //   size={file.size}
                                                        />
                                                    ))}
                                                </tbody>
                                            </table>

                                            <label
                                                htmlFor="dropzone-file-images-present"
                                                className="relative cursor-pointer group hover:border-gray-500 hover:bg-slate-800 transition flex justify-center py-4 border-t border-slate-600"
                                            >
                                                <PlusIcon className="group-hover:fill-slate-400 transition stroke-1 w-12 h-12 fill-slate-500" />
                                                <input
                                                    {...props}
                                                    ref={ref}
                                                    multiple
                                                    onChange={handleChange}
                                                    accept="image/jpeg, image/jpg, image/png"
                                                    type="file"
                                                    id="dropzone-file-images-present"
                                                    className="relative z-20 hidden"
                                                />
                                                <div
                                                    className="absolute inset-0"
                                                    onDragEnter={handleDrag}
                                                    onDragLeave={handleDrag}
                                                    onDragOver={handleDrag}
                                                    onDrop={handleDrop}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </label>
                <button
                    type="button"
                    className="flex items-center gap-x-2 rounded-md bg-teal-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <ArrowUpCircleIcon className="w-6" />
                    Upload Images
                </button>
            </form>
        )
    }
)
export default ImageUpload