<?php

namespace App\Filament\Resources\Mobils\Schemas;

use Filament\Schemas\Schema;
use Filament\Schemas\Components\Grid;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;


class MobilForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Informasi Mobil')
                    ->schema([
                        Grid::make(2)
                            ->schema([
                                TextInput::make('nama_mobil')
                                    ->label('Nama Mobil')
                                    ->required()
                                    ->maxLength(255),

                                TextInput::make('merk')
                                    ->label('Merk')
                                    ->required()
                                    ->maxLength(255),

                                TextInput::make('tahun')
                                    ->label('Tahun')
                                    ->required()
                                    ->numeric()
                                    ->minValue(1900)
                                    ->maxValue(date('Y') + 1),

                                TextInput::make('harga_sewa')
                                    ->label('Harga Sewa (per hari)')
                                    ->required()
                                    ->numeric()
                                    ->prefix('Rp')
                                    ->minValue(0),

                                Select::make('transmisi')
                                    ->label('Transmisi')
                                    ->required()
                                    ->options([
                                        'Manual' => 'Manual',
                                        'Automatic' => 'Automatic',
                                        'CVT' => 'CVT',
                                        'DCT' => 'DCT',
                                    ])
                                    ->default('Automatic'),

                                Select::make('penggerak')
                                    ->label('Penggerak')
                                    ->required()
                                    ->options([
                                        'FWD' => 'FWD (Front Wheel Drive)',
                                        'RWD' => 'RWD (Rear Wheel Drive)',
                                        'AWD' => 'AWD (All Wheel Drive)',
                                        '4WD' => '4WD (Four Wheel Drive)',
                                    ])
                                    ->default('FWD'),

                                TextInput::make('stock')
                                    ->label('Stock')
                                    ->required()
                                    ->numeric()
                                    ->minValue(0)
                                    ->default(1)
                                    ->helperText('Jumlah unit mobil yang tersedia'),
                            ]),

                        Textarea::make('deskripsi')
                            ->label('Deskripsi')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull(),

                        FileUpload::make('images')
                            ->label('Gambar Mobil')
                            ->image()
                            ->multiple()
                            ->disk('public')
                            ->directory('mobil-images')
                            ->visibility('public')
                            ->imageEditor()
                            ->maxSize(2048)
                            ->reorderable()
                            ->maxFiles(10)
                            ->helperText('Upload gambar mobil (maksimal 10 gambar). Gambar pertama akan menjadi gambar utama.')
                            ->columnSpanFull()
                            ->afterStateHydrated(function ($component, $state, $record) {
                                if ($record && $record->exists) {
                                    $images = $record->images()
                                        ->orderBy('order')
                                        ->pluck('image_path')
                                        ->toArray();
                                    $component->state($images);
                                }
                            })
                            ->dehydrated(false),
                    ]),
            ]);
    }
}
