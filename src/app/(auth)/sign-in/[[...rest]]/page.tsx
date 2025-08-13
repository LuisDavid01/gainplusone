import { SignIn } from "@clerk/nextjs";
import MainHeader from "~/components/MainHeader";

export default function signinPage(){
    return (
        <div className="min-h-screen bg-background">
        <MainHeader/>
        <div className="flex flex-col justify-center items-center p-20">
            <SignIn/>
        </div>
        </div>
    )
}