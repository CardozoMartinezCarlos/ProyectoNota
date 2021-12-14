<?php

namespace App\Http\Controllers;


use DB;

use App\Nota;
use Carbon\Carbon;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Mockery\Matcher\Not;


class NotaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $listNotas= Nota::all();
        }catch (\Exception $e){
            return response()->json(['res'=>'error','message'=>'hubo un error'], 500);
        }
        return response()->json(['res'=>'sucess', 'data'=> $listNotas], 200);
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
                'titulo' => ['required'],
                'texto' => ['required'],
                'color' => ['required'],
                'estado' => ['required'],
                'user_id' => ['required'],

            ]);
            if ($validator->fails()) {
                return response()->json(["message"=>$validator->messages()]);

            }
            $now = Carbon::now();
            $fechaActual = $now ->format('Y/m/d H:i:s');
            $objNota = new Nota();
            $objNota->titulo = $request->json('titulo');
            $objNota->texto = $request->json('texto');
            $objNota->fechahora = $fechaActual;
            $objNota->color = $request->json('color');
            $objNota->estado = $request->json('estado');
            $objNota->user_id = $request->json('user_id');

            $objNota->save();
            $idNota = $objNota->id;
            return response()->json(['user'=>$idNota,'res' => 'success', "data" => $objNota]);

        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Nota  $nota
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $objNota = Nota::find($id);
        if($objNota == null){
            return response()->json([
                "res" => "error",
                "message" =>"La nota no existe"
            ]);
        }
        return response()->json([
            "res" =>"success",
            "data"=>$objNota
        ]);

    }








    public function BuscarNota(Request $request)
    {


        $titulo = $request->titulo;
        $texto = $request->texto;

        $objBusqueda=Nota::with('etiqueta')
            ->titulo($titulo)
            ->texto($texto)->get();


//        $objBusqueda = DB::table("notas")
//            ->select("notas.id", "notas.titulo","notas.texto","notas.fechahora","notas.color","etiquetas.nombre")
//            ->leftJoin("nota_etiquetas","nota_etiquetas.nota_id","=","notas.id")
//            ->leftJoin("etiquetas","nota_etiquetas.etiqueta_id","=","etiquetas.id")
//            ->where('notas.titulo','LIKE',"%$titulo%")
//            ->get();


        return response()->json([
            "res" =>"success",
            "data"=>$objBusqueda
        ]);



    }





    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Nota  $nota
     * @return \Illuminate\Http\Response
     */
    public function edit(Nota $nota)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Nota  $nota
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $objNota = Nota::findOrFail($id);
        $titulo = $request->titulo;
        $texto = $request->texto;
        $estado = $request->estado;
        $user_id = $request->user_id;

        $color= $request->color;
        if($titulo == null){
            return response()->json([
                "res"=>"error",
                "message"=>"eL campo nombre no existe"
            ]);
        }
        if($texto == null){
            return response()->json([
                "res"=>"error",
                "message"=>"eL campo texto no existe"
            ]);
        }
        if($color == null){
            return response()->json([
                "res"=>"error",
                "message"=>"eL campo color no existe"
            ]);
        }
        if($estado == null){
            return response()->json([
                "res"=>"error",
                "message"=>"eL campo color no existe"
            ]);
        }
        $now = Carbon::now();
        $fechaActual = $now ->format('Y/m/d H:i:s');
        $objNota->titulo = $titulo;
        $objNota->texto = $texto;
        $objNota->fechahora = $fechaActual;
        $objNota->color = $color;
        $objNota->estado = $estado;
        $objNota->user_id = $user_id;

        $objNota->save();
        return response()->json([
            "res" =>"success",
            "data" =>$objNota
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Nota  $nota
     * @return \Illuminate\Http\Response
     */
    public function destroy($idnota)
    {
        $objNota = Nota::find($idnota);
        if ($objNota == null) {
            return response()->json(['res' => 'error', 'message' => 'Error, ciudad no encontrada']);//status 404
        }
        try {
            $objNota->delete();
        } catch (\Exception $e) {
            return response()->json(['res' => 'error', 'message' => 'Error al ejecutar consulta']);//status 500
        }
        return response()->json(['res' => true]);

    }
    public function notaId($id)
    {
        $objNota = Nota::with('etiqueta')->where('id','=',$id)->get();
        if($objNota == null){
            return response()->json([
                "res" => "error",
                "message" =>"La nota no existe"
            ]);
        }
        return response()->json([
            "res" =>"success",
            "data"=>$objNota
        ]);
    }
    public function notaIdCreador($id)
    {
//        $objNota = Nota::with('etiqueta')->where('user_id','=',$id)->get();
//        if($objNota == null){
//            return response()->json([
//                "res" => "error",
//                "message" =>"La nota no existe"
//            ]);
//        }
//        return response()->json([
//            "res" =>"success",
//            "data"=>$objNota


        $listNotaEtiqueta = DB::table("notas")
            ->select("notas.id", "notas.titulo","notas.texto","notas.fechahora","notas.color","notas.estado","etiquetas.nombre")
            ->leftJoin("nota_etiquetas","nota_etiquetas.nota_id","=","notas.id")
            ->leftJoin("etiquetas","nota_etiquetas.etiqueta_id","=","etiquetas.id")
            ->where('notas.user_id','=',$id)
            ->get();


        return response()->json(['res' => 'succes','data'=>$listNotaEtiqueta]);

    }







}
