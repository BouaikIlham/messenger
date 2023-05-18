import Image from "next/image"
import logo from "@/public/images/logo.png"
export default function Home() {
  return (
   <div className="
                  flex 
                  min-h-full
                  justify-center
                  flex-col
                  py-12
                  sm:px-6
                  lg:px-8
                  bg-gray-100">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <Image 
        src={logo}
        height={48}
        width={48}
        className="mx-auto w-auto"
        alt="messenger-logo"
      />

      <h2 className="
                    text-center
                    text-3xl
                    mt-6
                    font-bold
                    tracking-tight
                    text-gray-900">
        Sign in to your Account
      </h2>
    </div>

    {/* AuthForm */}
   </div>
  )
}
