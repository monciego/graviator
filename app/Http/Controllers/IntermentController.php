<?php

namespace App\Http\Controllers;

use App\Models\Interment;
use Illuminate\Http\Request;

class IntermentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $validated = $request->validate([
            'deceased_information_id' => 'required|exists:deceased_information,id',
            'type' => 'required|string',
            'category' => 'required|string',
            'amount' => 'required|integer',
            'date' => 'required|date',
            'time' => 'required|string',
        ]);

        // Create the interment record
        Interment::create($validated);
        dd("saved");
    }

    /**
     * Display the specified resource.
     */
    public function show(Interment $interment)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Interment $interment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Interment $interment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Interment $interment)
    {
        //
    }
}
