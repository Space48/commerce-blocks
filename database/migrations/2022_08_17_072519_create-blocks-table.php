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
        Schema::create('blocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bigcommerce_store_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->integer('channel_id');
            $table->foreignId('design_id')->constrained();
            $table->string('block_type');
            $table->string('valid_domain');
            $table->string('graphql_access_token');
            $table->dateTime('graphql_access_token_expires_at');
            $table->jsonb('graphql_filters');
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
