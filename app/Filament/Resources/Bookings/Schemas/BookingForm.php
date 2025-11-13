<?php

namespace App\Filament\Resources\Bookings\Schemas;

use App\Models\Mobil;
use Filament\Schemas\Schema;
use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Grid;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Placeholder;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;



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
                                    ->required()
                                    ->live()
                                    ->afterStateUpdated(function (Set $set, Get $get, $state) {
                                        self::calculateTotal($set, $get, $state);
                                    }),

                                DatePicker::make('tanggal_ambil')
                                    ->label('Tanggal Ambil')
                                    ->required()
                                    ->native(false)
                                    ->displayFormat('d/m/Y')
                                    ->live()
                                    ->afterStateUpdated(function (Set $set, Get $get, $state) {
                                        self::calculateTotal($set, $get);
                                    }),

                                DatePicker::make('tanggal_kembali')
                                    ->label('Tanggal Kembali')
                                    ->required()
                                    ->native(false)
                                    ->displayFormat('d/m/Y')
                                    ->after('tanggal_ambil')
                                    ->live()
                                    ->afterStateUpdated(function (Set $set, Get $get, $state) {
                                        self::calculateTotal($set, $get);
                                    }),

                                Placeholder::make('harga_sewa_display')
                                    ->label('Harga Sewa per Hari')
                                    ->content(function (Get $get) {
                                        $mobilId = $get('mobil_id');
                                        if (!$mobilId) {
                                            return 'Pilih mobil terlebih dahulu';
                                        }

                                        $mobil = Mobil::find($mobilId);
                                        if (!$mobil) {
                                            return '-';
                                        }

                                        return 'Rp ' . number_format($mobil->harga_sewa, 0, ',', '.');
                                    }),

                                Placeholder::make('jumlah_hari_display')
                                    ->label('Jumlah Hari')
                                    ->content(function (Get $get) {
                                        $tanggalAmbil = $get('tanggal_ambil');
                                        $tanggalKembali = $get('tanggal_kembali');

                                        if (!$tanggalAmbil || !$tanggalKembali) {
                                            return '-';
                                        }

                                        $days = \Carbon\Carbon::parse($tanggalAmbil)
                                            ->diffInDays(\Carbon\Carbon::parse($tanggalKembali));

                                        return $days . ' hari';
                                    }),

                                TextInput::make('total_biaya')
                                    ->label('Total Biaya')
                                    ->required()
                                    ->numeric()
                                    ->prefix('Rp')
                                    ->readOnly()
                                    ->dehydrated()
                                    ->columnSpanFull(),

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
                                    ->default('pending')
                                    ->columnSpanFull(),
                            ]),
                    ]),
            ]);
    }

    protected static function calculateTotal(Set $set, Get $get, $state = null): void
    {
        $mobilId = $get('mobil_id');
        $tanggalAmbil = $get('tanggal_ambil');
        $tanggalKembali = $get('tanggal_kembali');

        if (!$mobilId || !$tanggalAmbil || !$tanggalKembali) {
            return;
        }

        $mobil = Mobil::find($mobilId);
        if (!$mobil) {
            return;
        }

        $days = \Carbon\Carbon::parse($tanggalAmbil)
            ->diffInDays(\Carbon\Carbon::parse($tanggalKembali));

        // Minimum 1 hari
        $days = max($days, 1);

        $total = $mobil->harga_sewa * $days;
        $set('total_biaya', $total);
    }
}
