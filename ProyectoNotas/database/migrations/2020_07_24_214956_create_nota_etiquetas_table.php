<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotaEtiquetasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nota_etiquetas', function (Blueprint $table) {
            $table->id();

            $table->foreignId("nota_id")->references("id")->on("notas") ->onDelete('cascade');
            $table->foreignId("etiqueta_id")->references("id")->on("etiquetas") ->onDelete('cascade');
            $table->timestamps();




        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nota_etiquetas');
    }
}
