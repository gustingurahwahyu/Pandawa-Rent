<?php

namespace App\Observers;

use App\Models\Payment;

class PaymentObserver
{
    /**
     * Handle the Payment "created" event.
     */
    public function created(Payment $payment): void
    {
        $this->updateBookingStatus($payment);
    }

    /**
     * Handle the Payment "updated" event.
     */
    public function updated(Payment $payment): void
    {
        $this->updateBookingStatus($payment);
    }

    /**
     * Handle the Payment "deleted" event.
     */
    public function deleted(Payment $payment): void
    {
        //
    }

    /**
     * Handle the Payment "restored" event.
     */
    public function restored(Payment $payment): void
    {
        //
    }

    /**
     * Handle the Payment "force deleted" event.
     */
    public function forceDeleted(Payment $payment): void
    {
        //
    }

    /**
     * Update booking status based on payment status.
     */
    protected function updateBookingStatus(Payment $payment): void
    {
        if (!$payment->booking) {
            return;
        }

        // Jika status pembayaran menjadi paid, ubah status booking menjadi confirmed
        if ($payment->status_pembayaran === 'paid' && $payment->booking->status_booking !== 'confirmed') {
            $payment->booking->update([
                'status_booking' => 'confirmed'
            ]);
        }

        // Jika status pembayaran failed, ubah status booking menjadi cancelled dan kembalikan stok
        if ($payment->status_pembayaran === 'failed' && $payment->booking->status_booking === 'pending') {
            $payment->booking->update([
                'status_booking' => 'cancelled'
            ]);

            // Kembalikan stok mobil
            if ($payment->booking->mobil) {
                $payment->booking->mobil->increment('stock');
            }
        }
    }
}
