import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head, Link } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ blocks }) {
    const [deceasedEntries, setDeceasedEntries] = useState([
        { deceased_name: "", date_of_birth: "", date_of_death: "", gender: "" },
    ]);

    const { data, setData, post, processing, reset, errors } = useForm({
        deceased_information: [
            {
                deceased_name: "",
                date_of_birth: "",
                date_of_death: "",
                gender: "",
            },
        ],
        type_of_lot: "",
        block_no: "",
        lot_no: "",
        lot_owner: "",
        lot_owner_relationship_to_deceased: "",
        contact_no: "",
        email_address: "",
    });

    const handleAddEntry = () => {
        const newEntry = {
            deceased_name: "",
            date_of_birth: "",
            date_of_death: "",
            gender: "",
        };
        const updatedEntries = [...deceasedEntries, newEntry];
        setDeceasedEntries(updatedEntries);
        setData("deceased_information", updatedEntries); // Sync with useForm
    };

    const [selectedBlockNo, setSelectedBlockNo] = useState(""); // Track selected block

    // Get the lots of the selected block
    const availableLots =
        blocks
            .find((block) => {
                // Compare the block_no correctly
                console.log("Checking Block:", block.block_no);
                return block.block_no.toString() === selectedBlockNo.toString(); // Ensure correct type comparison
            })
            ?.lots?.filter((lot) => lot.status === "available") || [];

    const handleRemoveEntry = (index) => {
        const updatedEntries = deceasedEntries.filter((_, i) => i !== index);
        setDeceasedEntries(updatedEntries);
        setData("deceased_information", updatedEntries); // Sync with useForm
    };

    const handleInputChange = (index, field, value) => {
        const updatedEntries = deceasedEntries.map((entry, i) =>
            i === index ? { ...entry, [field]: value } : entry
        );
        setDeceasedEntries(updatedEntries);
        setData("deceased_information", updatedEntries); // Sync with useForm
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("lists-of-deceased.store"), {
            onSuccess: () => {
                reset(); // Reset the form
                setDeceasedEntries([
                    {
                        deceased_name: "",
                        date_of_birth: "",
                        date_of_death: "",
                        gender: "",
                    },
                ]); // Reset deceasedEntries
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Create List of Deceased" />

            <div className="py-12">
                <form onSubmit={submit}>
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    Create new
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
                                    className="block text-sm/6 font-medium text-gray-900"
                                >
                                    Available Block
                                </label>
                                <div className="mt-2">
                                    <select
                                        onChange={(e) => {
                                            const blockNo = e.target.value;

                                            // Update both the block_no and reset lot_no when block_no changes
                                            setData((prevData) => {
                                                // Only reset lot_no if the block_no has changed
                                                const updatedData = {
                                                    ...prevData,
                                                    block_no: blockNo,
                                                };

                                                // If block_no changes, reset lot_no to empty string
                                                if (
                                                    prevData.block_no !==
                                                    blockNo
                                                ) {
                                                    updatedData.lot_no = "";
                                                }

                                                return updatedData;
                                            });

                                            setSelectedBlockNo(blockNo); // Update selected block for UI
                                        }}
                                        id="block_no"
                                        value={selectedBlockNo}
                                        name="block_no"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    >
                                        <option value="" disabled>
                                            Select Block
                                        </option>
                                        {blocks.map((block) => {
                                            return (
                                                <option
                                                    key={block.id}
                                                    value={block.block_no}
                                                >
                                                    {block.block_no}
                                                </option>
                                            );
                                        })}
                                    </select>
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
                                    {selectedBlockNo && (
                                        <select
                                            onChange={(e) =>
                                                setData(
                                                    "lot_no",
                                                    e.target.value
                                                )
                                            } // Use setData for form submission
                                            id="lot_no"
                                            value={data.lot_no}
                                            name="lot_no"
                                            className="block w-full  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                        >
                                            <option value="" disabled>
                                                Select Lot
                                            </option>
                                            {availableLots.map((lot) => (
                                                <option
                                                    key={lot.id}
                                                    value={lot.no}
                                                >
                                                    {lot.lot_no}{" "}
                                                    {/* Replace with desired lot property */}
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
                                                Deceased Date of Birth
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
                                                Deceased Date of Death
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
                                                Deceased Gender
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
                                                className="..."
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
                                        value={data.lot_owner}
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
                                            data.lot_owner_relationship_to_deceased
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
