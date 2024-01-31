import Link from "next/link"


const Denied = () => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center p-4">
        <h1 className="text-3xl font-semibold">Access Denied</h1>
        <p className="text-base py-4">You are logged in, but you are not authorized to access this page!</p>
        <Link className="text-xl text-primary hover:text-primary/70" href="/">
        Back to home page
        </Link>
    </div>
  )
}

export default Denied