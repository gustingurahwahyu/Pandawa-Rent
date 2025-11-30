<?php

namespace App\Filament\Resources\Bookings\Pages;

use App\Filament\Resources\Bookings\BookingResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Filament\Notifications\Notification;

class EditBooking extends EditRecord
{
    protected static string $resource = BookingResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }

    protected function afterSave(): void
    {
        $record = $this->record;

        // Tampilkan notifikasi singkat; logika stok dipusatkan di BookingObserver
        if ($record->wasChanged('status_booking')) {
            $mobil = $record->mobil;
            if ($mobil) {
                // Refresh untuk baca nilai terbaru setelah observer bekerja
                $mobil->refresh();
                Notification::make()
                    ->title('Status booking diperbarui')
                    ->body("Status: {$record->status_booking}. Stock: {$mobil->stock}/{$mobil->stock_awal}")
                    ->success()
                    ->send();
            } else {
                Notification::make()
                    ->title('Status booking diperbarui')
                    ->body('Relasi mobil tidak ditemukan')
                    ->warning()
                    ->send();
            }
        }
    }
}
