<?php

namespace App\Filament\Resources\Mobils\Pages;

use App\Filament\Resources\Mobils\MobilResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditMobil extends EditRecord
{
    protected static string $resource = MobilResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }

    protected function afterSave(): void
    {
        $images = $this->data['images'] ?? [];

        if (is_array($images) && count($images) > 0) {
            // Get existing images with their IDs
            $existingImages = $this->record->images()->get()->keyBy('image_path');

            // Delete images that are not in the new state
            $this->record->images()
                ->whereNotIn('image_path', $images)
                ->delete();

            // Re-index array to ensure numeric keys start from 0
            $images = array_values($images);

            // Add or update images
            foreach ($images as $index => $imagePath) {
                // Pastikan $imagePath adalah string dan bukan array
                if (!is_string($imagePath)) {
                    continue;
                }

                if (!$existingImages->has($imagePath)) {
                    // Create new image
                    $this->record->images()->create([
                        'image_path' => $imagePath,
                        'is_primary' => $index === 0,
                        'order' => $index,
                    ]);
                } else {
                    // Update existing image by ID
                    $existingImage = $existingImages->get($imagePath);
                    $existingImage->update([
                        'is_primary' => $index === 0,
                        'order' => $index,
                    ]);
                }
            }
        }
    }
}
