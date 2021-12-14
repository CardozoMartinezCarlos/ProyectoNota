<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)

    {
        $credentials = request(['email', 'password']);
        if (Auth::attempt($credentials)) {
            $user = $request->user();
            $tokenResult = $user->createToken('Personal Access Token');
//            $token = $tokenResult->token;
            return response()->json([
                "res" => "success",
                'access_token' => $tokenResult->accessToken,
                'user'=>auth()->user()
            ]);
        }
        return response()->json(
            ['res' => 'error',
                'message' => 'Unauthorized'
            ], 401
        );

    }

    public function register(Request $request)
    {
        $objUser = new User();
        $objUser->name = $request->get('name');
        $objUser->email = $request->get('email');
        $objUser->password = bcrypt($request->get('password'));
        $objUser->save();
        return response()->json([
            "res" => "success",
            "data" => $objUser
        ]);
    }

}
