<?php

namespace App\Console\Commands;

use App\Models\Mobil;
use Illuminate\Console\Command;

class SyncStock extends Command
{
    protected $signature = 'stock:sync {--dry-run : Show changes without saving}';

    protected $description = 'Synchronize available stock for all cars based on active bookings';

    public function handle(): int
    {
        $dry = (bool) $this->option('dry-run');

        $this->info('Synchronizing stock based on active bookings...');

        $total = 0;
        $fixed = 0;

        Mobil::withCount([
            'bookings as active_bookings_count' => function ($q) {
                $q->whereIn('status_booking', ['pending', 'confirmed', 'ongoing']);
            }
        ])->chunkById(100, function ($mobils) use (&$total, &$fixed, $dry) {
            foreach ($mobils as $m) {
                $total++;
                $expected = max(0, (int)$m->stock_awal - (int)$m->active_bookings_count);
                if ((int)$m->stock !== $expected) {
                    $this->line(sprintf(
                        "- %s (ID:%s): %d/%d -> %d",
                        $m->nama_mobil,
                        $m->mobil_id,
                        (int)$m->stock,
                        (int)$m->stock_awal,
                        $expected
                    ));
                    if (! $dry) {
                        $m->stock = $expected;
                        $m->save();
                    }
                    $fixed++;
                }
            }
        }, 'mobil_id');

        $this->info(sprintf('Checked %d cars, corrected %d.', $total, $fixed));
        if ($dry) {
            $this->comment('Dry run only: no changes were saved.');
        }

        return Command::SUCCESS;
    }
}
