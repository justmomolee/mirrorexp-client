import CheckList from "./CheckList"

export type secProps = {
  title: string,
  span: string|undefined,
  desc: string,
  moreDesc: string[],
  imgUrl: string,
  bulletList ?: boolean
}


export default function LightSectionV2({ secData }: {secData: secProps}) {
  return (
    <section>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
          <div>
            <img className="rounded-xl" src={secData.imgUrl} alt="Image Description" />
          </div>

          <div className="mt-5 sm:mt-10 lg:mt-0">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 md:space-y-4">
                <h2 className="font-bold text-3xl lg:text-5xl text-gray-800 dark:text-gray-200">
                  {secData.title}

                  {secData.span &&
                  <span className="text-blue-600">
                    {" "} {secData.span}
                  </span>
                  }
                </h2>
                <p className="text-gray-500">
                  {secData.desc}
                </p>
              </div>

              {!secData.bulletList && 
                <ul role="list" className="space-y-2 sm:space-y-4">
                  <li className="flex space-x-3">
                    <CheckList />
  
                    <span className="text-sm sm:text-base text-gray-500">
                    Pick a <span className="font-bold">trader</span>
                    </span>
                  </li>
  
                  <li className="flex space-x-3">
                    <CheckList />
  
                    <span className="text-sm sm:text-base text-gray-500">
                      Set the <span className="font-bold">amount</span>
                    </span>
                  </li>
  
                  <li className="flex space-x-3">
                    <CheckList />
  
                    <span className="text-sm sm:text-base text-gray-500">
                      Relax & Earn
                    </span>
                  </li>
                </ul>
              }

              {secData.bulletList &&
              <ul role="list" className="space-y-2 sm:space-y-4">
                {secData.moreDesc.map((desc, i) =>
                <li className="flex space-x-3" key={i}>
                  <CheckList />

                  <span className="text-sm sm:text-base text-gray-500">
                    {desc}
                  </span>
                </li>
                )}
              </ul>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
