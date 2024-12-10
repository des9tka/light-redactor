import { SignIn } from "@clerk/nextjs";

function SigninPage() {
    return (
        <div className="flex justify-center items-center h-[100vh] w-[100vw]">
            <SignIn />
        </div>

    )
}

export default SigninPage