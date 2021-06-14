<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePipelineParametersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pipeline_parameters', function (Blueprint $table) {
            $table->char('id' , 32);
            $table->primary('id');
            $table->text('name')->nullable();
            $table->text('type')->nullable();
            $table->integer('required')->nullable();
            $table->text('id_pipeline')->nullable();
            $table->integer('id_status');
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
        Schema::dropIfExists('pipeline_parameters');
    }
}
