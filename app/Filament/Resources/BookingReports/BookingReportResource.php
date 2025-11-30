<?php

namespace App\Filament\Resources\BookingReports;

use App\Filament\Resources\BookingReports\Pages\CreateBookingReport;
use App\Filament\Resources\BookingReports\Pages\EditBookingReport;
use App\Filament\Resources\BookingReports\Pages\ListBookingReports;
use App\Filament\Resources\BookingReports\Schemas\BookingReportForm;
use App\Filament\Resources\BookingReports\Tables\BookingReportsTable;
use App\Models\Booking;
use BackedEnum;
use UnitEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class BookingReportResource extends Resource
{
    protected static ?string $model = Booking::class;

    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-document-chart-bar';

    protected static ?string $navigationLabel = 'Laporan Booking';

    protected static ?string $modelLabel = 'Laporan Booking';

    protected static string|UnitEnum|null $navigationGroup = 'Laporan';

    public static function form(Schema $schema): Schema
    {
        return BookingReportForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return BookingReportsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListBookingReports::route('/'),
        ];
    }

    public static function canCreate(): bool
    {
        return false;
    }
}
