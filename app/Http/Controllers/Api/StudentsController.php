<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Students;
use App\Models\User;
use App\Http\Resources\StudentsResource;
use App\Http\Requests\StoreStudentsRequest;
use App\Http\Requests\UpdateStudentsRequest;
use Illuminate\Support\Facades\DB;
use Exception;

class StudentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return StudentsResource::collection(Students::query()->orderBy('id', 'desc')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentsRequest $request)
    {
        $data = $request->validated();

        $student = Students::create($data);

        return response(new StudentsResource($student), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Students $student)
    {
        return new StudentsResource($student);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentsRequest $request, Students $student)
    {
        $data = $request->validated();

        // Handle any specific updates for students

        $student->update($data);

        return new StudentsResource($student);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Students $student)
    {
        $student->delete();

        return response("", 204);
    }
}
