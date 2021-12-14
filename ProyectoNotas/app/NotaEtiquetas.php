<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class NotaEtiquetas extends Model
{

    public $timestamps = false;
    protected $fillable = [
        'nota_id', 'etiqueta_id'
    ];
    public function nota(){
        return $this->belongsTo(Nota::class);
    }
    public function etiqueta(){
        return $this->belongsTo(Etiquetas::class);
    }
}
