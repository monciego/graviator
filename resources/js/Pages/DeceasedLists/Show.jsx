import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({ deceased }) {
    return (
        <AuthenticatedLayout>
            <Head title="List of Deceased" />

            <div className="py-12">
                <div className="px-4 sm:px-6 lg:px-8">
                    <div>
                        <div className="px-4 sm:px-0">
                            <h3 className="text-base/7 font-semibold text-gray-900">
                                Deceased Information
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
                                Personal details, location and lot owner
                                details.
                            </p>
                        </div>
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <h2 className="font-medium">
                                    Personal Information
                                </h2>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Full name of deceased
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {deceased.deceased_name}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Deceased Date of Birth
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {deceased.date_of_birth}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Deceased Date of Death
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {deceased.date_of_death}
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Deceased Gender
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {deceased.gender}
                                    </dd>
                                </div>

                                <h2 className="font-medium">Location</h2>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Type of Lot
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {deceased.lot.type_of_lot}
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Block number
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {deceased.lot.block.block_no}
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Lot number
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {deceased.lot.lot_no}
                                    </dd>
                                </div>

                                <h2 className="font-medium">Lot owner</h2>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Owner name
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {deceased.lot.lot_owner}
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Relationship to the deceased
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {
                                            deceased.lot
                                                .lot_owner_relationship_to_deceased
                                        }
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Contact number
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {deceased.lot.contact_no}
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm/6 font-medium text-gray-900">
                                        Email address
                                    </dt>
                                    <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {deceased.lot.email_address}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
