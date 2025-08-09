<?php

namespace App\Models;

use App\Models\Buyer;
use App\Models\Product;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Transaction extends Model
{
    use HasFactory;
    /**
     * The Products that belong to the Transaction
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_transactions', 'transaction_id', 'product_id')
                ->withPivot(['quantity', 'harga_jual','harga_modal','notes']); // tambahkan nama atribut pivot yang dibutuhkan
    }
    /**
     * Get the buyer that owns the Transaction
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function buyer(): BelongsTo
    {
        return $this->belongsTo(Buyer::class, 'buyer_id', 'id');
    }
}
