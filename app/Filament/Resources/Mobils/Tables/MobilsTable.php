<?php

namespace App\Filament\Resources\Mobils\Tables;

use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ImageColumn;

class MobilsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('primaryImage.image_path')
                    ->label('Gambar')
                    ->disk('public')
                    ->circular()
                    ->defaultImageUrl(url('/images/no-image.png')),

                TextColumn::make('nama_mobil')
                    ->label('Nama Mobil')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('merk')
                    ->label('Merk')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('tahun')
                    ->label('Tahun')
                    ->numeric()
                    ->sortable(),

                TextColumn::make('transmisi')
                    ->label('Transmisi')
                    ->badge()
                    ->color('info')
                    ->sortable(),

                TextColumn::make('penggerak')
                    ->label('Penggerak')
                    ->badge()
                    ->color('primary')
                    ->sortable(),

                TextColumn::make('harga_sewa')
                    ->label('Harga Sewa')
                    ->money('IDR')
                    ->sortable(),

                TextColumn::make('stock_awal')
                    ->label('Stock Awal')
                    ->badge()
                    ->color('gray')
                    ->sortable()
                    ->description('Total unit yang dimiliki'),

                TextColumn::make('stock')
                    ->label('Stock Tersedia')
                    ->badge()
                    ->color(fn(int $state): string => match (true) {
                        $state === 0 => 'danger',
                        $state <= 2 => 'warning',
                        default => 'success',
                    })
                    ->sortable()
                    ->description('Unit yang bisa disewa'),

                TextColumn::make('images_count')
                    ->label('Jumlah Gambar')
                    ->counts('images')
                    ->badge()
                    ->color('success')
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('created_at')
                    ->label('Dibuat')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('updated_at')
                    ->label('Diupdate')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
