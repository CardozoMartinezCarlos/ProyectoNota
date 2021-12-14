<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Items extends Model
{
    public $timestamps = false;
    protected $fillable = [
         'texto', 'estado','orden ','nota_id'
    ];
    public function nota(){
        return $this->belongsTo(Nota::class);
    }
}
