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
        'gambar',
    ];

    protected $casts = [
        'harga_sewa' => 'decimal:2',
        'tahun' => 'integer',
    ];

    /**
     * Get the bookings for the mobil.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'mobil_id', 'mobil_id');
    }
}
