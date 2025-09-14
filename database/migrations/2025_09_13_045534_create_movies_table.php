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
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string("title")->unique();
            $table->text("description")->nullable();
            $table->integer("duration")->nullable();
            $table->string("genre")->nullable();
            $table->string("director")->nullable();
            $table->date("release_date")->nullable();
            $table->string("poster_url")->nullable();
            $table->decimal("rating",3,1)->default(0);
            $table->boolean("is_active")->default(true);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
