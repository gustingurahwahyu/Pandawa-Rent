<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use App\Models\Mobil;
use App\Models\Payment;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends StatsOverviewWidget
{
    protected function getStats(): array
    {
        // Total Bookings
        $totalBookings = Booking::count();
        $pendingBookings = Booking::where('status_booking', 'pending')->count();
        $confirmedBookings = Booking::where('status_booking', 'confirmed')->count();

        // Total Revenue
        $totalRevenue = Booking::whereIn('status_booking', ['confirmed', 'completed'])
            ->sum('total_biaya');
        $monthlyRevenue = Booking::whereIn('status_booking', ['confirmed', 'completed'])
            ->whereMonth('created_at', now()->month)
            ->sum('total_biaya');

        // Cars Statistics
        $totalCars = Mobil::count();
        $availableCars = Mobil::where('stock', '>', 0)->count();

        // Users
        $totalUsers = User::where('role', 'user')->count();
        $newUsersThisMonth = User::where('role', 'user')
            ->whereMonth('created_at', now()->month)
            ->count();

        // Pending Payments
        $pendingPayments = Payment::where('status_pembayaran', 'pending')->count();

        return [
            Stat::make('Total Booking', $totalBookings)
                ->description($pendingBookings . ' pending, ' . $confirmedBookings . ' confirmed')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->color('success')
                ->chart([7, 3, 4, 5, 6, 3, 5, 3]),

            Stat::make('Total Pendapatan', 'Rp ' . number_format($totalRevenue, 0, ',', '.'))
                ->description('Bulan ini: Rp ' . number_format($monthlyRevenue, 0, ',', '.'))
                ->descriptionIcon('heroicon-m-currency-dollar')
                ->color('warning')
                ->chart([3, 5, 4, 6, 7, 8, 10, 12]),

            Stat::make('Armada Mobil', $totalCars)
                ->description($availableCars . ' mobil tersedia')
                ->descriptionIcon('heroicon-m-truck')
                ->color('info')
                ->chart([10, 10, 10, 10, 10, 10, 10, 10]),

            Stat::make('Total Pelanggan', $totalUsers)
                ->description($newUsersThisMonth . ' pelanggan baru bulan ini')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('primary')
                ->chart([1, 2, 3, 4, 5, 6, 7, 8]),

            Stat::make('Pembayaran Pending', $pendingPayments)
                ->description('Menunggu verifikasi')
                ->descriptionIcon('heroicon-m-clock')
                ->color('danger'),
        ];
    }
}
