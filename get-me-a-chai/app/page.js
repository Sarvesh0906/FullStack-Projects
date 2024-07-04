import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col items-center text-white p-24 gap-8">
        <div className="font-bold text-5xl gap-8 flex justify-center items-center my-5">
          <span>Buy Me a Chai</span>

          <span className="w-[135px]">
            <img src="/chai.webp" className="rounded-full" alt="chai" />
          </span>
        </div>

        <p className="text-xl">
          A crowdfunding platform for creators. Get funded by your fans and followers.
        </p>

        <div className="flex my-5 gap-4">
          <Link href="/login">
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          </Link>

          <Link href="/about">
            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
          </Link>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white w-3/4 mx-auto py-24">
        <h2 className="text-3xl font-bold text-center mb-14">Your Fans can buy you a Chai</h2>

        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img width={90} className="rounded-full bg-slate-400 p-2" src="/man.gif" alt="" />

            <p className="font-semibold">Fund Yourself</p>

            <p className="text-center">Your fans are available for you to help you</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img width={90} className="rounded-full bg-slate-400" src="/coin.webp" alt="" />

            <p className="font-semibold">Fund Yourself</p>

            <p className="text-center">Your fans are available for you to help you</p>
          </div>

          <div className="item space-y-3 flex flex-col items-center justify-center">
            <img width={90} className="rounded-full bg-slate-400 p-2" src="/people.gif" alt="" />

            <p className="font-semibold">Fans want to help</p>

            <p className="text-center">Your fans are available for you to help you</p>
          </div>
        </div>
      </div>

      <div className="bg-white h-1 opacity-10"></div>

      <div className="text-white w-3/4 mx-auto py-24 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-center mb-14">Learn more about us</h2>

        <iframe width="560" height="315" src="https://www.youtube.com/embed/qOnCIs-2G5o?si=ZId_tW02DyNEM94T" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </>
  );
}
