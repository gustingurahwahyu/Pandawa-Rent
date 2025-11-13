<?php

namespace App\Filament\Resources\Mobils\Schemas;

use Filament\Schemas\Schema;
use Filament\Schemas\Components\Grid;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\FileUpload;


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
                            ->required()
                            ->directory('mobil-images')
                            ->imageEditor()
                            ->maxSize(2048)
                            ->reorderable()
                            ->maxFiles(10)
                            ->helperText('Upload gambar mobil (maksimal 10 gambar). Gambar pertama akan menjadi gambar utama.')
                            ->columnSpanFull()
                            ->saveRelationshipsUsing(function ($component, $state, $record) {
                                if (!$record) {
                                    return;
                                }

                                // Delete old images if needed
                                if ($component->isDehydrated()) {
                                    $record->images()->delete();
                                }

                                // Save new images
                                if (is_array($state)) {
                                    foreach ($state as $index => $imagePath) {
                                        $record->images()->create([
                                            'image_path' => $imagePath,
                                            'is_primary' => $index === 0,
                                            'order' => $index,
                                        ]);
                                    }
                                }
                            })
                            ->loadStateFromRelationshipsUsing(function ($component, $record) {
                                if (!$record) {
                                    return [];
                                }

                                return $record->images()->pluck('image_path')->toArray();
                            }),
                    ]),
            ]);
    }
}
