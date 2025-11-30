<?php

namespace App\Filament\Resources\BookingReports\Tables;

use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class BookingReportsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('booking_id')
                    ->label('ID Booking')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('user.nama_lengkap')
                    ->label('Pelanggan')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('mobil.nama_mobil')
                    ->label('Mobil')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('tanggal_ambil')
                    ->label('Tanggal Ambil')
                    ->date('d/m/Y')
                    ->sortable(),

                TextColumn::make('tanggal_kembali')
                    ->label('Tanggal Kembali')
                    ->date('d/m/Y')
                    ->sortable(),

                TextColumn::make('total_biaya')
                    ->label('Total Biaya')
                    ->money('IDR')
                    ->sortable()
                    ->summarize([
                        \Filament\Tables\Columns\Summarizers\Sum::make()
                            ->money('IDR')
                            ->label('Total Pendapatan'),
                    ]),

                TextColumn::make('status_booking')
                    ->label('Status')
                    ->badge()
                    ->color(fn(string $state): string => match ($state) {
                        'pending' => 'warning',
                        'confirmed' => 'info',
                        'ongoing' => 'primary',
                        'completed' => 'success',
                        'cancelled' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn(string $state): string => match ($state) {
                        'pending' => 'Pending',
                        'confirmed' => 'Confirmed',
                        'ongoing' => 'Ongoing',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                        default => ucfirst($state),
                    }),

                TextColumn::make('created_at')
                    ->label('Tanggal Booking')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('status_booking')
                    ->label('Status')
                    ->options([
                        'pending' => 'Pending',
                        'confirmed' => 'Confirmed',
                        'ongoing' => 'Ongoing',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ]),

                Filter::make('created_at')
                    ->form([
                        \Filament\Forms\Components\DatePicker::make('from')
                            ->label('Dari Tanggal'),
                        \Filament\Forms\Components\DatePicker::make('until')
                            ->label('Sampai Tanggal'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['from'],
                                fn(Builder $query, $date): Builder => $query->whereDate('created_at', '>=', $date),
                            )
                            ->when(
                                $data['until'],
                                fn(Builder $query, $date): Builder => $query->whereDate('created_at', '<=', $date),
                            );
                    })
                    ->indicateUsing(function (array $data): array {
                        $indicators = [];

                        if ($data['from'] ?? null) {
                            $indicators[] = 'Dari: ' . \Carbon\Carbon::parse($data['from'])->format('d/m/Y');
                        }

                        if ($data['until'] ?? null) {
                            $indicators[] = 'Sampai: ' . \Carbon\Carbon::parse($data['until'])->format('d/m/Y');
                        }

                        return $indicators;
                    }),
            ])
            ->actions([
                // Print actions dapat diakses via URL langsung
                // /admin/booking/{id}/print
            ])
            ->bulkActions([
                //
            ])
            ->defaultSort('created_at', 'desc')
            ->poll('30s'); // Auto refresh tiap 30 detik
    }
}
