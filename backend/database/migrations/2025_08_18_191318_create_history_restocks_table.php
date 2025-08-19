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
        Schema::create('history_restocks', function (Blueprint $table) {
            $table->id();
            $table->decimal('harga_jual', 10, 2); // Price of the product and this not history price
            $table->decimal('harga_modal', 10, 2); // Price of the product and this not history price
            $table->integer('stock')->default(0); // Stock quantity of the product
            $table->date('date'); // Date of the restock
            $table->foreignId('product_id')->constrained('products')->onDelete('restrict');
            $table->index(['product_id', 'date'], 'idx_history_restocks_pid_date');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('history_restocks');
    }
};
