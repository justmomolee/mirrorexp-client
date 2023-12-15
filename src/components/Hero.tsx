import { heroAvatarLinks } from "@/lib/utils";
import heroBg from "../assets/heroBg.svg"
import phoneBg from "../assets/phoneBg.svg"
import ChartSlide from "./ChartSlide";
import { Link } from "react-router-dom";

const Hero:React.FC = () => {

  return (
    <section className="relative bg-no-repeat bg-center" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="max-ctn px-5 pad-y max-md:pt-40 md:px-10 grid grid-cols-1 items-center gap-12 sm:gap-20 md:grid-cols-2">
        <div className="max-w-[720px] lg:max-w-[842px]">
          <h1 className="hd-text text-white  mb-4 md:mb-10 lg:mb-12">
            Super Fast, Secured, And Leading <span className="text-[#4ECB71]"> Copy Trading </span> platform
          </h1>
          <p className="text-[#636262] desc">
            Scale Your Investments with Precision: Follow, Learn, and Earn with Our Copy Trading Platform.
          </p>
          <Link to="/login" className="primaryBtn mb-6" >
            Get Started <span className="ml-3">&rarr;</span>
          </Link>
          <div className="relative mb-4 flex w-full max-w-xs items-center">
            {heroAvatarLinks.map((src, i) =>
              <img key={i} src={src} alt="avatar" className={`relative avatar ${i > 0 ? '-ml-5' : ''} [box-shadow:#12006C_0px_6px]`} style={{top: 'auto', left: `0px`}}/>
            )}
            <div className="relative left-[-40px] top-auto z-[1] rounded-[30px] bg-[#1353fe] py-2 pl-12 pr-3 text-center text-white [box-shadow:#12006C_0px_6px]">
              <p className="text-[10px] leading-normal font-semibold">
                <span className="font-bold">100k+ </span><br />Customers
              </p>
            </div>
          </div>
        </div>

        <div className="bg-cover bg-no-repeat bg-center md:w-[95%] lg:w-full"  style={{ backgroundImage: `url(${phoneBg})` }}>
          <video className="mx-auto block rounded-[3rem] object-cover" loop autoPlay muted playsInline width="280" height="550" poster="https://www.okx.com/cdn/assets/imgs/237/95265F65A5BC22A1.png?x-oss-process=image/format,webp">
            <source src="https://www.okx.com/cdn/assets/files/2311/0C78C09B341B6543.webm" type="video/webm" />
            <source src="https://www.okx.com/cdn/assets/files/237/218B8A2E8CF37E47.mp4" type="video/mp4" />
            <track kind="captions" />
          </video>
        </div>
      </div>
      <ChartSlide />
    </section>
  );
};

export default Hero;