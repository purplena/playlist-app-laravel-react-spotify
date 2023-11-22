<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('blacklists', function (Blueprint $table) {
      $table->id();
      $table->foreignId('company_id')->constrained();
      $table->foreignId('song_id')->constrained();
      // $table->unsignedBigInteger('company_id');
      // $table->unsignedBigInteger('song_id');
      // $table->foreign('company_id')->references('id')->on('companies');
      // $table->foreign('song_id')->references('id')->on('songs');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('blacklists');
  }
};
