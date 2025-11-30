<?php

namespace App\Filament\Widgets;

use App\Models\Booking;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;

class BookingChart extends ChartWidget
{
    protected static ?int $sort = 2;

    public ?string $filter = 'week';

    public function getHeading(): string
    {
        return 'Statistik Booking';
    }

    protected function getData(): array
    {
        $data = $this->getBookingData();

        return [
            'datasets' => [
                [
                    'label' => 'Total Booking',
                    'data' => $data['values'],
                    'backgroundColor' => '#4F46E5',
                    'borderColor' => '#4F46E5',
                ],
            ],
            'labels' => $data['labels'],
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }

    protected function getFilters(): ?array
    {
        return [
            'today' => 'Hari Ini',
            'week' => '7 Hari Terakhir',
            'month' => '30 Hari Terakhir',
            'year' => 'Tahun Ini',
        ];
    }

    private function getBookingData(): array
    {
        $data = match ($this->filter) {
            'today' => $this->getDataToday(),
            'week' => $this->getDataWeek(),
            'month' => $this->getDataMonth(),
            'year' => $this->getDataYear(),
            default => $this->getDataWeek(),
        };

        return $data;
    }

    private function getDataToday(): array
    {
        $hours = [];
        $values = [];

        for ($i = 0; $i < 24; $i++) {
            $hour = str_pad($i, 2, '0', STR_PAD_LEFT);
            $hours[] = $hour . ':00';

            $count = Booking::whereDate('created_at', today())
                ->whereRaw('HOUR(created_at) = ?', [$i])
                ->count();

            $values[] = $count;
        }

        return [
            'labels' => $hours,
            'values' => $values,
        ];
    }

    private function getDataWeek(): array
    {
        $days = [];
        $values = [];

        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $days[] = $date->format('d M');

            $count = Booking::whereDate('created_at', $date->toDateString())->count();
            $values[] = $count;
        }

        return [
            'labels' => $days,
            'values' => $values,
        ];
    }

    private function getDataMonth(): array
    {
        $days = [];
        $values = [];

        for ($i = 29; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $days[] = $date->format('d M');

            $count = Booking::whereDate('created_at', $date->toDateString())->count();
            $values[] = $count;
        }

        return [
            'labels' => $days,
            'values' => $values,
        ];
    }

    private function getDataYear(): array
    {
        $months = [];
        $values = [];

        for ($i = 11; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $months[] = $date->format('M Y');

            $count = Booking::whereYear('created_at', $date->year)
                ->whereMonth('created_at', $date->month)
                ->count();

            $values[] = $count;
        }

        return [
            'labels' => $months,
            'values' => $values,
        ];
    }
}
