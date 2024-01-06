<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enrollee;
use App\Http\Requests\StoreEnrolleeRequest;
use App\Http\Requests\UpdateEnrolleeRequest;
use App\Http\Resources\EnrolleeResource;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class EnrolleeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return EnrolleeResource::collection(Enrollee::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEnrolleeRequest $request)
    {
        $data = $request->validated();

        $enrollee = Enrollee::create($data);

        return response(new EnrolleeResource($enrollee), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Enrollee $enrollee)
    {
        return new EnrolleeResource($enrollee);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEnrolleeRequest $request, Enrollee $enrollee)
    {
        $data = $request->validated();

        // Handle image update if needed
        // Add your logic here

        $enrollee->update($data);

        return new EnrolleeResource($enrollee);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Enrollee $enrollee)
    {
        $enrollee->delete();

        return response("", 204);
    }
}
