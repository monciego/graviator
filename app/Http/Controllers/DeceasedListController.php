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
        return Inertia::render("DeceasedLists/Index");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(DeceasedList $deceasedList)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DeceasedList $deceasedList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DeceasedList $deceasedList)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeceasedList $deceasedList)
    {
        //
    }
}
