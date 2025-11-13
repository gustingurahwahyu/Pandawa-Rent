<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MobilImage extends Model
{
    use HasFactory;

    protected $table = 'mobil_images';
    protected $primaryKey = 'image_id';

    protected $fillable = [
        'mobil_id',
        'image_path',
        'is_primary',
        'order',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Get the mobil that owns the image.
     */
    public function mobil(): BelongsTo
    {
        return $this->belongsTo(Mobil::class, 'mobil_id', 'mobil_id');
    }
}
