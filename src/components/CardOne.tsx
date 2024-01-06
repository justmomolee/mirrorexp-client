import CheckList from "./CheckList";
import image1 from "../assets/image-1.png"
import image2 from "../assets/image-2.png"

export default function CardOne() {
  return (
    <div className="max-ctn py-30">
      <h2 className="max-w-xl text-2xl font-bold mb-14 text-center text-gray-900 m-auto">
        BullCopytrade is one of the strongest platform you will ever trade with
      </h2>

      <div className="flex flex-wrap justify-center gap-8">

        <div className="w-full max-w-[280px] px-4 py-6 rounded-2xl border border-gray-300 flex flex-col gap-7">
          <h2 className="text-xl font-semibold text-gray-900">Expert Traders</h2>

          <ul className="space-y-2 sm:space-y-4">
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-medium">4x more trades per user</span>
            </li>
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-medium"> Highly engaging</span>
            </li>
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-medium">Worldwide community</span>
            </li>
          </ul>

          <img src={image1} alt="Expert Traders" className="w-full"/>
        </div>

        <div className="w-full max-w-[280px] px-4 py-6 rounded-2xl border border-gray-300 flex flex-col gap-7">
          <h2 className="text-xl font-semibold text-gray-900">Copy Trading</h2>

          <ul className="space-y-2 sm:space-y-4">
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-medium">Copy the trades of Lead Traders</span>
            </li>
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-medium">Save time with copy trading</span>
            </li>
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-medium">Leaderboard with statistic</span>
            </li>
          </ul>

          <video autoPlay={true} loop={true} playsInline={true} className="w-full min-h-55 object-cover rounded-xl">
            <source src="https://naga.com/images/new-main-page/why-choose-naga/video-new.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="w-full max-w-[280px] px-4 py-6 rounded-2xl border border-gray-300 flex flex-col gap-7">
          <h2 className="text-xl font-semibold text-gray-900">Multi-Asset</h2>

          <ul className="space-y-2 sm:space-y-4">
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-medium">CFD's on FX, Indices, Metals. Commodities</span>
            </li>
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-medium">Short & Long Trading</span>
            </li>
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-medium">Low and transparent fees</span>
            </li>
          </ul>

          <img src={image2} alt="Expert Traders" className="w-full"/>
        </div>

      </div>
    </div>
  )
}
