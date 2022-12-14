<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('designs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bigcommerce_store_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('heading_font_family')->nullable();
            $table->string('heading_font_size', 10)->nullable();
            $table->string('heading_font_weight', 10)->nullable();
            $table->string('heading_colour', 10)->nullable();
            $table->string('text_font_family')->nullable();
            $table->string('text_font_size', 10)->nullable();
            $table->string('text_colour', 10)->nullable();
            $table->string('price_font_family')->nullable();
            $table->string('price_font_size', 10)->nullable();
            $table->string('price_font_weight', 10)->nullable();
            $table->string('price_colour', 10)->nullable();
            $table->string('sale_price_font_size', 10)->nullable();
            $table->string('sale_price_font_weight', 10)->nullable();
            $table->string('sale_price_colour', 10)->nullable();
            $table->string('link_colour', 10)->nullable();
            $table->string('link_hover_colour', 10)->nullable();
            $table->string('button_font_family')->nullable();
            $table->string('button_font_weight', 10)->nullable();
            $table->string('button_font_size', 10)->nullable();
            $table->string('button_colour', 10)->nullable();
            $table->string('button_hover_colour', 10)->nullable();
            $table->string('button_text_colour', 10)->nullable();
            $table->string('button_hover_text_colour', 10)->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blocks');
    }
};
