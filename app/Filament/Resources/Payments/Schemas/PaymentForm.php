<?php

namespace App\Filament\Resources\Payments\Schemas;


use App\Models\Booking;
use Filament\Schemas\Schema;
use Filament\Forms\Components\Select;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\DateTimePicker;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;


class PaymentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Pembayaran')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                Select::make('booking_id')
                                    ->label('Booking')
                                    ->relationship('booking', 'booking_id')
                                    ->searchable()
                                    ->preload()
                                    ->required()
                                    ->live()
                                    ->getOptionLabelFromRecordUsing(fn($record) => "#{$record->booking_id} - {$record->user->nama_lengkap} - {$record->mobil->nama_mobil}"),

                                Select::make('status_pembayaran')
                                    ->label('Status Pembayaran')
                                    ->options([
                                        'pending' => 'Pending',
                                        'paid' => 'Paid',
                                        'failed' => 'Failed',
                                        'refunded' => 'Refunded',
                                    ])
                                    ->required()
                                    ->default('pending')
                                    ->live()
                                    ->afterStateUpdated(function (Set $set, $state) {
                                        // Auto-set tanggal pembayaran saat status menjadi paid
                                        if ($state === 'paid') {
                                            $set('tanggal_pembayaran', now());
                                        }
                                    }),

                                DateTimePicker::make('tanggal_pembayaran')
                                    ->label('Tanggal Pembayaran')
                                    ->native(false)
                                    ->displayFormat('d/m/Y H:i'),
                            ]),

                        Placeholder::make('booking_info')
                            ->label('Informasi Booking')
                            ->content(function (Get $get) {
                                $bookingId = $get('booking_id');
                                if (!$bookingId) {
                                    return 'Pilih booking terlebih dahulu';
                                }

                                $booking = \App\Models\Booking::with(['user', 'mobil'])->find($bookingId);
                                if (!$booking) {
                                    return '-';
                                }

                                return view('filament.components.booking-info', ['booking' => $booking]);
                            })
                            ->columnSpanFull(),

                        FileUpload::make('bukti_pembayaran')
                            ->label('Bukti Pembayaran')
                            ->image()
                            ->required()
                            ->directory('payment-proofs')
                            ->imageEditor()
                            ->maxSize(2048)
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
