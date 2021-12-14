<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Nota extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'titulo', 'texto','fechahora','color','estado','user_id'
    ];
    public function etiqueta(){
        return $this->belongsTo(Etiquetas::class);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function scopeTitulo($query,$titulo){
        if($titulo)
            return $query->orWhere('titulo','LIKE',"%$titulo%") ;
    }

    public function scopeTexto($query,$texto){
        if($texto)
            return $query->orWhere('texto','LIKE',"%$texto%");
    }
    public function scopeColor($query,$color){
        if($color)
            return $query->orWhere('color','=',$color);
    }


}
