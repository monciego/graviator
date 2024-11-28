import { Head, Link } from "@inertiajs/react";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
import { useState } from "react";

export default function MapPage({ apiKey, deceasedList }) {
    const [searchTerm, setSearchTerm] = useState("");

    // Filter lots based on the search query
    const filteredLots = deceasedList.filter((lot) =>
        lot.deceased_information.some((deceased) =>
            deceased.deceased_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        )
    );

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(false);

    const [istoggleList, setToggleList] = useState(false);

    const openHandler = (data) => {
        console.log(data);
        setIsOpen((prev) => !prev);
        setData(data);
    };

    const toggleHandlerList = () => {
        setToggleList((prev) => !prev);
    };
    return (
        <>
            <Head title="Map View" />

            <div className="min-h-screen flex-grow w-full bg-white bg-grid-black/[0.1] flex items-center justify-center relative">
                <header className="fixed top-0 left-0 right-0 z-[100] px-8 py-3 border-b flex items-center justify-between bg-white ">
                    <Link href={`/`} className="flex items-center gap-2">
                        <span className="text-lg font-bold">
                            Alaminos Grand Memorial Park
                        </span>
                    </Link>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-5 bg-green-600 rounded-full"></div>
                            <span className="font-medium">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-5 bg-yellow-400 rounded-full"></div>
                            <span className="font-medium">Sold</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-5 bg-red-600 rounded-full"></div>
                            <span className="font-medium">Occupied</span>
                        </div>
                    </div>
                </header>
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>

                <button
                    type="button"
                    onClick={() => toggleHandlerList()}
                    className="top-16 left-4 z-10 text-white absolute bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Search
                </button>
                {istoggleList && (
                    <div
                        onClick={() => toggleHandlerList()}
                        className="fixed inset-0 bg-black/60 z-[800]"
                    ></div>
                )}
                {istoggleList && (
                    <>
                        <div className="w-full h-[85vh] bg-slate-950 rounded-tl-xl rounded-tr-xl absolute z-[900] bottom-0 overflow-auto">
                            <div className="fixed w-full flex px-4 sm:px-6 lg:px-8 py-6 bg-slate-950 z-20">
                                <div className="sm:flex sm:items-center w-full">
                                    <div className="sm:flex gap-4 items-center">
                                        <h1 className="text-xl font-semibold text-white">
                                            List of Deceased
                                        </h1>

                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Search by deceased name..."
                                                value={searchTerm}
                                                onChange={(e) =>
                                                    setSearchTerm(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full  border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 placeholder:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={() => toggleHandlerList()}
                                        className="inline-block text-gray-50 border border-gray-50 focus:ring-2 focus:outline-none focus:ring-red-700 rounded-lg text-sm p-1.5"
                                        type="button"
                                    >
                                        <span className="sr-only">
                                            Close Profile
                                        </span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18 18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="px-4 sm:px-6 lg:px-8 mt-24">
                                <div className=" flex flex-col">
                                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-700">
                                                    <thead className="bg-gray-900">
                                                        <tr>
                                                            <th
                                                                scope="col"
                                                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6"
                                                            >
                                                                Block
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                                            >
                                                                Lot
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                                            >
                                                                Deceased Name
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                                            >
                                                                Date of Birth
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                                            >
                                                                Date of Death
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                                            >
                                                                Gender
                                                            </th>
                                                            <th
                                                                scope="col"
                                                                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                                            >
                                                                <span className="sr-only">
                                                                    Actions
                                                                </span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-800 bg-slate-950">
                                                        {filteredLots.map(
                                                            (lot) =>
                                                                lot.deceased_information.map(
                                                                    (
                                                                        deceased
                                                                    ) => (
                                                                        <tr
                                                                            key={
                                                                                deceased.id
                                                                            }
                                                                        >
                                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-50 sm:pl-6">
                                                                                {
                                                                                    lot
                                                                                        .block
                                                                                        .block_no
                                                                                }
                                                                            </td>
                                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">
                                                                                {
                                                                                    lot.lot_no
                                                                                }
                                                                            </td>
                                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">
                                                                                {
                                                                                    deceased.deceased_name
                                                                                }
                                                                            </td>
                                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">
                                                                                {
                                                                                    deceased.date_of_birth
                                                                                }
                                                                            </td>
                                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">
                                                                                {
                                                                                    deceased.date_of_death
                                                                                }
                                                                            </td>
                                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-200">
                                                                                {
                                                                                    deceased.gender
                                                                                }
                                                                            </td>
                                                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-4">
                                                                                <button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        openHandler(
                                                                                            lot
                                                                                        )
                                                                                    }
                                                                                    className="text-indigo-600 hover:text-indigo-900"
                                                                                >
                                                                                    Locate
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <APIProvider apiKey={apiKey}>
                    {/*  */}
                    {isOpen && (
                        <div
                            onClick={() => openHandler(data)}
                            className="fixed inset-0 bg-black/60 z-[1000]"
                        ></div>
                    )}
                    {isOpen && (
                        <div className="fixed z-[1000] top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 w-full max-w-md border rounded-lg shadow bg-gray-950 border-gray-700 max-h-[25rem] overflow-y-auto">
                            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last pb-10">
                                <div>
                                    <button
                                        onClick={() => openHandler(data)}
                                        className="fixed top-2 right-2 inline-block text-gray-50 border border-gray-50 bg-red-500 hover:bg-red-600 focus:ring-2 focus:outline-none focus:ring-red-700 rounded-lg text-sm p-1.5"
                                        type="button"
                                    >
                                        <span className="sr-only">
                                            Close Profile
                                        </span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18 18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                                <div className="absolute text-white text-sm flex items-center gap-2 right-4 mt-4"></div>
                                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                                    {data.status === "occupied" ? (
                                        <>
                                            <div className="mt-6 text-white space-y-2">
                                                <div>
                                                    <h2 className="font-medium">
                                                        Personal Information:
                                                    </h2>
                                                    <div className="space-y-4">
                                                        {data.deceased_information.map(
                                                            (data) => {
                                                                return (
                                                                    <ul className="text-sm">
                                                                        <li>
                                                                            Name
                                                                            of
                                                                            the
                                                                            Deceased:{" "}
                                                                            {
                                                                                data.deceased_name
                                                                            }
                                                                        </li>
                                                                        <li>
                                                                            Date
                                                                            of
                                                                            Birth:{" "}
                                                                            {
                                                                                data.date_of_birth
                                                                            }
                                                                        </li>
                                                                        <li>
                                                                            Date
                                                                            of
                                                                            Death:{" "}
                                                                            {
                                                                                data.date_of_death
                                                                            }
                                                                        </li>
                                                                        <li>
                                                                            Gender:{" "}
                                                                            {
                                                                                data.gender
                                                                            }
                                                                        </li>
                                                                    </ul>
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h2 className="font-medium">
                                                        Location:
                                                    </h2>
                                                    <div>
                                                        <ul className="text-sm">
                                                            <li>
                                                                Type of Lot:{" "}
                                                                {
                                                                    data.type_of_lot
                                                                }
                                                            </li>
                                                            <li>
                                                                Block number:{" "}
                                                                {
                                                                    data.block
                                                                        .block_no
                                                                }
                                                            </li>
                                                            <li>
                                                                Lot number:{" "}
                                                                {data.lot_no}
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h2 className="font-medium">
                                                        Lot Owner:
                                                    </h2>
                                                    <div>
                                                        <ul className="text-sm">
                                                            <li>
                                                                Owner name:{" "}
                                                                {data.lot_owner}
                                                            </li>
                                                            <li>
                                                                Relationship to
                                                                the deceased:{" "}
                                                                {
                                                                    data.lot_owner_relationship
                                                                }
                                                            </li>
                                                            <li>
                                                                Contact number:{" "}
                                                                {
                                                                    data.contact_no
                                                                }
                                                            </li>
                                                            <li>
                                                                Email Address:{" "}
                                                                {
                                                                    data.email_address
                                                                }
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : data.status === "sold" ? (
                                        <div className="mt-6 text-white">
                                            <div className="flex items-center gap-2 text-white">
                                                <div className="bg-yellow-500 h-6 w-6 rounded-full"></div>
                                                <span>Sold</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="mt-6 text-white">
                                            <div className="flex items-center gap-2 text-white">
                                                <div className="bg-green-500 h-6 w-6 rounded-full"></div>
                                                <span>Available</span>
                                                {data.deceased_information.map(
                                                    (x) => x.deceased_name
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </main>
                        </div>
                    )}
                    {/*  */}

                    <Map
                        style={{ width: "100vw", height: "100vh" }}
                        defaultCenter={{
                            lat: 16.148604220447968,
                            lng: 119.98441200151508,
                        }}
                        defaultZoom={19}
                        gestureHandling={"greedy"}
                        disableDefaultUI={true}
                        mapTypeId="hybrid"
                        mapId={"9bcd2ff1f48ef8a4"}
                        options={{ scrollwheel: false }}
                    >
                        {deceasedList.map((list, idx) => {
                            return (
                                <AdvancedMarker
                                    key={list.id + idx}
                                    position={{
                                        lat: list.latitude,
                                        lng: list.longitude,
                                    }}
                                    onClick={() => openHandler(list)}
                                >
                                    <div
                                        className={`h-4 border w-10 rounded ${
                                            list.status === "occupied"
                                                ? "bg-red-600"
                                                : list.status === "available"
                                                ? "bg-green-600"
                                                : list.status === "sold"
                                                ? "bg-yellow-400"
                                                : ""
                                        }`}
                                    >
                                        {list.lot_no}
                                    </div>
                                </AdvancedMarker>
                            );
                        })}
                    </Map>
                </APIProvider>
            </div>
        </>
    );
}
