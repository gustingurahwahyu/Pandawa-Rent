import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface MobilImage {
    id: number;
    url: string;
    is_primary: boolean;
}

interface Mobil {
    id: number;
    nama_mobil: string;
    merk: string;
    tahun: number;
    deskripsi: string;
    harga_sewa: number;
    stock: number;
    available: number;
    is_available: boolean;
    images: MobilImage[];
    primary_image: string | null;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export default function Koleksi() {
    const [mobils, setMobils] = useState<Mobil[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedMerk, setSelectedMerk] = useState('');
    const [merks, setMerks] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('created_at');
    const [currentPage, setCurrentPage] = useState(1);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);

    useEffect(() => {
        fetchMerks();
    }, []);

    useEffect(() => {
        fetchMobils();
    }, [search, selectedMerk, sortBy, currentPage]);

    const fetchMerks = async () => {
        try {
            const response = await axios.get('/api/v1/mobils-merks');
            setMerks(response.data);
        } catch (error) {
            console.error('Error fetching merks:', error);
        }
    };

    const fetchMobils = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                per_page: '12',
                available_only: '1',
                sort_by: sortBy,
                sort_order: sortBy === 'harga_sewa' ? 'asc' : 'desc',
            });

            if (search) params.append('search', search);
            if (selectedMerk) params.append('merk', selectedMerk);

            const response = await axios.get(`/api/v1/mobils?${params}`);
            setMobils(response.data.data);
            setMeta({
                current_page: response.data.current_page,
                last_page: response.data.last_page,
                per_page: response.data.per_page,
                total: response.data.total,
            });
        } catch (error) {
            console.error('Error fetching mobils:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    return (
        <>
            <Head title="Koleksi Mobil" />

            <div
                className="min-h-screen"
                style={{ backgroundColor: '#F8F9FA' }}
            >
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Filters */}
                    <div className="mb-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            {/* Search */}
                            <div>
                                <label
                                    className="mb-2 block text-sm font-medium"
                                    style={{ color: 'var(--color-heading)' }}
                                >
                                    Cari Mobil
                                </label>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    placeholder="Nama atau merk mobil..."
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-transparent focus:bg-white focus:ring-2"
                                    style={
                                        {
                                            '--tw-ring-color':
                                                'var(--color-accent)',
                                        } as React.CSSProperties
                                    }
                                />
                            </div>

                            {/* Merk Filter */}
                            <div>
                                <label
                                    className="mb-2 block text-sm font-medium"
                                    style={{ color: 'var(--color-heading)' }}
                                >
                                    Filter Merk
                                </label>
                                <select
                                    value={selectedMerk}
                                    onChange={(e) => {
                                        setSelectedMerk(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-transparent focus:bg-white focus:ring-2"
                                    style={
                                        {
                                            '--tw-ring-color':
                                                'var(--color-accent)',
                                        } as React.CSSProperties
                                    }
                                >
                                    <option value="">Semua Merk</option>
                                    {merks.map((merk) => (
                                        <option key={merk} value={merk}>
                                            {merk}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort */}
                            <div>
                                <label
                                    className="mb-2 block text-sm font-medium"
                                    style={{ color: 'var(--color-heading)' }}
                                >
                                    Urutkan
                                </label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-transparent focus:bg-white focus:ring-2"
                                    style={
                                        {
                                            '--tw-ring-color':
                                                'var(--color-accent)',
                                        } as React.CSSProperties
                                    }
                                >
                                    <option value="created_at">Terbaru</option>
                                    <option value="harga_sewa">
                                        Harga Terendah
                                    </option>
                                    <option value="nama_mobil">
                                        Nama (A-Z)
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div
                                className="h-12 w-12 animate-spin rounded-full border-b-2"
                                style={{
                                    borderBottomColor: 'var(--color-accent)',
                                }}
                            ></div>
                        </div>
                    ) : (
                        <>
                            {/* Results Count */}
                            {meta && (
                                <div
                                    className="mb-6 text-sm font-medium"
                                    style={{
                                        color: '#6B7280',
                                    }}
                                >
                                    Menampilkan {mobils.length} dari{' '}
                                    {meta.total} mobil
                                </div>
                            )}

                            {/* Mobil Grid */}
                            {mobils.length > 0 ? (
                                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {mobils.map((mobil) => (
                                        <div
                                            key={mobil.id}
                                            className="overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                                            style={{
                                                backgroundColor: '#E8EBF0',
                                            }}
                                        >
                                            {/* Image */}
                                            <div className="relative h-56 bg-white">
                                                {mobil.primary_image ? (
                                                    <img
                                                        src={
                                                            mobil.primary_image
                                                        }
                                                        alt={mobil.nama_mobil}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-gray-400">
                                                        <svg
                                                            className="h-16 w-16"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}

                                                {/* Availability Badge */}
                                                <div className="absolute right-4 top-4">
                                                    {mobil.is_available ? (
                                                        <span className="rounded-full bg-green-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                                                            Tersedia (
                                                            {mobil.available})
                                                        </span>
                                                    ) : (
                                                        <span className="rounded-full bg-red-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg">
                                                            Tidak Tersedia
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <div className="mb-3">
                                                    <span
                                                        className="text-xs font-bold uppercase tracking-wider"
                                                        style={{
                                                            color: 'var(--color-text-primary)',
                                                        }}
                                                    >
                                                        {mobil.merk}
                                                    </span>
                                                </div>

                                                <h3
                                                    className="mb-2 text-xl font-bold"
                                                    style={{
                                                        color: 'var(--color-heading)',
                                                    }}
                                                >
                                                    {mobil.nama_mobil}
                                                </h3>

                                                <p
                                                    className="mb-3 line-clamp-2 text-sm"
                                                    style={{
                                                        color: 'var(--color-text-primary)',
                                                    }}
                                                >
                                                    {mobil.deskripsi}
                                                </p>

                                                <div className="mb-5 flex items-center justify-between border-t border-gray-100 pt-4">
                                                    <div
                                                        className="text-sm font-medium"
                                                        style={{
                                                            color: 'var(--color-text-primary)',
                                                        }}
                                                    >
                                                        Tahun {mobil.tahun}
                                                    </div>
                                                    <div className="text-right">
                                                        <div
                                                            className="text-2xl font-bold"
                                                            style={{
                                                                color: 'var(--color-heading)',
                                                            }}
                                                        >
                                                            {formatPrice(
                                                                mobil.harga_sewa,
                                                            )}
                                                        </div>
                                                        <span
                                                            className="text-xs font-medium"
                                                            style={{
                                                                color: 'var(--color-text-primary)',
                                                            }}
                                                        >
                                                            /hari
                                                        </span>
                                                    </div>
                                                </div>

                                                <button
                                                    className={`w-full rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200 ${
                                                        mobil.is_available
                                                            ? 'text-white shadow-lg hover:shadow-xl'
                                                            : 'cursor-not-allowed bg-gray-200 text-gray-400'
                                                    }`}
                                                    style={
                                                        mobil.is_available
                                                            ? {
                                                                  backgroundColor:
                                                                      '#2C3E50',
                                                              }
                                                            : undefined
                                                    }
                                                    onMouseEnter={(e) => {
                                                        if (
                                                            mobil.is_available
                                                        ) {
                                                            e.currentTarget.style.backgroundColor =
                                                                '#1a252f';
                                                            e.currentTarget.style.transform =
                                                                'translateY(-2px)';
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        if (
                                                            mobil.is_available
                                                        ) {
                                                            e.currentTarget.style.backgroundColor =
                                                                '#2C3E50';
                                                            e.currentTarget.style.transform =
                                                                'translateY(0)';
                                                        }
                                                    }}
                                                    disabled={
                                                        !mobil.is_available
                                                    }
                                                >
                                                    {mobil.is_available
                                                        ? 'Pesan Sekarang'
                                                        : 'Tidak Tersedia'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-16 text-center">
                                    <svg
                                        className="mx-auto h-16 w-16 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <h3
                                        className="mt-4 text-lg font-semibold"
                                        style={{
                                            color: 'var(--color-heading)',
                                        }}
                                    >
                                        Tidak ada mobil ditemukan
                                    </h3>
                                    <p
                                        className="mt-2 text-sm"
                                        style={{
                                            color: 'var(--color-text-primary)',
                                        }}
                                    >
                                        Coba ubah filter atau kata kunci
                                        pencarian
                                    </p>
                                </div>
                            )}

                            {/* Pagination */}
                            {meta && meta.last_page > 1 && (
                                <div className="mt-8 flex justify-center gap-3">
                                    <button
                                        onClick={() =>
                                            setCurrentPage(
                                                Math.max(1, currentPage - 1),
                                            )
                                        }
                                        disabled={currentPage === 1}
                                        className="rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-sm"
                                    >
                                        Previous
                                    </button>

                                    <span
                                        className="rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium"
                                        style={{
                                            color: 'var(--color-heading)',
                                        }}
                                    >
                                        Halaman {currentPage} dari{' '}
                                        {meta.last_page}
                                    </span>

                                    <button
                                        onClick={() =>
                                            setCurrentPage(
                                                Math.min(
                                                    meta.last_page,
                                                    currentPage + 1,
                                                ),
                                            )
                                        }
                                        disabled={
                                            currentPage === meta.last_page
                                        }
                                        className="rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-sm"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
