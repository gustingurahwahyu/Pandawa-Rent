<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Booking - Pandawa Rent</title>
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
            font-size: 12px;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #333;
        }

        .header h1 {
            color: #333;
            font-size: 24px;
            margin-bottom: 5px;
        }

        .header p {
            color: #666;
            font-size: 12px;
            margin-top: 5px;
        }

        .filter-info {
            background: #f9fafb;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .filter-info h3 {
            font-size: 14px;
            margin-bottom: 10px;
            color: #333;
        }

        .filter-item {
            display: inline-block;
            margin-right: 20px;
            color: #666;
        }

        .summary-cards {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 15px;
            margin-bottom: 30px;
        }

        .summary-card {
            background: #f3f4f6;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }

        .summary-card .label {
            font-size: 11px;
            color: #666;
            margin-bottom: 8px;
        }

        .summary-card .value {
            font-size: 20px;
            font-weight: bold;
            color: #333;
        }

        .summary-card.revenue .value {
            color: #059669;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
            background: white;
        }

        thead {
            background: #333;
            color: white;
        }

        th {
            padding: 12px 8px;
            text-align: left;
            font-weight: 600;
            font-size: 11px;
        }

        td {
            padding: 10px 8px;
            border-bottom: 1px solid #e5e7eb;
            font-size: 11px;
        }

        tbody tr:hover {
            background: #f9fafb;
        }

        .status-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 10px;
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

        .total-row {
            background: #f3f4f6;
            font-weight: bold;
        }

        .total-row td {
            padding: 15px 8px;
            border-top: 2px solid #333;
            border-bottom: 2px solid #333;
        }

        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #eee;
            text-align: center;
            color: #666;
            font-size: 11px;
        }

        @media print {
            body {
                padding: 10px;
            }

            .no-print {
                display: none !important;
            }

            @page {
                margin: 1cm;
                size: landscape;
            }

            table {
                page-break-inside: auto;
            }

            tr {
                page-break-inside: avoid;
                page-break-after: auto;
            }

            thead {
                display: table-header-group;
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
            z-index: 1000;
        }

        .print-button:hover {
            background: #047857;
        }
    </style>
</head>

<body>
    <button onclick="window.print()" class="print-button no-print">🖨️ Print Laporan</button>

    <div class="header">
        <h1>PANDAWA RENT</h1>
        <p>Laporan Transaksi Booking</p>
        <p>Dicetak pada: {{ now()->format('d F Y, H:i') }} WIB</p>
    </div>

    @if (isset($filters['tableFilters']))
        <div class="filter-info no-print">
            <h3>Filter yang Diterapkan:</h3>
            @if (isset($filters['tableFilters']['status_booking']['value']))
                <span class="filter-item">
                    <strong>Status:</strong> {{ strtoupper($filters['tableFilters']['status_booking']['value']) }}
                </span>
            @endif
            @if (isset($filters['tableFilters']['created_at']['from']))
                <span class="filter-item">
                    <strong>Dari:</strong>
                    {{ \Carbon\Carbon::parse($filters['tableFilters']['created_at']['from'])->format('d/m/Y') }}
                </span>
            @endif
            @if (isset($filters['tableFilters']['created_at']['until']))
                <span class="filter-item">
                    <strong>Sampai:</strong>
                    {{ \Carbon\Carbon::parse($filters['tableFilters']['created_at']['until'])->format('d/m/Y') }}
                </span>
            @endif
        </div>
    @endif

    <div class="summary-cards">
        <div class="summary-card">
            <div class="label">Total Booking</div>
            <div class="value">{{ $bookings->count() }}</div>
        </div>
        <div class="summary-card">
            <div class="label">Completed</div>
            <div class="value">{{ $bookings->where('status_booking', 'completed')->count() }}</div>
        </div>
        <div class="summary-card">
            <div class="label">Pending</div>
            <div class="value">{{ $bookings->where('status_booking', 'pending')->count() }}</div>
        </div>
        <div class="summary-card revenue">
            <div class="label">Total Pendapatan</div>
            <div class="value">Rp {{ number_format($totalRevenue, 0, ',', '.') }}</div>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 8%;">ID Booking</th>
                <th style="width: 15%;">Pelanggan</th>
                <th style="width: 15%;">Mobil</th>
                <th style="width: 10%;">Tgl Ambil</th>
                <th style="width: 10%;">Tgl Kembali</th>
                <th style="width: 12%;">Total Biaya</th>
                <th style="width: 10%;">Status</th>
                <th style="width: 12%;">Tgl Booking</th>
            </tr>
        </thead>
        <tbody>
            @forelse($bookings as $booking)
                <tr>
                    <td>{{ $booking->booking_id }}</td>
                    <td>{{ $booking->user->nama_lengkap }}</td>
                    <td>{{ $booking->mobil->nama_mobil }}</td>
                    <td>{{ $booking->tanggal_ambil->format('d/m/Y') }}</td>
                    <td>{{ $booking->tanggal_kembali->format('d/m/Y') }}</td>
                    <td>Rp {{ number_format($booking->total_biaya, 0, ',', '.') }}</td>
                    <td>
                        <span class="status-badge status-{{ $booking->status_booking }}">
                            {{ strtoupper($booking->status_booking) }}
                        </span>
                    </td>
                    <td>{{ $booking->created_at->format('d/m/Y H:i') }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="8" style="text-align: center; padding: 30px; color: #999;">
                        Tidak ada data booking
                    </td>
                </tr>
            @endforelse
        </tbody>
        <tfoot>
            <tr class="total-row">
                <td colspan="5" style="text-align: right;"><strong>TOTAL PENDAPATAN:</strong></td>
                <td colspan="3"><strong>Rp {{ number_format($totalRevenue, 0, ',', '.') }}</strong></td>
            </tr>
        </tfoot>
    </table>

    <div class="footer">
        <p><strong>PANDAWA RENT - Sistem Rental Mobil</strong></p>
        <p>Laporan ini dicetak secara otomatis oleh sistem</p>
        <p style="margin-top: 10px;">Untuk informasi lebih lanjut, hubungi customer service kami</p>
    </div>
</body>

</html>
