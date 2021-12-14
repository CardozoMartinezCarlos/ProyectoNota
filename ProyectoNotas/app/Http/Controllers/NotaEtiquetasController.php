<?php

namespace App\Http\Controllers;

use App\Etiquetas;
use App\Items;
use App\Nota;
use App\NotaEtiquetas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use DB;
class NotaEtiquetasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try{
            $listNotaEtiqueta= NotaEtiquetas::with('nota','etiqueta')-> get();
        }catch (\Exception $e){
            return response()->json(['res'=>'error','message'=>'hubo un error'], 500);
        }
        return response()->json(['res'=>'sucess', 'data'=> $listNotaEtiqueta], 200);
    }

    public function indexNota()
    {

        $listNotaEtiqueta = DB::table("notas")
            ->select("notas.id", "notas.titulo","notas.texto","notas.fechahora","notas.color","notas.estado","etiquetas.nombre")
                ->leftJoin("nota_etiquetas","nota_etiquetas.nota_id","=","notas.id")
              ->leftJoin("etiquetas","nota_etiquetas.etiqueta_id","=","etiquetas.id")
                ->get();





        return response()->json(['res' => 'succes','data'=>$listNotaEtiqueta]);


    }



//    public function BuscarEtiqueta(Request $request)
//    {
//
//        $nombre = $request->nombre;
//
//
//        $listNotaEtiqueta = DB::table("notas")
//            ->select("notas.id", "notas.titulo","notas.texto","notas.fechahora","notas.color","etiquetas.nombre")
//            ->leftJoin("nota_etiquetas","nota_etiquetas.nota_id","=","notas.id")
//            ->leftJoin("etiquetas","nota_etiquetas.etiqueta_id","=","etiquetas.id")
//            ->where('etiquetas.nombre','=',$nombre)
//            ->get();
//
//
//
//
//        return response()->json(['res' => 'success', "data" => $listNotaEtiqueta]);
//
//    }

    public function BuscarEtiqueta(Request $request)
    {

        $nombre = $request->nombre;


        $objBusqueda = DB::table("notas")
            ->select("notas.id", "notas.titulo","notas.texto","notas.fechahora","notas.color","etiquetas.nombre")
            ->leftJoin("nota_etiquetas","nota_etiquetas.nota_id","=","notas.id")
            ->leftJoin("etiquetas","nota_etiquetas.etiqueta_id","=","etiquetas.id")
            ->where('etiquetas.nombre','LIKE',"%$nombre%")
            ->get();

//        $objBusqueda=Etiquetas::with('nota')
//            ->nombre($nombre)
//            ->get();


        return response()->json([
            "res" =>"success",
            "data"=>$objBusqueda
        ]);

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
                'nota_id' => ['required'],
                'etiqueta_id' => ['required'],


            ]);
            if ($validator->fails()) {
                return response()->json(["message"=>$validator->messages()]);

            }
            $objNotaEtiqueta = new NotaEtiquetas();
            $objNotaEtiqueta->nota_id = $request->json('nota_id');
            $objNotaEtiqueta->etiqueta_id = $request->json('etiqueta_id');


            $objNotaEtiqueta->save();
            return response()->json(['res' => 'success', "data" => $objNotaEtiqueta]);

        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\NotaEtiquetas  $notaEtiquetas
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $objNotaEtiqueta = NotaEtiquetas::with('nota','etiqueta')->where('nota_id','=',$id);
        if($objNotaEtiqueta == null){
            return response()->json([
                "res" => "error",
                "message" =>"El item no existe"
            ]);
        }
        return response()->json([
            "res" =>"success",
            "data"=>$objNotaEtiqueta
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\NotaEtiquetas  $notaEtiquetas
     * @return \Illuminate\Http\Response
     */
    public function edit(NotaEtiquetas $notaEtiquetas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\NotaEtiquetas  $notaEtiquetas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $objNotaEtiqueta = NotaEtiquetas::findOrFail($id);
        $nota_id = $request->nota_id;
        $etiqueta_id = $request->etiqueta_id;


        if($nota_id == null){
            return response()->json([
                "res"=>"error",
                "message"=>"eL campo nombre no existe"
            ]);
        }

        if($etiqueta_id == null){
            return response()->json([
                "res"=>"error",
                "message"=>"eL campo nombre no existe"
            ]);
        }



        $objNotaEtiqueta->nota_id = $nota_id;
        $objNotaEtiqueta->nota_id = $etiqueta_id;

        $objNotaEtiqueta->save();
        return response()->json([
            "res" =>"success",
            "data" =>$objNotaEtiqueta
        ]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\NotaEtiquetas  $notaEtiquetas
     * @return \Illuminate\Http\Response
     */
    public function destroy($iItem)
    {
        $objNotaEtiqueta = NotaEtiquetas::find($iItem);
        if ($objNotaEtiqueta == null) {
            return response()->json(['res' => 'error', 'message' => 'Error, ciudad no encontrada']);//status 404
        }
        try {
            $objNotaEtiqueta->delete();
        } catch (\Exception $e) {
            return response()->json(['res' => 'error', 'message' => 'Error al ejecutar consulta']);//status 500
        }
        return response()->json(['res' => true]);

    }

    }
