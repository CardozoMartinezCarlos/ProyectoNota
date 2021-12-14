<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
class UserController extends Controller
{
    public function index()
    {
        try {
            $listausuario = User::all();
            return response()->json([
                "res" => "success",
                "data" => $listausuario
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener lista de los Usuarios"
            ], 500);
        }
    }


    public function show($id)
    {
        try {
            $objUser = User::findOrFail($id);
            if ($objUser == null) {
                return response()->json([
                    "res" => "error",
                    "message" => "Usuario no encontrado"
                ], 404);
            }
            $objUser->password = "";
            return response()->json([
                "res" => "success",
                "data" => $objUser
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al obtener el Usuario"
            ], 500);
        }
    }


    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->json()->all(), [
            'name' => 'required',
            'email' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                "res" => "error",
                "message" => $validator->messages()
            ]);
        }
        try {
            $objUser = User::findOrFail($id);
            if ($objUser == null) {
                return response()->json([
                    "res" => "error",
                    "message" => "Autor no encontrado"
                ], 404);
            }
            $objUser = User::findOrFail($id);
            $name = $request->name;
            $email = $request->email;
            $password = bcrypt($request->json('password'));
            $objUser->name = $name;
            $objUser->email = $email;
            error_log($request->password);
            if($request->password != ""){
                $objUser->password = $password;
                error_log("Cambio contraseña");
            }

            $objUser->save();
            return response()->json([
                "res" => "success",
                "data" => $objUser
            ]);
        } catch (\Exception $e) {
            report($e);
            return response()->json([
                "res" => "error",
                "message" => "Error al guardar el Usuario"
            ], 500);
        }
    }

    public function destroy($id)
    {

        try {
            $objUser = User::find($id);
            $objUser->delete();
            $info = ['nombre' => 'Rafael'];
            return response()->json($info,204);
        } catch (\Exception $e) {
            $info = ['estado' => 'error'];
            return response()->json($info,501);
        }
    }




}
