<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDeceasedRequest;
use App\Models\Block;
use App\Models\DeceasedInformation;
use App\Models\DeceasedList;
use App\Models\Lot;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeceasedListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $blocks = Block::with("lots.deceasedInformation")->get();
        return Inertia::render("DeceasedLists/Index", [
            "blocks" => $blocks
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $blocks = Block::with("lots")->get();
        return Inertia::render("DeceasedLists/Create", [
            "blocks" => $blocks
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDeceasedRequest $request)
    {
    // Extract validated data
    $validated = $request->validated();

    // Get the lot by lot_no
    $lot = Lot::where('lot_no', $validated['lot_no'])->first();

    // Save deceased information
    foreach ($validated['deceased_information'] as $deceasedData) {
        DeceasedInformation::create([
            'lot_id' => $lot->id,
            'deceased_name' => $deceasedData['deceased_name'],
            'date_of_birth' => $deceasedData['date_of_birth'],
            'date_of_death' => $deceasedData['date_of_death'],
            'gender' => $deceasedData['gender'],
        ]);
    }

$lot->update([
    'status' => 'occupied',
    'lot_owner' => $validated['lot_owner'] ?? null,
    'lot_owner_relationship_to_deceased' => $validated['lot_owner_relationship_to_deceased'] ?? null,
    'contact_no' => $validated['contact_no'] ?? null,
    'email_address' => $validated['email_address'] ?? null,
]);
        return redirect(route('lists-of-deceased.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $deceased = DeceasedInformation::with(['lot.block', 'lot'])->findOrFail($id);
        return Inertia::render("DeceasedLists/Show", [
            "deceased" => $deceased
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $blocks = Block::with("lots")->get();
        $deceased = DeceasedInformation::with(['lot.block', 'lot'])->findOrFail($id);
        return Inertia::render("DeceasedLists/Edit", [
            "deceased" => $deceased,
            "blocks" => $blocks
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
/* may error */
/*         $deceased = DeceasedInformation::with(['lot.block', 'lot'])->findOrFail($id); */
        $validated = $request->validate([
            'block_no' => 'required|exists:blocks,block_no',
            'lot_no' => 'required|exists:lots,lot_no',
            'lot_owner' => 'nullable|string|max:255',
            'type_of_lot' => 'nullable|string|max:255',
            'lot_owner_relationship_to_deceased' => 'nullable|string|max:255',
            'contact_no' => 'nullable|string|max:15',
            'email_address' => 'nullable|email|max:255',
            'deceased_information' => 'required|array',
            'deceased_information.*.deceased_name' => 'required|string|max:255',
            'deceased_information.*.date_of_birth' => 'required|date',
            'deceased_information.*.date_of_death' => 'required|date|after_or_equal:deceased_information.*.date_of_birth',
            'deceased_information.*.gender' => 'required|in:male,female',
        ]);

 // Find the existing lot and its associated deceased records
    $lot = Lot::where('lot_no', $validated['lot_no'])->firstOrFail();

    // Retrieve the existing deceased records for the lot
    $existingDeceased = $lot->deceasedInformation;

    // Process the updated deceased information
    $updatedDeceasedData = collect($validated['deceased_information']);

    // Track processed IDs or matched records to avoid duplication
    $processedIds = [];

    foreach ($updatedDeceasedData as $deceasedData) {
        // Attempt to find a matching record by unique attributes
        $existingRecord = $existingDeceased
            ->where('deceased_name', $deceasedData['deceased_name'])
            ->where('date_of_birth', $deceasedData['date_of_birth'])
            ->where('date_of_death', $deceasedData['date_of_death'])
            ->where('gender', $deceasedData['gender'])
            ->first(); // Ensure we get the model instance

        if ($existingRecord) {
            // Update the matched record
            $existingRecord->update([
                'deceased_name' => $deceasedData['deceased_name'],
                'date_of_birth' => $deceasedData['date_of_birth'],
                'date_of_death' => $deceasedData['date_of_death'],
                'gender' => $deceasedData['gender'],
            ]);

            $processedIds[] = $existingRecord->id; // Track this ID
        } else {
            // Create a new record for unmatched data
            $newRecord = DeceasedInformation::create([
                'lot_id' => $lot->id,
                'deceased_name' => $deceasedData['deceased_name'],
                'date_of_birth' => $deceasedData['date_of_birth'],
                'date_of_death' => $deceasedData['date_of_death'],
                'gender' => $deceasedData['gender'],
            ]);

            $processedIds[] = $newRecord->id; // Track this ID
        }
    }

    // Optional: Remove records not in the updated data
    $existingDeceased->whereNotIn('id', $processedIds)->each(function ($record) {
        $record->delete();
    });


        return redirect(route('lists-of-deceased.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $deceased = DeceasedInformation::with(['lot.block', 'lot'])->findOrFail($id);
        $deceased->delete();
    }
}
