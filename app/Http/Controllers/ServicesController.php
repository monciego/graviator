<?php

namespace App\Http\Controllers;

use App\Models\Interment;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServicesController extends Controller
{

    public function index()
    {
        $aquiredServices = Service::with("deceasedInformation")->get();
        return Inertia::render("Services/Index", [
            "acquiredServices" => $aquiredServices
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
  // Validate the request data
    $validated = $request->validate([
        'deceased_information_id' => 'required|exists:deceased_information,id',
        'type' => 'required|string',
        'category' => 'required|string',
        'amount' => 'required|integer',
        'date' => 'required|date',
        'time' => 'required|string',
    ]);

 // Retrieve booked times for the given date and category
    $bookedTimes = Service::where('date', $validated['date'])
        ->where('category', $validated['category'])
        ->where('type', $validated['type'])
        ->pluck('time')
        ->toArray(); // Convert collection to array

    // Check if the requested time is in the array of booked times
    if (in_array($validated['time'], $bookedTimes)) {
        dd("The time '{$validated['time']}' is already booked.");
    }
    // Define booking limits per category
$bookingLimits = [
    'Interment' => 5,
    'Landscaping' => 5,
    'Burial Transfer' => 5,
    'Special Lot Maintenance' => 5,
];

// Get the booking limit for the category
$limit = $bookingLimits[$validated['category']] ?? null;

// Count existing bookings for the same category and type on the selected date
$existingBookingsCount = Service::where('date', $validated['date'])
    ->where('category', $validated['category'])
    ->where('type', $validated['type'])
    ->count();

if ($limit && $existingBookingsCount >= $limit) {
    dd("Booking limit reached.");
    // Optionally throw an exception
    // throw ValidationException::withMessages([
    //     'category' => "The booking limit for {$validated['category']} and type {$validated['type']} has been reached for the selected date.",
    // ]);
}

    // Create the service record
    Service::create($validated);
    return redirect(route('dashboard'));
    }
}
