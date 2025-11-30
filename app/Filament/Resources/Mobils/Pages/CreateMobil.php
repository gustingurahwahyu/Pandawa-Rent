<?php

namespace App\Filament\Resources\Mobils\Pages;

use App\Filament\Resources\Mobils\MobilResource;
use Filament\Resources\Pages\CreateRecord;

class CreateMobil extends CreateRecord
{
    protected static string $resource = MobilResource::class;

    protected function afterCreate(): void
    {
        $images = $this->data['images'] ?? [];

        if (is_array($images) && count($images) > 0) {
            // Re-index array to ensure numeric keys start from 0
            $images = array_values($images);

            foreach ($images as $index => $imagePath) {
                // Pastikan $imagePath adalah string dan bukan array
                if (!is_string($imagePath)) {
                    continue;
                }

                $this->record->images()->create([
                    'image_path' => $imagePath,
                    'is_primary' => $index === 0,
                    'order' => $index,
                ]);
            }
        }
    }
}
