"use client"; 
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function LandingButtons({session}: any) {
    const { push } = useRouter();
    const stage = process.env.NEXT_PUBLIC_DEV_STAGE;
    
    const buttons = session?
        <Button variant="slim" type="button" onClick={() => push('/pricing')}
        className="block w-full !max-w-xl !py-2 !rounded-full text-xl lg:text-3xl font-semibold text-center !leading-tight text-white bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-300  hover:from-cyan-300 hover:to-cyan-600 hover:via-cyan-400 transition-all duration-300 !border-0" >
            {stage == "cs"?"Coming Soon!":"Subscribe Now!"}
        </Button>:
        <Button variant="slim" type="button" onClick={() => signIn()}
        className="block w-full !max-w-xl !py-2 !rounded-full text-xl lg:text-3xl font-semibold text-center !leading-tight text-white bg-gradient-to-r from-cyan-600 via-cyan-400 to-cyan-300  hover:from-cyan-300 hover:to-cyan-600 hover:via-cyan-400 transition-all duration-300 !border-0" >
            {stage == "cs"?"Coming Soon!":"Try free"}
        </Button>;
        

    function signIn() {
        if(stage != "cs") push("/signin?view=sign_up");
        else alert("We are launching soon!");
    }

    return <>
        {buttons}
    </>;
}