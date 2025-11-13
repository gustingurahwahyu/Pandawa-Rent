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

                TextColumn::make('harga_sewa')
                    ->label('Harga Sewa')
                    ->money('IDR')
                    ->sortable(),

                TextColumn::make('stock')
                    ->label('Stock')
                    ->badge()
                    ->color(fn(int $state): string => match (true) {
                        $state === 0 => 'danger',
                        $state <= 2 => 'warning',
                        default => 'success',
                    })
                    ->sortable(),

                TextColumn::make('images_count')
                    ->label('Jumlah Gambar')
                    ->counts('images')
                    ->badge()
                    ->color('success'),

                TextColumn::make('available_count')
                    ->label('Tersedia')
                    ->badge()
                    ->getStateUsing(function ($record) {
                        $ongoingBookings = $record->bookings()
                            ->whereIn('status_booking', ['confirmed', 'ongoing'])
                            ->count();
                        return max(0, $record->stock - $ongoingBookings);
                    })
                    ->color(fn(int $state): string => match (true) {
                        $state === 0 => 'danger',
                        $state <= 2 => 'warning',
                        default => 'success',
                    }),

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
