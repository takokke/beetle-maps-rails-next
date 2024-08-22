import Image from "next/image";

const Loading = () => {
    return(
        <div className="flex justify-center items-center">
            <Image src="/loading.svg" width={150} height={150} alt="loading..."/>
        </div>
    )
}

export default Loading