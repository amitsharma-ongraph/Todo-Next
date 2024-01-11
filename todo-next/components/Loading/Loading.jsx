import "@/components/Loading/Loading.css"
import loaderIcon from "@/public/images/loading.png"
import Image from "next/image"

function Loading() {
  return (
    <div className="loader-cont">
      <h1>TODO APP</h1>
      <div className="loader">
        <Image src={loaderIcon} height={40} width={40} alt="Loading..."/>
      </div>
    </div>
  )
}

export default Loading
