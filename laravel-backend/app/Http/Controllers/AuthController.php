<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    // public function getalluser(){
    //     return response()->json([
    //         'id' => auth()->user()->id,
    //         'email' => auth()->user()->email,
    //         'idClient' => auth()->user()->idClient,
    //     ]);
    // }

    public function login(Request $request) {

        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
           return response()->json(['error' => 'Invalid email or password'], 401);
        }

        // return $this->respondWithToken($token);
        return response()->json([
            'token' => $token,
            'userid' => auth()->user()->idClient
        ]);
    }

    private function respondWithToken($token) {

        return response()->json([
            'token' => $token,
            'access_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }


    // public function logout() {
    //     auth()->logout();
    //     return response()->json(['msg' => 'User successfully logged out']);
    // }


    public function refresh() {
        return $this->respondWithToken(auth()->refresh());
    }

    public function me() {
        return response()->json(auth()->user());
    }
    public function userid() {
        return response()->json(auth()->user()->id);
    }
}
