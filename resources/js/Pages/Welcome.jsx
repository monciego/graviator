import { Head, Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />

            <div className="min-h-screen flex-grow w-full bg-white  relative flex items-center justify-center bg-grid-black/[0.1]">
                <header className="fixed top-0 left-0 right-0 z-[100] px-8 py-3 border-b flex items-center justify-between bg-white ">
                    <Link href={`/`} className="flex items-center gap-2">
                        <span className="text-lg font-bold">
                            Alaminos Grand Memorial Park
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-4">
                        <Link
                            href={route("login")}
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Login
                        </Link>
                    </nav>
                </header>
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>
                <div className="mx-auto max-w-4xl">
                    <div className="text-center">
                        <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-950 sm:text-6xl">
                            Graviator: Your Guide to Alaminos Grand Memorial
                            Park
                        </h1>
                        <p className="mt-6 sm:text-lg leading-8 text-gray-700  mx-auto">
                            Seamlessly explore and navigate Alaminos Grand
                            Memorial Park with Graviator—your trusted mapping
                            and information system. Discover, locate, and
                            connect with ease.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href={route("map")}
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Explore map
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
