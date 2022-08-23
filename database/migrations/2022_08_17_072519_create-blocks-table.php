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
            $table->uuid('id')->primary();
            $table->foreignId('bigcommerce_store_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->integer('channel_id');
            $table->foreignId('design_id')->nullable()->constrained()->nullOnDelete();
            $table->string('block_type');
            $table->string('valid_domain');
            $table->text('graphql_access_token')->nullable();
            $table->string('graphql_access_token_domain')->nullable();
            $table->dateTime('graphql_access_token_expires_at')->nullable();
            $table->jsonb('graphql_filters')->nullable();
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
