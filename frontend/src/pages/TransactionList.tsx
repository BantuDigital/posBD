
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Transaction {
    transaction_number: string;
    transaction_date: string;
    buyer_name: string;
    qty: number;
    total_harga: number;
}

const TransactionList = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState<'desc' | 'asc'>('desc');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchTransactions = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/transactions', {
                    params: {
                        search,
                        order,
                        page,
                    },
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setTransactions(response.data.data);
                setTotalPages(response.data.last_page);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, [search, order, page]);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <div className="flex-1 flex flex-col md:flex-row">
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                <div className="flex-1 flex flex-col">
                    <main className="flex-1 p-4 md:p-8 bg-white">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-700">Daftar Transaksi</h2>
                        <div className="mb-4 flex flex-col md:flex-row gap-2">
                            <input
                                type="text"
                                placeholder="Cari transaksi atau pembeli..."
                                value={search}
                                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                                className="border p-2 rounded w-full md:w-1/2"
                            />
                            <select
                                value={order}
                                onChange={e => { setOrder(e.target.value as 'desc' | 'asc'); setPage(1); }}
                                className="border p-2 rounded w-full md:w-1/4"
                            >
                                <option value="desc">Terbaru</option>
                                <option value="asc">Terlama</option>
                            </select>
                        </div>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {transactions.length === 0 ? (
                                    <div className="col-span-full text-center py-4">Tidak ada transaksi</div>
                                ) : (
                                    transactions.map((trx, idx) => (
                                        <div key={trx.transaction_number + idx} className="border p-4 rounded shadow bg-white flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between mb-2">
                                                    <span className="text-xs text-gray-500">{new Date(trx.transaction_date).toLocaleString()}</span>
                                                    <span className="text-xs text-gray-500">No: {trx.transaction_number}</span>
                                                </div>
                                                <div className="flex justify-between mb-1">
                                                    <span className="text-gray-700">Qty: {trx.qty}</span>
                                                    <span className="font-bold text-blue-700">Rp {trx.total_harga.toLocaleString()}</span>
                                                </div>
                                                <div className="text-gray-600 text-sm mb-1">Pembeli: {trx.buyer_name || '-'}</div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                        <div className="mt-4 flex justify-between items-center">
                            <button
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                disabled={page === 1}
                                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <div>
                                Page {page} of {totalPages}
                            </div>
                            <button
                                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={page === totalPages}
                                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default TransactionList;
