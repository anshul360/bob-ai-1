import Image from "next/image";

export default async function AboutPage() {
  
  return (
    <section className="mb-12 bg-black text-justify">
      <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4  sm:px-6 lg:px-8 items-start justify-center mt-10 sm:mt-0">
        <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
          <h1 className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
            About
          </h1>
        </div>
        <div className=" mt-1 text-lg text-white sm:text-2xl">
          <p className=" indent-6 p-2 ">Cyan Arrow is the product of ever changing needs in the market. We are specifically trying to solve the Customer Acquisition & Satisfaction issues that many businesses struggle with.
          The technology is evolving rapidly and many of which now have become more affordable. </p>
          <p className=" indent-6 p-2">Keeping this as our guiding star we have started out with set of tools built with the latest technology to help businesses to acquire more customers.</p>
          <p className=" indent-6 p-2">Our big idea is to keep adding more tools with the latest available technology, that can help businesses increase the number of Customers they have and keep those Customers really happy. </p>
        </div>
        <div className=" mt-1 text-lg text-white sm:text-2xl">
          {/* <Image width={100} height={100} src="" alt="Anshul Kumar" /> */}
          <div className=" p-6 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Image width={100} height={100} src="/lib/image/about/MyNewImg.jpeg" alt="Anshul Kumar" className="  border-2 border-[#00ffff] rounded-lg "/>
            <div className=" flex gap-2 items-center">
              <div className=" flex flex-col ">
                <h5 className=" font-semibold tracking-tight text-cyan-500 dark:text-white">Anshul Kumar</h5>
                <p className="text-base font-normal text-cyan-500 dark:text-gray-400">Founder</p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400"></p>
              </div>
              <a href="https://www.linkedin.com/in/anshul-kumar-812b9a18" target="_blank" className="inline-flex items-center hover:underline text-white hover:text-cyan-500">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M847.7 112H176.3c-35.5 0-64.3 28.8-64.3 64.3v671.4c0 35.5 28.8 64.3 64.3 64.3h671.4c35.5 0 64.3-28.8 64.3-64.3V176.3c0-35.5-28.8-64.3-64.3-64.3zm0 
                    736c-447.8-.1-671.7-.2-671.7-.3.1-447.8.2-671.7.3-671.7 447.8.1 671.7.2 671.7.3-.1 447.8-.2 671.7-.3 671.7zM230.6 411.9h118.7v381.8H230.6zm59.4-52.2c37.9 0 
                    68.8-30.8 68.8-68.8a68.8 68.8 0 1 0-137.6 0c-.1 38 30.7 68.8 68.8 68.8zm252.3 245.1c0-49.8 9.5-98 71.2-98 60.8 0 61.7 56.9 61.7 101.2v185.7h118.6V584.3c0-102.8-22.2-181.9-142.3-181.9-57.7 
                    0-96.4 31.7-112.3 61.7h-1.6v-52.2H423.7v381.8h118.6V604.8z"></path>
                  </svg>
              </a>
              <a href="https://twitter.com/AnshCooll" target="_blank" className="inline-flex items-center hover:underline text-white hover:text-cyan-500">
                <svg width="1.47em" height="1.55em" viewBox="0 0 1200 1227" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 
                  519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://github.com/anshul360" target="_blank" className="inline-flex items-center hover:underline text-white hover:text-cyan-500">
              <svg height="1.7em" viewBox="0 0 14 14" width="1.7em">
                <path d="M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 
                0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 
                1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z" 
                fill="currentColor" fillRule="nonzero"></path>
              </svg>
              </a>

            </div>
          </div>
        </div>
      </div>

      <div className="relative flex max-w-[80rem] w-full px-4 flex-col mx-auto gap-4 py-10 sm:py-14 sm:px-6 lg:px-8 items-start justify-center mt-10 sm:mt-0">
        <div className="sm:flex flex-col text-4xl sm:text-6xl items-center justify-center p-2 rounded-xl h-auto " style={{fontWeight: ""}}>
          <h1 className="w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 pb-3">
            Roadmap
          </h1>
        </div>
        <div className=" mt-1 text-lg text-white sm:text-2xl p-2">
          <p className="">We have many exciting features planned for the not so far future.</p>
        </div>
        <ol className="relative border-l border-[#00ffff] dark:border-cyan-700 text-lg text-white sm:text-2xl m-4">                  
          <li className="mb-10 ml-4">
              <div className="absolute w-3 h-3 bg-[#00ffff] rounded-full mt-1.5 sm:mt-3 -left-1.5 border border-cyan-300 dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-base font-normal leading-none text-gray-400 dark:text-gray-500">August 2023</time>
              <h3 className=" font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 dark:text-white">Chatbot and Leads</h3>
              <p className="mb-4 text-base font-normal  dark:text-gray-400">Chatbots with ability to respond based on custom data and collect visitor information. Quick notifications and ability to analyse and export data.</p>
              {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Learn more 
                <svg className="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </a> */}
          </li>
          <li className="mb-10 ml-4">
              <div className="absolute w-3 h-3 bg-[#00ffff] rounded-full mt-1.5 sm:mt-3  -left-1.5 border border-cyan-300 dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">September 2023</time>
              <h3 className=" font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 dark:text-white">API Access</h3>
              <p className="text-base font-normal  dark:text-gray-400">Connect through API to chat, export</p>
          </li>
          <li className="mb-10 ml-4">
              <div className="absolute w-3 h-3 bg-[#00ffff] rounded-full mt-1.5 sm:mt-3  -left-1.5 border border-cyan-300 dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">October 2023 - November 2023</time>
              <h3 className=" font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 dark:text-white">Scoring & Integrations</h3>
              <p className="text-base font-normal  dark:text-gray-400">Ability to score Leads, connect with popular CRMs/Meeting Apps. Connect chatbot through API.</p>
          </li>
          <li className="ml-4">
              <div className="absolute w-3 h-3 bg-[#00ffff] rounded-full mt-1.5 sm:mt-3  -left-1.5 border border-cyan-300 dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">January 2024 - March 2024</time>
              <h3 className=" font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-400 dark:text-white">Customer Support</h3>
              <p className="text-base font-normal  dark:text-gray-400">Ability to gather customer feedback. Analyse various satisfaction matrics</p>
          </li>
      </ol>
      </div>
      
    </section>
  );
}
