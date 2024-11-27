import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head, Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Edit({ deceased, blocks }) {
    console.log(deceased);
    const [selectedBlockNo, setSelectedBlockNo] = useState(
        deceased.lot.block.block_no || ""
    );

    const [deceasedEntries, setDeceasedEntries] = useState(
        deceased.deceased_information || [
            {
                deceased_name: deceased.deceased_name,
                date_of_birth: deceased.date_of_birth,
                date_of_death: deceased.date_of_death,
                gender: deceased.gender,
            },
        ]
    );
    const { data, setData, patch, processing, reset, errors } = useForm({
        deceased_information: deceased.deceased_information || [
            {
                deceased_name: deceased.deceased_name || "",
                date_of_birth: deceased.date_of_birth || "",
                date_of_death: deceased.date_of_death || "",
                gender: deceased.gender || "",
            },
        ],
        type_of_lot: deceased.lot.type_of_lot || "",
        block_no: deceased.lot.block.block_no || "",
        lot_no: deceased.lot.lot_no || "",
        lot_owner: deceased.lot_owner || "",
        lot_owner_relationship_to_deceased:
            deceased.lot_owner_relationship_to_deceased || "",
        contact_no: deceased.contact_no || "",
        email_address: deceased.email_address || "",
    });

    // Get available lots based on the selected block
    const availableLots =
        blocks
            .find(
                (block) =>
                    block.block_no.toString() === selectedBlockNo.toString()
            )
            ?.lots?.filter(
                (lot) =>
                    lot.status === "available" || lot.lot_no === data.lot_no
            ) || [];

    useEffect(() => {
        // Set the selected block_no on mount for the edit form
        if (deceased.lot.block.block_no) {
            setSelectedBlockNo(deceased.lot.block.block_no.toString());
        }
    }, [deceased.lot.block.block_no]);

    const handleBlockChange = (e) => {
        const blockNo = e.target.value;

        setData((prevData) => {
            const updatedData = {
                ...prevData,
                block_no: blockNo,
            };

            // Reset lot_no if block_no changes
            if (prevData.block_no !== blockNo) {
                updatedData.lot_no = "";
            }

            return updatedData;
        });

        setSelectedBlockNo(blockNo); // Update selected block
    };

    const handleAddEntry = () => {
        const newEntry = {
            deceased_name: "",
            date_of_birth: "",
            date_of_death: "",
            gender: "",
        };
        const updatedEntries = [...deceasedEntries, newEntry];
        setDeceasedEntries(updatedEntries);
        setData("deceased_information", updatedEntries);
    };

    const handleRemoveEntry = (index) => {
        const updatedEntries = deceasedEntries.filter((_, i) => i !== index);
        setDeceasedEntries(updatedEntries);
        setData("deceased_information", updatedEntries);
    };

    const handleInputChange = (index, field, value) => {
        const updatedEntries = deceasedEntries.map((entry, i) =>
            i === index ? { ...entry, [field]: value } : entry
        );

        // Update the deceasedEntries state
        setDeceasedEntries(updatedEntries);

        // Sync with useForm's data state
        setData("deceased_information", updatedEntries);
    };

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
                                <h2 className="font-medium">Location</h2>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="block_no"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Available Block
                                </label>
                                <div className="mt-2">
                                    <select
                                        onChange={handleBlockChange}
                                        id="block_no"
                                        value={selectedBlockNo}
                                        name="block_no"
                                        disabled
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                    >
                                        <option value="" disabled>
                                            Select Block
                                        </option>
                                        {blocks.map((block) => (
                                            <option
                                                key={block.id}
                                                value={block.block_no}
                                            >
                                                {block.block_no}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="lot_no"
                                    className="block text-sm font-medium text-gray-900"
                                >
                                    Lot Number
                                </label>
                                <div className="mt-2">
                                    {selectedBlockNo && (
                                        <select
                                            onChange={(e) =>
                                                setData((prevData) => ({
                                                    ...prevData,
                                                    lot_no: e.target.value,
                                                }))
                                            }
                                            disabled
                                            id="lot_no"
                                            value={data.lot_no}
                                            name="lot_no"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                        >
                                            <option value="" disabled>
                                                Select Lot
                                            </option>
                                            {availableLots.map((lot) => (
                                                <option
                                                    key={lot.id}
                                                    value={lot.lot_no}
                                                >
                                                    {lot.lot_no}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="type_of_lot"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Type of Lot
                                </label>
                                <div className="mt-2">
                                    <select
                                        onChange={(e) =>
                                            setData(
                                                "type_of_lot",
                                                e.target.value
                                            )
                                        }
                                        id="type_of_lot"
                                        value={data.type_of_lot}
                                        name="type_of_lot"
                                        className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    >
                                        <option value="" disabled>
                                            Select Type
                                        </option>
                                        <option value="single">Single</option>
                                        <option value="double">Double</option>

                                        <option value="family">Family</option>

                                        <option value="lawn">Lawn</option>
                                    </select>
                                </div>
                            </div>

                            {/*  */}
                            <div className="col-span-full">
                                <h2 className="font-medium">
                                    Personal Information
                                </h2>
                            </div>

                            <div className="col-span-full">
                                {deceasedEntries.map((entry, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-1 gap-4 border p-4 rounded-md mb-4 relative"
                                    >
                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor={`deceased_name_${index}`}
                                                className="block text-sm font-medium text-gray-900"
                                            >
                                                Deceased Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            index,
                                                            "deceased_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    id={`deceased_name_${index}`}
                                                    value={entry.deceased_name}
                                                    type="text"
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor={`date_of_birth_${index}`}
                                                className="block text-sm font-medium text-gray-900"
                                            >
                                                Date of Birth
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            index,
                                                            "date_of_birth",
                                                            e.target.value
                                                        )
                                                    }
                                                    id={`date_of_birth_${index}`}
                                                    value={entry.date_of_birth}
                                                    type="date"
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor={`date_of_death_${index}`}
                                                className="block text-sm font-medium text-gray-900"
                                            >
                                                Date of Death
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            index,
                                                            "date_of_death",
                                                            e.target.value
                                                        )
                                                    }
                                                    id={`date_of_death_${index}`}
                                                    value={entry.date_of_death}
                                                    type="date"
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label
                                                htmlFor={`gender_${index}`}
                                                className="block text-sm font-medium text-gray-900"
                                            >
                                                Gender
                                            </label>
                                            <div className="mt-2">
                                                <select
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            index,
                                                            "gender",
                                                            e.target.value
                                                        )
                                                    }
                                                    id={`gender_${index}`}
                                                    value={entry.gender}
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                >
                                                    <option value="">
                                                        Select Gender
                                                    </option>
                                                    <option value="male">
                                                        Male
                                                    </option>
                                                    <option value="female">
                                                        Female
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        {deceasedEntries.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveEntry(index)
                                                }
                                                className="absolute top-2 right-2 text-red-500"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={handleAddEntry}
                                    className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
                                >
                                    Add Information
                                </button>
                            </div>

                            <div className="col-span-full">
                                <h2 className="font-medium">Lot Owner</h2>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="lot_owner"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Lot Owner Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) =>
                                            setData("lot_owner", e.target.value)
                                        }
                                        value={deceased.lot.lot_owner}
                                        id="lot_owner"
                                        type="text"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="lot_owner_relationship_to_deceased"
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Relationship to the Deceased
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(e) =>
                                            setData(
                                                "lot_owner_relationship_to_deceased",
                                                e.target.value
                                            )
                                        }
                                        value={
                                            deceased.lot
                                                .lot_owner_relationship_to_deceased
                                        }
                                        id="lot_owner_relationship_to_deceased"
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
                                        value={deceased.lot.contact_no}
                                        id="contact_no"
                                        type="text"
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
                                        value={deceased.lot.email_address}
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
