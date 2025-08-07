<?php

namespace App\Http\Controllers;

use DB;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    /**
     * Display a listing of the transactions with search, filter, and pagination.
     */
    public function index(Request $request)
    {
        $query = DB::table('transactions')
            ->join('buyers', 'transactions.buyer_id', '=', 'buyers.id')
            ->join('product_transactions', 'transactions.id', '=', 'product_transactions.transaction_id')
            ->join('products', 'product_transactions.product_id', '=', 'products.id')
            ->select(
                'transactions.transaction_number',
                'transactions.transaction_date',
                'transactions.status',
                'buyers.name as buyer_name',
                'product_transactions.qty',
                DB::raw('(products.harga_jual * product_transactions.qty) as total_harga')
            );

        // Search by transaction number or buyer name
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function($q) use ($search) {
                $q->where('transactions.transaction_number', 'like', "%$search%")
                  ->orWhere('buyers.name', 'like', "%$search%") ;
            });
        }

        // Filter terbaru/terlama
        $order = $request->input('order', 'desc'); // default terbaru
        $query->orderBy('transactions.transaction_date', $order);

        // Pagination
        $transactions = $query->paginate(10);

        return response()->json($transactions);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
