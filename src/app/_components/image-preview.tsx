import clsx from 'clsx'
import Image from 'next/image'

export function ImagePreview({
  url,
  name,
  onClose,
}: {
  url: string
  name: string
  onClose?: () => void
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
                alt={name}
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
              {name}
            </p>
            {/* {data ? (
              <p>{data.alt}</p>
            ) : isLoading ? (
              <Loader2 className="mt-1 w-4 h-4 animate-spin" />
            ) : null} */}
          </div>
        </td>
        {/* <td
          className={cn(
            'px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400',
            {
              'dark:text-red-500': error,
            }
          )}
        >
          {(size / 1000).toFixed(0)} KB
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-slate-400 ">
          <Progress
            className={cn('w-full h-2')}
            value={progress}
            isError={error || processingError}
          />
        </td> */}
      </tr>
    )
}