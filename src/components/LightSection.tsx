type SecData = {
  title: string,
  desc: string,
  imgUrl: string,
}

export default function LightSection({secData}: {secData: SecData}) {
  return (
  <section>
    <div className="max-ctn pad-y pad-x flex flex-wrap-reverse justify-between items-center gap-16">
      <div className="w-full max-w-lg">
        <h3 className="text-3xl font-semibold mb-6"> 
          {secData.title}
        </h3>
        <p className="desc mb-4 md:mb-10 lg:mb-6 font-light">
          {secData.desc}
        </p>
        <button className="primaryBtn">Explore Copy Trading <span className="ml-3">&rarr;</span></button>
      </div>

      <div className='w-full max-w-md'>
        <img src={secData.imgUrl} alt='copy trade' className='w-full'/>
      </div>
    </div>
  </section>
  );
};