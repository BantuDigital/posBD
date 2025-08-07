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
        Schema::create('cogs_sales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('restrict'); // Foreign key to the products table
            $table->foreignId('transaction_id')->constrained()->onDelete('restrict'); // Foreign key to the products table
            $table->decimal('cost', 10, 2);
            $table->string('component_name'); // Name of the component used in the product, e.g., flour, sugar
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cogs_sales');
    }
};
