<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users|regex:/^[\w\.-]+@[\w\.-]+\.[a-z]{2,}$/i',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create($validatedData);

        $token = $user->createToken($request->name)->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
            'message' => 'User registered successfully'
        ];
    }
    public function login(Request $request)
    {
        // Validate the request data
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'errors' => [
                    'password' => 'The provided credentials are incorrect.',
                ]
            ];
        }

        $token = $user->createToken($user->name)->plainTextToken;

        return [
            'user' => $user,
            'token' => $token,
            'message' => 'User logged in successfully'
        ];
    }
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return [
            'message' => 'User logged out successfully'
        ];
    }
}
