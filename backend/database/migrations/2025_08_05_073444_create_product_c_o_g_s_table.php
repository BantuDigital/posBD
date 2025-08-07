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
        // Isnt COGS but product costs
        Schema::create('product_c_o_g_s', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('restrict');
            $table->string('component_name'); // Name of the component used in the product eg. flour, sugar
            $table->decimal('avg_cost', 10, 2); // Cost per unit of the component

            // $table->string('unit'); // Unit of measurement for the component eg. kg, liter, piece
            // $table->decimal('quantity', 10, 2); // Quantity of the component used in the product
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_c_o_g_s');
    }
};
