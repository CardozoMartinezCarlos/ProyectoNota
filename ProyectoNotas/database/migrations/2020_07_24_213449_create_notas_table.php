<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notas', function (Blueprint $table) {
            $table->id();
            $table->string("titulo");
            $table->string("texto");
            $table-> date("fechahora");
            $table-> string("color") ;
            $table->string("estado");
            $table->bigInteger("user_id")->unsigned();
            $table->foreign('user_id')->references('id')->on('users')
                ->cascadeOnDelete('set null')
                ->cascadeOnUpdate('cascade');

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
        Schema::dropIfExists('notas');
    }
}
