<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Booking - {{ $booking->booking_id }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 20px;
            background: #fff;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #333;
        }

        .header h1 {
            color: #333;
            font-size: 28px;
            margin-bottom: 5px;
        }

        .header p {
            color: #666;
            font-size: 14px;
        }

        .info-section {
            margin-bottom: 30px;
        }

        .info-section h2 {
            color: #333;
            font-size: 18px;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #eee;
        }

        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        .info-item {
            margin-bottom: 10px;
        }

        .info-label {
            font-weight: 600;
            color: #555;
            margin-bottom: 5px;
        }

        .info-value {
            color: #333;
            font-size: 15px;
        }

        .status-badge {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 600;
        }

        .status-pending {
            background-color: #fef3c7;
            color: #92400e;
        }

        .status-confirmed {
            background-color: #dbeafe;
            color: #1e40af;
        }

        .status-ongoing {
            background-color: #e0e7ff;
            color: #4338ca;
        }

        .status-completed {
            background-color: #d1fae5;
            color: #065f46;
        }

        .status-cancelled {
            background-color: #fee2e2;
            color: #991b1b;
        }

        .payment-info {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
        }

        .total-section {
            margin-top: 30px;
            text-align: right;
            padding: 20px;
            background: #f3f4f6;
            border-radius: 8px;
        }

        .total-label {
            font-size: 18px;
            color: #666;
            margin-bottom: 10px;
        }

        .total-amount {
            font-size: 32px;
            font-weight: bold;
            color: #059669;
        }

        .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid #eee;
            text-align: center;
            color: #666;
            font-size: 12px;
        }

        @media print {
            body {
                padding: 0;
            }

            .no-print {
                display: none;
            }

            @page {
                margin: 1cm;
            }
        }

        .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            background: #059669;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .print-button:hover {
            background: #047857;
        }
    </style>
</head>

<body>
    <button onclick="window.print()" class="print-button no-print">🖨️ Print</button>

    <div class="header">
        <h1>PANDAWA RENT</h1>
        <p>Laporan Detail Booking</p>
        <p style="margin-top: 10px;">Dicetak pada: {{ now()->format('d F Y, H:i') }}</p>
    </div>

    <div class="info-section">
        <h2>Informasi Booking</h2>
        <div class="info-grid">
            <div>
                <div class="info-item">
                    <div class="info-label">ID Booking</div>
                    <div class="info-value">{{ $booking->booking_id }}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Tanggal Booking</div>
                    <div class="info-value">{{ $booking->created_at->format('d F Y, H:i') }}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Status</div>
                    <div class="info-value">
                        <span class="status-badge status-{{ $booking->status_booking }}">
                            {{ strtoupper($booking->status_booking) }}
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <div class="info-item">
                    <div class="info-label">Tanggal Ambil</div>
                    <div class="info-value">{{ $booking->tanggal_ambil->format('d F Y') }}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Tanggal Kembali</div>
                    <div class="info-value">{{ $booking->tanggal_kembali->format('d F Y') }}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Durasi</div>
                    <div class="info-value">{{ $booking->tanggal_ambil->diffInDays($booking->tanggal_kembali) }} Hari
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="info-section">
        <h2>Informasi Pelanggan</h2>
        <div class="info-grid">
            <div>
                <div class="info-item">
                    <div class="info-label">Nama Lengkap</div>
                    <div class="info-value">{{ $booking->user->nama_lengkap }}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Email</div>
                    <div class="info-value">{{ $booking->user->email }}</div>
                </div>
            </div>
            <div>
                <div class="info-item">
                    <div class="info-label">No. Telepon</div>
                    <div class="info-value">{{ $booking->user->no_telepon ?? '-' }}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Alamat</div>
                    <div class="info-value">{{ $booking->user->alamat ?? '-' }}</div>
                </div>
            </div>
        </div>
    </div>

    <div class="info-section">
        <h2>Informasi Mobil</h2>
        <div class="info-grid">
            <div>
                <div class="info-item">
                    <div class="info-label">Nama Mobil</div>
                    <div class="info-value">{{ $booking->mobil->nama_mobil }}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Merk</div>
                    <div class="info-value">{{ $booking->mobil->merk }}</div>
                </div>
            </div>
            <div>
                <div class="info-item">
                    <div class="info-label">Tahun</div>
                    <div class="info-value">{{ $booking->mobil->tahun }}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Transmisi</div>
                    <div class="info-value">{{ $booking->mobil->transmisi }}</div>
                </div>
            </div>
        </div>
    </div>

    @if ($booking->payment)
        <div class="payment-info">
            <h2>Informasi Pembayaran</h2>
            <div class="info-grid" style="margin-top: 15px;">
                <div>
                    <div class="info-item">
                        <div class="info-label">Tanggal Pembayaran</div>
                        <div class="info-value">{{ $booking->payment->tanggal_pembayaran->format('d F Y, H:i') }}</div>
                    </div>
                </div>
                <div>
                    <div class="info-item">
                        <div class="info-label">Status Pembayaran</div>
                        <div class="info-value">
                            <span class="status-badge status-{{ $booking->payment->status_pembayaran }}">
                                {{ strtoupper($booking->payment->status_pembayaran) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @endif

    <div class="total-section">
        <div class="total-label">Total Biaya</div>
        <div class="total-amount">Rp {{ number_format($booking->total_biaya, 0, ',', '.') }}</div>
    </div>

    <div class="footer">
        <p>Dokumen ini dicetak secara otomatis oleh sistem Pandawa Rent</p>
        <p>Untuk informasi lebih lanjut, hubungi customer service kami</p>
    </div>

    <script>
        // Auto print saat halaman dimuat (opsional)
        // window.onload = function() { window.print(); }
    </script>
</body>

</html>
