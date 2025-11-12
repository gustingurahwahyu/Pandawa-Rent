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
                            ]),

                        Textarea::make('deskripsi')
                            ->label('Deskripsi')
                            ->required()
                            ->rows(4)
                            ->columnSpanFull(),

                        FileUpload::make('gambar')
                            ->label('Gambar Mobil')
                            ->image()
                            ->required()
                            ->directory('mobil-images')
                            ->imageEditor()
                            ->maxSize(2048)
                            ->columnSpanFull(),
                    ]),
            ]);
    }
}
