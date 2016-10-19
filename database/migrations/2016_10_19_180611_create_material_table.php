<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMaterialTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
         Schema::create('material', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->integer('grade_id')->unsigned();
            $table->integer('subject_id')->unsigned();
            $table->string('title');
            $table->string('url');
            $table->string('description');
            $table->timestamps();
        });

        Schema::table('material', function ($table) {
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('grade_id')->references('id')->on('grade');
            $table->foreign('subject_id')->references('id')->on('subject');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('material');
    }
}
