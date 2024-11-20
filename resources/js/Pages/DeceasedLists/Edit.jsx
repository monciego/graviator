import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head, Link } from "@inertiajs/react";

export default function Edit({ deceased }) {
    const { data, setData, patch, processing, reset, errors } = useForm({
        deceased_name: deceased.deceased_name,
        deceased_date_of_birth: deceased.deceased_date_of_birth,
        deceased_date_of_death: deceased.deceased_date_of_death,
        deceased_gender: deceased.deceased_gender,
        type_of_lot: deceased.type_of_lot,
        block_no: deceased.block_no,
        lot_no: deceased.lot_no,
        owner_name: deceased.owner_name,
        relationship_to_deceased: deceased.relationship_to_deceased,
        contact_no: deceased.contact_no,
        email_address: deceased.email_address,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route("lists-of-deceased.update", deceased.id), {
            onSuccess: () => reset(),
        });
    };
    return (
        <AuthenticatedLayout>
            <Head title="Edit List of Deceased" />

            <div className="py-12">
                <form onSubmit={submit}>
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    Edit Information
                                </h1>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <h2 className="font-medium">
                                    Personal Information
                                </h2>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="deceased_name"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Deceased Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) =>
                                            setData(
                                                "deceased_name",
                                                e.target.value
                                            )
                                        }
                                        id="deceased_name"
                                        value={data.deceased_name}
                                        name="city"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="deceased_date_of_birth"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Deceased Date of Birth
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) =>
                                            setData(
                                                "deceased_date_of_birth",
                                                e.target.value
                                            )
                                        }
                                        value={data.deceased_date_of_birth}
                                        id="deceased_date_of_birth"
                                        name="deceased_date_of_birth"
                                        type="date"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="deceased_date_of_death"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Deceased Date of Death
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) =>
                                            setData(
                                                "deceased_date_of_death",
                                                e.target.value
                                            )
                                        }
                                        value={data.deceased_date_of_death}
                                        id="deceased_date_of_death"
                                        name="deceased_date_of_death"
                                        type="date"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="deceased_gender"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Deceased Gender
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) =>
                                            setData(
                                                "deceased_gender",
                                                e.target.value
                                            )
                                        }
                                        value={data.deceased_gender}
                                        id="deceased_gender"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <h2 className="font-medium">Location</h2>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="type_of_lot"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Type of Lot
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) =>
                                            setData(
                                                "type_of_lot",
                                                e.target.value
                                            )
                                        }
                                        value={data.type_of_lot}
                                        id="type_of_lot"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="block_no"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Block Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) =>
                                            setData("block_no", e.target.value)
                                        }
                                        value={data.block_no}
                                        id="block_no"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="lot_no"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Lot Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) =>
                                            setData("lot_no", e.target.value)
                                        }
                                        value={data.lot_no}
                                        id="lot_no"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <h2 className="font-medium">Lot Owner</h2>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="owner_name"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Owner Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) =>
                                            setData(
                                                "owner_name",
                                                e.target.value
                                            )
                                        }
                                        value={data.owner_name}
                                        id="owner_name"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="relationship_to_deceased"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Relationship to the Deceased
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) =>
                                            setData(
                                                "relationship_to_deceased",
                                                e.target.value
                                            )
                                        }
                                        value={data.relationship_to_deceased}
                                        id="relationship_to_deceased"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="contact_no"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Contact Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) =>
                                            setData(
                                                "contact_no",
                                                e.target.value
                                            )
                                        }
                                        value={data.contact_no}
                                        id="contact_no"
                                        type="number"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="email_address"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Email Address
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) =>
                                            setData(
                                                "email_address",
                                                e.target.value
                                            )
                                        }
                                        value={data.email_address}
                                        id="email_address"
                                        type="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <Link href={route("lists-of-deceased.index")}>
                                <button
                                    type="button"
                                    className="text-sm/6 font-semibold text-gray-900"
                                >
                                    Cancel
                                </button>
                            </Link>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
