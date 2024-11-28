import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Dashboard({ deceasedList }) {
    const [selectedService, setSelectedService] = useState(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        date: "",
        type: "",
        category: "",
        amount: 0,
        time: "",
        deceased_information_id: "",
    });

    // Synchronize selectedService with form data
    useEffect(() => {
        if (selectedService) {
            setData({
                ...data,
                type: selectedService.name,
                category: selectedService.category,
                amount: selectedService.amount,
            });
        }
    }, [selectedService]);

    const submit = (e) => {
        e.preventDefault();
        post(route("services.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    const services = [
        {
            category: "Interment",
            options: [
                { name: "New", amount: 35000 },
                { name: "Reopen", amount: 43000 },
                { name: "Recycle (1st layer)", amount: 43000 },
                { name: "Recycle (2nd layer)", amount: 45000 },
            ],
        },
        {
            category: "Landscaping",
            options: [
                { name: "Ordinary", amount: 1500 },
                { name: "Special", amount: 3500 },
            ],
        },
        {
            category: "Special Lot Maintenance",
            options: [
                { name: "Annual", amount: 2000 },
                { name: "Monthly", amount: 250 },
            ],
        },
        {
            category: "Burial Transfer",
            options: [{ name: "Per name", amount: 15000 }],
        },
    ];

    const timeSlots = [
        "8-9",
        "9-10",
        "10-11",
        "11-12",
        "12-1",
        "1-2",
        "2-3",
        "3-4",
        "4-5",
    ];

    const handleSelectService = (category, serviceName) => {
        const service = services
            .find((s) => s.category === category)
            ?.options.find((option) => option.name === serviceName);

        setSelectedService({ category, ...service });
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Services
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 px-4">
                <div className="p-4">
                    <h2 className="text-xl font-bold mb-4">Services Table</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border-b px-4 py-2 text-left">
                                        Service Type
                                    </th>
                                    <th className="border-b px-4 py-2 text-left">
                                        Type
                                    </th>
                                    <th className="border-b px-4 py-2 text-right">
                                        Amount
                                    </th>
                                    <th className="border-b px-4 py-2 text-center">
                                        Select
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((service) =>
                                    service.options.map((option, index) => (
                                        <tr
                                            key={`${service.category}-${index}`}
                                        >
                                            {index === 0 && (
                                                <td
                                                    rowSpan={
                                                        service.options.length
                                                    }
                                                    className="border-r px-4 py-2 align-top"
                                                >
                                                    {service.category}
                                                </td>
                                            )}
                                            <td className="border-b px-4 py-2">
                                                {option.name}
                                            </td>
                                            <td className="border-b px-4 py-2 text-right">
                                                {option.amount.toLocaleString()}{" "}
                                                pesos
                                            </td>
                                            <td className="border-b px-4 py-2 text-center">
                                                <input
                                                    type="radio"
                                                    name="selectedService"
                                                    checked={
                                                        selectedService?.category ===
                                                            service.category &&
                                                        selectedService?.name ===
                                                            option.name
                                                    }
                                                    onChange={() =>
                                                        handleSelectService(
                                                            service.category,
                                                            option.name
                                                        )
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {selectedService && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-4">
                                {selectedService.category} -{" "}
                                {selectedService.name} (
                                {selectedService.amount.toLocaleString()} pesos)
                            </h3>

                            <form onSubmit={submit}>
                                <input
                                    type="text"
                                    name="type"
                                    value={
                                        selectedService && selectedService.name
                                    }
                                    onChange={(e) =>
                                        setData("type", e.target.value)
                                    }
                                />

                                <input
                                    type="text"
                                    name="category"
                                    value={
                                        selectedService &&
                                        selectedService.category
                                    }
                                    onChange={(e) =>
                                        setData("category", e.target.value)
                                    }
                                />

                                <input
                                    type="text"
                                    name="amount"
                                    value={
                                        selectedService &&
                                        selectedService.amount
                                    }
                                    onChange={(e) =>
                                        setData("amount", e.target.value)
                                    }
                                />

                                <div className="mb-4">
                                    <label className="block mb-2 font-medium">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={data.date}
                                        onChange={(e) =>
                                            setData("date", e.target.value)
                                        }
                                        className="w-full px-4 py-2 border rounded"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2 font-medium">
                                        Time
                                    </label>
                                    <select
                                        name="time"
                                        value={data.time}
                                        onChange={(e) =>
                                            setData("time", e.target.value)
                                        }
                                        className="w-full px-4 py-2 border rounded"
                                        required
                                    >
                                        <option value="">Choose Time</option>
                                        {timeSlots.map((slot, index) => (
                                            <option key={index} value={slot}>
                                                {slot}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Deceased Selection */}
                                <div className="form-group">
                                    <label
                                        htmlFor="deceased_information_id"
                                        className="block mb-2 font-medium"
                                    >
                                        Select Deceased Individual
                                    </label>
                                    <select
                                        id="deceased_information_id"
                                        name="deceased_information_id"
                                        className="w-full px-4 py-2 border rounded"
                                        value={data.deceased_information_id}
                                        onChange={(e) =>
                                            setData(
                                                "deceased_information_id",
                                                e.target.value
                                            )
                                        }
                                        required
                                    >
                                        <option value="">-- Select --</option>
                                        {deceasedList.map((deceased) => (
                                            <option
                                                key={deceased.id}
                                                value={deceased.id}
                                            >
                                                {deceased.deceased_name} (
                                                {deceased.date_of_birth} -{" "}
                                                {deceased.date_of_death})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-4"
                                >
                                    Submit Booking
                                </button>
                            </form>

                            {/* Unique field for some services */}
                            {/*                             {(selectedService.category === "Interment" ||
                      selectedService.category ===
                                    "Burial Transfer") && (
                                <div className="mb-4">
                                    <label className="block mb-2 font-medium">
                                        Additional Information
                                    </label>
                                    <textarea
                                        name="additionalInfo"
                                        value={``}
                                        placeholder="Enter additional information here (e.g., deceased name)"
                                        className="w-full px-4 py-2 border rounded"
                                        rows={3}
                                    ></textarea>
                                </div>
                            )}  */}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
