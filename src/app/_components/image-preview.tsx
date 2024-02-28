import clsx from 'clsx'
import Image from 'next/image'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { CheckCircleIcon } from '@heroicons/react/20/solid'

export function ImagePreview({
  file,
  url,
  isLoading = false,
  isError = false,
  isSuccess = false,
}: {
  file: File
  url: string
  isLoading?: boolean
  isError?: boolean
  isSuccess?: boolean
}) {

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400">
        <div className="relative flex h-12 w-20">
          {/* {error ? (
              <div className="flex w-full justify-center items-center">
                <Icons.redx className="h-6 w-6" />
              </div>
            ) : ( */}
          <Image
            style={{ objectFit: 'contain' }}
            src={url}
            fill
            alt={""}
          />
          {/* )} */}
        </div>
      </td>
      <td className="px-6 py-4 truncate whitespace-normal text-sm font-medium dark:text-slate-400 ">
        <div className="">
          <p
            // className={clsx('dark:text-slate-300', {
            //   'dark:text-red-500': error,
            // })}
            className={clsx('dark:text-slate-300')}
          >
            {file.name}
          </p>
          {/* {data ? (
              <p>{data.alt}</p>
            ) : isLoading ? (
              <Loader2 className="mt-1 w-4 h-4 animate-spin" />
            ) : null} */}
        </div>
      </td>
      <td
        className={clsx(
          'px-6 py-4 whitespace-nowrap text-sm text-slate-400',
          {
            'dark:text-red-500': isError,
          }
        )}
      >
        {(file.size / 1000).toFixed(0)} KB
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400 ">
        {
          isLoading ?
          <div role="status">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-50 animate-spin fill-teal-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          :
          isError ? <XCircleIcon className='w-6 fill-red-500'/> : null ??
          isSuccess ? <CheckCircleIcon className='w-6 fill-green-500' /> : null
        }
      </td>
    </tr>
  )
}