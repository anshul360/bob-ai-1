import LoadingDots from "@/components/ui/LoadingDots/LoadingDots";

export default function Pageload() {
    return(
        <div className=" flex h-full w-full absolute top-0 left-0 justify-center items-start pt-40 bg-zinc-500 bg-opacity-80 ">
            <div className=" border-[20px] h-[100px] w-[100px] border-white border-t-transparent animate-spin " style={{borderRadius: "50%"}}>
                <div className=" h-[60px] w-[60px] bg-pink-500 animate-ping rounded-full "></div>
            </div>
        </div>
    );
}