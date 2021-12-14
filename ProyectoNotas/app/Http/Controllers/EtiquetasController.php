<?php

namespace App\Http\Controllers;

use App\Etiquetas;

use App\Nota;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EtiquetasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $listEtiquetas= Etiquetas::all();
        }catch (\Exception $e){
            return response()->json(['res'=>'error','message'=>'hubo un error'], 500);
        }
        return response()->json(['res'=>'sucess', 'data'=> $listEtiquetas], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        {
            $validator = Validator::make($request->json()->all(), [
                'nombre' => ['required'],


            ]);
            if ($validator->fails()) {
                return response()->json(["message"=>$validator->messages()]);

            }
            $objEtiqueta = new Etiquetas();
            $objEtiqueta->nombre = $request->json('nombre');


            $objEtiqueta->save();
            return response()->json(['res' => 'success', "data" => $objEtiqueta]);

        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Etiquetas  $etiquetas
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $objEtiqueta = Etiquetas::find($id);
        if($objEtiqueta == null){
            return response()->json([
                "res" => "error",
                "message" =>"La nota no existe"
            ]);
        }
        return response()->json([
            "res" =>"success",
            "data"=>$objEtiqueta
        ]);
    }




    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Etiquetas  $etiquetas
     * @return \Illuminate\Http\Response
     */
    public function edit(Etiquetas $etiquetas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Etiquetas  $etiquetas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $objEtiqueta = Etiquetas::findOrFail($id);
        $nombre = $request->nombre;



        if($nombre == null){
            return response()->json([
                "res"=>"error",
                "message"=>"eL campo nombre no existe"
            ]);
        }

        $objEtiqueta->nombre = $nombre;

        $objEtiqueta->save();
        return response()->json([
            "res" =>"success",
            "data" =>$objEtiqueta
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Etiquetas  $etiquetas
     * @return \Illuminate\Http\Response
     */
    public function destroy($idetiqueta)
    {
        $objEtiqueta = Etiquetas::with($idetiqueta);
        if ($objEtiqueta == null) {
            return response()->json(['res' => 'error', 'message' => 'Error, ciudad no encontrada']);//status 404
        }
        try {
            $objEtiqueta->delete();
        } catch (\Exception $e) {
            return response()->json(['res' => 'error', 'message' => 'Error al ejecutar consulta']);//status 500
        }
        return response()->json(['res' => true]);

    }

}
