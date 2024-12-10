import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
    return (
        <div className="flex justify-center items-center h-[100vh] w-[100vw]">
            <SignUp />
        </div>

    )
}

export default SignUpPage