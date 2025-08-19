import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

// Add an index signature to the product type
interface Product {
    name: string;
    
    history: {
        harga_jual: number;
        harga_modal: number;
        stock: number;
        date: string;
    }[];

}

const HistoryRestock = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { productId } = useParams();
    const [product, setProduct] = useState<Product>({
        name: '',
        history: []
    });
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(
                    `/history-restock/${productId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setProduct({
                    name: response.data.name,
                    history: response.data.history,
                });

            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, []);


    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header onMenuClick={() => setSidebarOpen(true)} />
            <div className="flex-1 flex flex-col md:flex-row">
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                <div className="flex-1 flex flex-col">
                    <main className="flex-1 p-4 md:p-8 bg-white">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-700">History ReStock Produk</h2>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nama Produk <span className='text-red-500'>*</span></label>
                            <input disabled type="text" name="name" value={product.name} className="mt-1 block w-full border p-2 rounded" placeholder="Masukkan nama produk" />
                        </div>
                        
                        
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">Riwayat Restock</h3>
                            {Array.isArray(product.history) && product.history.length > 0 ? (
                                <ul className="space-y-3">
                                    {product.history.map((h, idx) => (
                                        <li key={idx} className="p-3 border rounded bg-gray-50">
                                            <div className="flex justify-between">
                                                <div className="text-sm text-gray-600">Tanggal: <span className="font-medium text-gray-800">{h.date}</span></div>
                                                <div className="text-sm text-gray-600">Stok Tambah: <span className="font-medium text-gray-800">{h.stock}</span></div>
                                            </div>
                                            <div className="mt-2 text-sm text-gray-600">Harga Jual: <span className="font-medium text-gray-800">{h.harga_jual}</span></div>
                                            <div className="mt-1 text-sm text-gray-600">Harga Modal: <span className="font-medium text-gray-800">{h.harga_modal}</span></div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-yellow-800">Produk belum pernah restock</div>
                            )}
                        </div>
                            <button onClick={() => navigate('/product')} className="mt-4 w-full   px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Kembali
                            </button>




                    </main>
                </div>
            </div>
        </div>
    );
};

export default HistoryRestock;
