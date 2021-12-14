<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Etiquetas extends Model
{
    public $timestamps = false;
    protected $fillable = [
        'nombre'
    ];
    public function nota(){
        return $this->belongsTo(Nota::class);
    }

    public function scopeNombre($query,$nombre){
        if($nombre)
            return $query->orWhere('nombre','LIKE',"%$nombre%");
    }

}
