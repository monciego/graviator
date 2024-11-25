import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ blocks }) {
    return (
        <AuthenticatedLayout>
            <Head title="List of Deceased" />

            <div className="py-12">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl font-semibold text-gray-900">
                                List of Deceased
                            </h1>
                            <p className="mt-2 text-sm text-gray-700">
                                A list of all deceased
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            <Link
                                href={route("lists-of-deceased.create")}
                                type="button"
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                            >
                                Create New
                            </Link>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                >
                                                    Block
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >
                                                    Lot
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >
                                                    Deceased Name
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >
                                                    Date of Birth
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >
                                                    Date of Death
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
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
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {blocks.map((block) =>
                                                block.lots.map((lot) =>
                                                    lot.deceased_information.map(
                                                        (deceased) => (
                                                            <tr
                                                                key={
                                                                    deceased.id
                                                                }
                                                            >
                                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                                    {
                                                                        block.block_no
                                                                    }
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                    {lot.lot_no}
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                    {
                                                                        deceased.deceased_name
                                                                    }
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                    {
                                                                        deceased.date_of_birth
                                                                    }
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                    {
                                                                        deceased.date_of_death
                                                                    }
                                                                </td>
                                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                    {
                                                                        deceased.gender
                                                                    }
                                                                </td>
                                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-4">
                                                                    <Link
                                                                        href={route(
                                                                            "lists-of-deceased.show",
                                                                            deceased
                                                                        )}
                                                                        className="text-indigo-600 hover:text-indigo-900"
                                                                    >
                                                                        Show
                                                                        more
                                                                        <span className="sr-only">
                                                                            ,{" "}
                                                                            {
                                                                                deceased.deceased_name
                                                                            }
                                                                        </span>
                                                                    </Link>
                                                                    <Link
                                                                        href={route(
                                                                            "lists-of-deceased.edit",
                                                                            deceased.id
                                                                        )}
                                                                        className="text-green-600 hover:text-green-900"
                                                                    >
                                                                        Edit
                                                                        <span className="sr-only">
                                                                            ,{" "}
                                                                            {
                                                                                deceased.deceased_name
                                                                            }
                                                                        </span>
                                                                    </Link>
                                                                    <Link
                                                                        href={route(
                                                                            "lists-of-deceased.destroy",
                                                                            deceased.id
                                                                        )}
                                                                        method="delete"
                                                                        className="text-red-600 hover:text-red-900"
                                                                    >
                                                                        Delete
                                                                        <span className="sr-only">
                                                                            ,{" "}
                                                                            {
                                                                                deceased.deceased_name
                                                                            }
                                                                        </span>
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        )
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
        </AuthenticatedLayout>
    );
}
