<?php

namespace App\Observers;

use App\Models\Booking;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class BookingObserver
{
    /**
     * Handle the Booking "created" event.
     */
    public function created(Booking $booking): void
    {
        //
    }

    /**
     * Handle the Booking "updated" event.
     */
    public function updated(Booking $booking): void
    {
        // Pastikan hanya bertindak ketika status_booking berubah
        if (! $booking->wasChanged('status_booking')) {
            return;
        }

        $oldStatus = $booking->getOriginal('status_booking');
        $newStatus = $booking->status_booking;

        $mobil = $booking->mobil; // Lazy load aman di sini
        if (! $mobil) {
            Log::warning('Booking updated tanpa relasi mobil', [
                'booking_id' => $booking->booking_id ?? null,
            ]);
            return;
        }

        // Transisi status
        $toCompletedOrCancelled = in_array($oldStatus, ['pending', 'confirmed', 'ongoing'], true)
            && in_array($newStatus, ['completed', 'cancelled'], true);

        $toActive = in_array($oldStatus, ['completed', 'cancelled'], true)
            && in_array($newStatus, ['pending', 'confirmed', 'ongoing'], true);

        // Sesuaikan stock sesuai transisi
        if ($toCompletedOrCancelled) {
            if ($mobil->stock < $mobil->stock_awal) {
                $mobil->stock = $mobil->stock + 1;
                $mobil->save();
            }
        } elseif ($toActive) {
            if ($mobil->stock > 0) {
                $mobil->stock = $mobil->stock - 1;
                $mobil->save();
            }
        }

        // Penjaga konsistensi tambahan (opsional): sinkronkan terhadap jumlah booking aktif
        try {
            $activeBookings = $mobil->bookings()
                ->whereIn('status_booking', ['pending', 'confirmed', 'ongoing'])
                ->count();

            $expected = max(0, $mobil->stock_awal - $activeBookings);

            if ($mobil->stock !== $expected) {
                $mobil->stock = $expected;
                $mobil->save();
            }
        } catch (\Throwable $e) {
            Log::error('Gagal sinkronisasi stock setelah update booking', [
                'error' => $e->getMessage(),
                'booking_id' => $booking->booking_id ?? null,
                'mobil_id' => $mobil->mobil_id ?? null,
            ]);
        }
    }

    /**
     * Handle the Booking "deleted" event.
     */
    public function deleted(Booking $booking): void
    {
        //
    }

    /**
     * Handle the Booking "restored" event.
     */
    public function restored(Booking $booking): void
    {
        //
    }

    /**
     * Handle the Booking "force deleted" event.
     */
    public function forceDeleted(Booking $booking): void
    {
        //
    }
}
