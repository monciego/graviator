<?php

namespace App\Http\Controllers;

use App\Models\DeceasedList;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeceasedListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $deceasedList = DeceasedList::all();
        return Inertia::render("DeceasedLists/Index", [
            "deceasedList" => $deceasedList
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("DeceasedLists/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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


        DeceasedList::create($validated);

        return redirect(route('lists-of-deceased.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(DeceasedList $listsOfDeceased)
    {
        return Inertia::render("DeceasedLists/Show", [
            "deceased" => $listsOfDeceased
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
    public function destroy(DeceasedList $deceasedList)
    {
        //
    }
}
