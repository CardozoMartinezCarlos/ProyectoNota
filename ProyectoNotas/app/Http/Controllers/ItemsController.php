<?php

namespace App\Http\Controllers;

use App\Etiquetas;
use App\Items;
use App\Nota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    try{
            $listItem= Items::all();
        }catch (\Exception $e){
    return response()->json(['res'=>'error','message'=>'hubo un error'], 500);
}
        return response()->json(['res'=>'sucess', 'data'=> $listItem], 200);
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
                'texto' => ['required'],
                'estado' => ['required'],
                'orden' => ['required'],
                'nota_id' => ['required'],

            ]);
            if ($validator->fails()) {
                return response()->json(["message"=>$validator->messages()]);

            }
            $objItem = new Items();
            $objItem->texto = $request->json('texto');
            $objItem->estado = $request->json('estado');
            $objItem->orden = $request->json('orden');
            $objItem->nota_id = $request->json('nota_id');


            $objItem->save();
            return response()->json(['res' => 'success', "data" => $objItem]);

        }


}

    /**
     * Display the specified resource.
     *
     * @param  \App\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $objItem = Items::find($id);
        if($objItem == null){
            return response()->json([
                "res" => "error",
                "message" =>"El item no existe"
            ]);
        }
        return response()->json([
            "res" =>"success",
            "data"=>$objItem
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function edit(Items $items)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $objItem = Items::findOrFail($id);
        $texto = $request->texto;
        $estado = $request->estado;
        $orden = $request->orden;
        $nota_id = $request->nota_id;


        if($texto == null){
            return response()->json([
                "res"=>"error",
                "message"=>"eL campo nombre no existe"
            ]);
        }

        if($estado == null){
            return response()->json([
                "res"=>"error",
                "message"=>"eL campo nombre no existe"
            ]);
        }

        if($orden == null){
            return response()->json([
                "res"=>"error",
                "message"=>"eL campo nombre no existe"
            ]);
        }

        if($nota_id == null){
            return response()->json([
                "res"=>"error",
                "message"=>"eL campo nombre no existe"
            ]);
        }

        $objItem->texto = $texto;
        $objItem->estado = $estado;
        $objItem->orden = $orden;
        $objItem->nota_id = $nota_id;

        $objItem->save();
        return response()->json([
            "res" =>"success",
            "data" =>$objItem
        ]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Items  $items
     * @return \Illuminate\Http\Response
     */
    public function destroy($iItem)
    {

        $objItem = Items::find($iItem);
        if ($objItem == null) {
            return response()->json(['res' => 'error', 'message' => 'Error, ciudad no encontrada']);//status 404
        }
        try {
            $objItem->delete();
        } catch (\Exception $e) {
            return response()->json(['res' => 'error', 'message' => 'Error al ejecutar consulta']);//status 500
        }
        return response()->json(['res' => true]);


    }

}
