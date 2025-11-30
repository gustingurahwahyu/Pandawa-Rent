<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Receipt #{{ $booking->booking_id }} - Pandawa Rent</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            padding: 40px;
            background: #f5f5f5;
        }

        .receipt {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 40px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            border-bottom: 3px solid #f59e0b;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }

        .header h1 {
            color: #1a1a1a;
            font-size: 32px;
            margin-bottom: 5px;
        }

        .header p {
            color: #666;
            font-size: 14px;
        }

        .receipt-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            padding: 20px;
            background: #f9f9f9;
            border-radius: 8px;
        }

        .receipt-info div {
            flex: 1;
        }

        .receipt-info h3 {
            color: #f59e0b;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 8px;
            font-weight: 600;
        }

        .receipt-info p {
            color: #333;
            font-size: 14px;
            line-height: 1.6;
        }

        .booking-details {
            margin-bottom: 30px;
        }

        .booking-details h2 {
            color: #1a1a1a;
            font-size: 18px;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #f0f0f0;
        }

        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #f0f0f0;
        }

        .detail-row:last-child {
            border-bottom: none;
        }

        .detail-label {
            color: #666;
            font-size: 14px;
        }

        .detail-value {
            color: #1a1a1a;
            font-size: 14px;
            font-weight: 600;
        }

        .total-section {
            background: #f59e0b;
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin-top: 30px;
        }

        .total-section .detail-row {
            border-bottom-color: rgba(255, 255, 255, 0.2);
            color: white;
        }

        .total-section .detail-label,
        .total-section .detail-value {
            color: white;
        }

        .total-section .grand-total {
            font-size: 24px;
            font-weight: bold;
            margin-top: 10px;
        }

        .status-badge {
            display: inline-block;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
        }

        .status-confirmed {
            background: #3b82f6;
            color: white;
        }

        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #f0f0f0;
            text-align: center;
            color: #666;
            font-size: 12px;
        }

        .print-button {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f59e0b;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
        }

        .print-button:hover {
            background: #d97706;
        }

        @media print {
            body {
                background: white;
                padding: 0;
            }

            .receipt {
                box-shadow: none;
                padding: 20px;
            }

            .print-button {
                display: none;
            }
        }
    </style>
</head>

<body>
    <button class="print-button" onclick="window.print()">🖨️ Print Receipt</button>

    <div class="receipt">
        <!-- HEADER -->
        <div class="header">
            <h1>PANDAWA RENT</h1>
            <p>Premium Car Rental Service</p>
            <p style="margin-top: 10px;">Jl. Raya Denpasar No. 123, Bali, Indonesia</p>
            <p>Phone: +62 812-3456-7890 | Email: info@pandawarent.com</p>
        </div>

        <!-- RECEIPT INFO -->
        <div class="receipt-info">
            <div>
                <h3>Receipt Number</h3>
                <p>#{{ str_pad($booking->booking_id, 6, '0', STR_PAD_LEFT) }}</p>
            </div>
            <div>
                <h3>Date Issued</h3>
                <p>{{ $booking->created_at->format('d F Y, H:i') }}</p>
            </div>
            <div>
                <h3>Status</h3>
                <p><span class="status-badge status-confirmed">{{ ucfirst($booking->status_booking) }}</span></p>
            </div>
        </div>

        <!-- CUSTOMER INFO -->
        <div class="booking-details">
            <h2>Customer Information</h2>
            <div class="detail-row">
                <span class="detail-label">Name</span>
                <span class="detail-value">{{ $booking->user->nama_lengkap }}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Email</span>
                <span class="detail-value">{{ $booking->user->email }}</span>
            </div>
            @if ($booking->user->no_telepon)
                <div class="detail-row">
                    <span class="detail-label">Phone</span>
                    <span class="detail-value">{{ $booking->user->no_telepon }}</span>
                </div>
            @endif
        </div>

        <!-- RENTAL DETAILS -->
        <div class="booking-details">
            <h2>Rental Details</h2>
            <div class="detail-row">
                <span class="detail-label">Car Model</span>
                <span class="detail-value">{{ $booking->mobil->nama_mobil }}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Brand</span>
                <span class="detail-value">{{ $booking->mobil->merk }}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Year</span>
                <span class="detail-value">{{ $booking->mobil->tahun }}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Transmission</span>
                <span class="detail-value">{{ ucfirst($booking->mobil->transmisi) }}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Pick-up Date</span>
                <span class="detail-value">{{ $booking->tanggal_ambil->format('d F Y') }}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Drop-off Date</span>
                <span class="detail-value">{{ $booking->tanggal_kembali->format('d F Y') }}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Rental Duration</span>
                <span class="detail-value">{{ $booking->tanggal_ambil->diffInDays($booking->tanggal_kembali) }}
                    Days</span>
            </div>
        </div>

        <!-- PAYMENT DETAILS -->
        <div class="booking-details">
            <h2>Payment Information</h2>
            <div class="detail-row">
                <span class="detail-label">Daily Rate</span>
                <span class="detail-value">Rp {{ number_format($booking->mobil->harga_sewa, 0, ',', '.') }}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Number of Days</span>
                <span class="detail-value">{{ $booking->tanggal_ambil->diffInDays($booking->tanggal_kembali) }}
                    Days</span>
            </div>
            @if ($booking->payment)
                <div class="detail-row">
                    <span class="detail-label">Payment Status</span>
                    <span class="detail-value">{{ ucfirst($booking->payment->status_pembayaran) }}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Payment Date</span>
                    <span
                        class="detail-value">{{ $booking->payment->tanggal_pembayaran ? $booking->payment->tanggal_pembayaran->format('d F Y, H:i') : '-' }}</span>
                </div>
            @endif
        </div>

        <!-- TOTAL -->
        <div class="total-section">
            <div class="detail-row">
                <span class="detail-label">Subtotal</span>
                <span class="detail-value">Rp {{ number_format($booking->total_biaya, 0, ',', '.') }}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Tax (0%)</span>
                <span class="detail-value">Rp 0</span>
            </div>
            <div class="detail-row grand-total">
                <span class="detail-label">TOTAL AMOUNT</span>
                <span class="detail-value">Rp {{ number_format($booking->total_biaya, 0, ',', '.') }}</span>
            </div>
        </div>

        <!-- FOOTER -->
        <div class="footer">
            <p><strong>Thank you for choosing Pandawa Rent!</strong></p>
            <p style="margin-top: 10px;">This is a computer-generated receipt and does not require a signature.</p>
            <p>For any inquiries, please contact us at info@pandawarent.com or +62 812-3456-7890</p>
            <p style="margin-top: 20px; font-size: 10px; color: #999;">
                Receipt generated on {{ now()->format('d F Y, H:i:s') }}
            </p>
        </div>
    </div>

    <script>
        // Auto print option (optional - comment out if you don't want auto print)
        // window.onload = function() { window.print(); }
    </script>
</body>

</html>
