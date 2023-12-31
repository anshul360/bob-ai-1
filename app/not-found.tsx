import Link from 'next/link'

export default function NotFound() {
  return (
    <body className=' bg-zinc-500'>
      <div className="flex flex-col items-center justify-center md:flex-row space-x-6 h-screen ">
        <div className="space-x-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-6xl font-extrabold leading-9 tracking-tight text-gray-900 md:border-r-2 md:px-6 md:text-8xl md:leading-14">
            404
          </h1>
        </div>
        <div className="max-w-md items-center flex flex-col">
          <p className="mb-4 text-xl font-bold leading-normal md:text-2xl">
            Sorry we couldn't find this page.
          </p>
          {/* <p className="mb-8">But dont worry, you can find plenty of other things on our homepage.</p> */}
          <Link
            href="/"
            className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-[#00ffff] px-4 py-2 text-sm font-medium leading-5 text-slate-800 shadow transition-colors duration-150 hover:bg-cyan-700 focus:outline-none "
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </body>
  )
}
