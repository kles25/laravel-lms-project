<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreBatchRequest;
use App\Http\Resources\BatchResource;
use App\Models\Batch;

class BatchController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BatchResource::collection(Batch::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBatchRequest $request)
    {
        $batch = Batch::create($request->validated());

        // Assuming you have the students' user_ids in the request
        $batch->students()->attach($request->input('students'));

        return response()->json(['message' => 'Batch created successfully', 'batch' => $batch], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($batchId)
    {
        $batch = Batch::with('students')->find($batchId);
        return response()->json(['students' => $batch->students], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
