import { useEffect, useState } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function AcquiredServices({ acquiredServices }) {
    const [todayServices, setTodayServices] = useState([]);
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD

    useEffect(() => {
        // Fetch services from backend
        axios
            .get("/api/acquired-services")
            .then((response) => {
                setAcquiredServices(response.data);

                // Filter services acquired for today
                const servicesForToday = response.data.filter(
                    (service) => service.date === today
                );
                setTodayServices(servicesForToday);
            })
            .catch((error) => {
                console.error("Error fetching services:", error);
            });
    }, []);

    // Helper to group services by category
    const groupByCategory = (services) => {
        return services.reduce((groups, service) => {
            const category = service.category || "Uncategorized";
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(service);
            return groups;
        }, {});
    };

    const categorizedServices = groupByCategory(acquiredServices);
    const categorizedTodayServices = groupByCategory(todayServices);

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto p-6">
                {/* Section: All Acquired Services */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">
                        All Acquired Services
                    </h2>
                    <div className="overflow-x-auto">
                        {Object.entries(categorizedServices).map(
                            ([category, services]) => (
                                <div key={category} className="mb-6">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {category}
                                    </h3>
                                    <table className="w-full border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border px-4 py-2 text-left">
                                                    Date
                                                </th>
                                                <th className="border px-4 py-2 text-left">
                                                    Type
                                                </th>
                                                <th className="border px-4 py-2 text-left">
                                                    Time
                                                </th>
                                                <th className="border px-4 py-2 text-left">
                                                    Deceased Name
                                                </th>
                                                <th className="border px-4 py-2 text-right">
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {services.map((service, index) => (
                                                <tr
                                                    key={index}
                                                    className={
                                                        index % 2 === 0
                                                            ? "bg-white"
                                                            : "bg-gray-50"
                                                    }
                                                >
                                                    <td className="border px-4 py-2">
                                                        {service.date}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {service.type}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {service.time || "-"}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {service
                                                            .deceased_information
                                                            ?.deceased_name ||
                                                            "-"}
                                                    </td>
                                                    <td className="border px-4 py-2 text-right">
                                                        {service.amount.toLocaleString()}{" "}
                                                        pesos
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Section: Services Acquired for Today */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">
                        Services Acquired for Today ({today})
                    </h2>
                    <div className="overflow-x-auto">
                        {Object.entries(categorizedTodayServices).map(
                            ([category, services]) => (
                                <div key={category} className="mb-6">
                                    <h3 className="text-xl font-semibold mb-2">
                                        {category}
                                    </h3>
                                    <table className="w-full border border-gray-300">
                                        <thead>
                                            <tr className="bg-gray-100">
                                                <th className="border px-4 py-2 text-left">
                                                    Date
                                                </th>
                                                <th className="border px-4 py-2 text-left">
                                                    Type
                                                </th>
                                                <th className="border px-4 py-2 text-left">
                                                    Time
                                                </th>
                                                <th className="border px-4 py-2 text-left">
                                                    Deceased Name
                                                </th>
                                                <th className="border px-4 py-2 text-right">
                                                    Amount
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {services.map((service, index) => (
                                                <tr
                                                    key={index}
                                                    className={
                                                        index % 2 === 0
                                                            ? "bg-white"
                                                            : "bg-gray-50"
                                                    }
                                                >
                                                    <td className="border px-4 py-2">
                                                        {service.date}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {service.type}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {service.time || "-"}
                                                    </td>
                                                    <td className="border px-4 py-2">
                                                        {service
                                                            .deceased_information
                                                            ?.deceased_name ||
                                                            "-"}
                                                    </td>
                                                    <td className="border px-4 py-2 text-right">
                                                        {service.amount.toLocaleString()}{" "}
                                                        pesos
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
