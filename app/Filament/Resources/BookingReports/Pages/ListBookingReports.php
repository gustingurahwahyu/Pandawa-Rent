<?php

namespace App\Filament\Resources\BookingReports\Pages;

use App\Filament\Resources\BookingReports\BookingReportResource;
use Filament\Actions\Action;
use Filament\Resources\Pages\ListRecords;

class ListBookingReports extends ListRecords
{
    protected static string $resource = BookingReportResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Action::make('print')
                ->label('Print Laporan')
                ->icon('heroicon-o-printer')
                ->color('success')
                ->url(function () {
                    $filters = $this->tableFilters;
                    $queryParams = [];

                    // Ambil filter dari table
                    if (!empty($filters)) {
                        $queryParams['tableFilters'] = $filters;
                    }

                    return route('bookings.print-all', $queryParams);
                })
                ->openUrlInNewTab(),
        ];
    }
}
