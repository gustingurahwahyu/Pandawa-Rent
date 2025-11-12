<?php

namespace App\Filament\Resources\Bookings\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Grid;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\DatePicker;



class BookingForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Booking')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Select::make('user_id')
                                    ->label('Pelanggan')
                                    ->relationship('user', 'nama_lengkap')
                                    ->searchable()
                                    ->preload()
                                    ->required(),

                                Select::make('mobil_id')
                                    ->label('Mobil')
                                    ->relationship('mobil', 'nama_mobil')
                                    ->searchable()
                                    ->preload()
                                    ->required(),

                                DatePicker::make('tanggal_ambil')
                                    ->label('Tanggal Ambil')
                                    ->required()
                                    ->native(false)
                                    ->displayFormat('d/m/Y'),

                                DatePicker::make('tanggal_kembali')
                                    ->label('Tanggal Kembali')
                                    ->required()
                                    ->native(false)
                                    ->displayFormat('d/m/Y')
                                    ->after('tanggal_ambil'),

                                TextInput::make('total_biaya')
                                    ->label('Total Biaya')
                                    ->required()
                                    ->numeric()
                                    ->prefix('Rp')
                                    ->minValue(0),

                                Select::make('status_booking')
                                    ->label('Status Booking')
                                    ->options([
                                        'pending' => 'Pending',
                                        'confirmed' => 'Confirmed',
                                        'ongoing' => 'Ongoing',
                                        'completed' => 'Completed',
                                        'cancelled' => 'Cancelled',
                                    ])
                                    ->required()
                                    ->default('pending'),
                            ]),
                    ]),
            ]);
    }
}
