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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_number')->unique(); // Unique transaction number
            $table->date('transaction_date'); // Date of the transaction
            $table->foreignId('buyer_id')->constrained('buyers')->onDelete('restrict'); // Foreign key to the buyers table
            $table->enum('status', ['process', 'completed', 'cancelled'])->default('process'); // Status of the transaction
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
