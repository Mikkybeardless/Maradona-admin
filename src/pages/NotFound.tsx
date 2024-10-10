import { useNavigate } from "react-router-dom"

export default function NotFound() {
    const navigate = useNavigate()
    return (
        <div className="w-screen h-screen flex flex-col gap-y-4 justify-center items-center">
            <h1 className="text-3xl font-bold">This URL does not exist</h1>
            <button
                onClick={() => navigate(-1)}
                className="text-defaultOrange hover:underline"
            >
                Go back
            </button>
        </div>
    )
}
