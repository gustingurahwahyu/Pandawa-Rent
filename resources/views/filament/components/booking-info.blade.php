<div class="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 space-y-2">
    <div class="grid grid-cols-2 gap-4">
        <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Pelanggan</p>
            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ $booking->user->nama_lengkap }}</p>
        </div>
        <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Mobil</p>
            <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ $booking->mobil->nama_mobil }}</p>
        </div>
        <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Tanggal Sewa</p>
            <p class="text-sm font-semibold text-gray-900 dark:text-white">
                {{ $booking->tanggal_ambil->format('d/m/Y') }} - {{ $booking->tanggal_kembali->format('d/m/Y') }}
            </p>
        </div>
        <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Biaya</p>
            <p class="text-sm font-semibold text-green-600 dark:text-green-400">
                Rp {{ number_format($booking->total_biaya, 0, ',', '.') }}
            </p>
        </div>
        <div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Status Booking</p>
            <p class="text-sm">
                <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    @if ($booking->status_booking === 'pending') bg-yellow-100 text-yellow-800
                    @elseif($booking->status_booking === 'confirmed') bg-blue-100 text-blue-800
                    @elseif($booking->status_booking === 'ongoing') bg-purple-100 text-purple-800
                    @elseif($booking->status_booking === 'completed') bg-green-100 text-green-800
                    @elseif($booking->status_booking === 'cancelled') bg-red-100 text-red-800 @endif">
                    {{ ucfirst($booking->status_booking) }}
                </span>
            </p>
        </div>
    </div>
</div>
