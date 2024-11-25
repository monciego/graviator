<?php

namespace App\Http\Controllers;

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
    public function store(Request $request)
    {
        dd($request);
        $validated = $request->validate([
            "deceased_name" => 'required|string|max:255',
            "deceased_date_of_birth"  => 'required|string|max:255',
            "deceased_date_of_death"  => 'required|string|max:255',
            "deceased_gender"  => 'required|string|max:255',
            "type_of_lot"  => 'required|string|max:255',
            "block_no"  => 'required|string|max:255',
            "lot_no"  => 'required|string|max:255',
            "owner_name"  => 'required|string|max:255',
            "relationship_to_deceased"  => 'required|string|max:255',
            "contact_no"  => 'required|string|max:255',
            "email_address"  => 'required|string|max:255|email',
        ]);


        DeceasedList::create($validated);

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
    public function edit(DeceasedList $listsOfDeceased)
    {
        return Inertia::render("DeceasedLists/Edit", [
            "deceased" => $listsOfDeceased
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DeceasedList $listsOfDeceased)
    {
        $validated = $request->validate([
            "deceased_name" => 'required|string|max:255',
            "deceased_date_of_birth"  => 'required|string|max:255',
            "deceased_date_of_death"  => 'required|string|max:255',
            "deceased_gender"  => 'required|string|max:255',
            "type_of_lot"  => 'required|string|max:255',
            "block_no"  => 'required|string|max:255',
            "lot_no"  => 'required|string|max:255',
            "owner_name"  => 'required|string|max:255',
            "relationship_to_deceased"  => 'required|string|max:255',
            "contact_no"  => 'required|string|max:255',
            "email_address"  => 'required|string|max:255|email',
        ]);

        $listsOfDeceased->update($validated);

        return redirect(route('lists-of-deceased.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeceasedList $listsOfDeceased)
    {
        $listsOfDeceased->delete();
    }
}
