<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mobil extends Model
{
    use HasFactory;

    protected $table = 'mobil';
    protected $primaryKey = 'mobil_id';

    protected $fillable = [
        'nama_mobil',
        'merk',
        'tahun',
        'deskripsi',
        'harga_sewa',
        'stock',
    ];

    protected $casts = [
        'harga_sewa' => 'decimal:2',
        'tahun' => 'integer',
        'stock' => 'integer',
    ];

    /**
     * Get the bookings for the mobil.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'mobil_id', 'mobil_id');
    }

    /**
     * Get the images for the mobil.
     */
    public function images(): HasMany
    {
        return $this->hasMany(MobilImage::class, 'mobil_id', 'mobil_id')->orderBy('order');
    }

    /**
     * Get the primary image for the mobil.
     */
    public function primaryImage()
    {
        return $this->hasOne(MobilImage::class, 'mobil_id', 'mobil_id')
            ->where('is_primary', true)
            ->orWhereRaw('image_id = (SELECT MIN(image_id) FROM mobil_images WHERE mobil_id = ?)', [$this->mobil_id]);
    }
}
