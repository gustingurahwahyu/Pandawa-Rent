<?php

namespace Database\Seeders;

use App\Models\Mobil;
use App\Models\MobilImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MobilSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $mobils = [
            [
                'nama_mobil' => 'Toyota Avanza',
                'merk' => 'Toyota',
                'tahun' => 2023,
                'deskripsi' => 'Mobil keluarga yang nyaman dan irit bahan bakar, cocok untuk perjalanan keluarga',
                'harga_sewa' => 350000,
                'stock' => 5,
            ],
            [
                'nama_mobil' => 'Honda Jazz',
                'merk' => 'Honda',
                'tahun' => 2022,
                'deskripsi' => 'Mobil city car yang lincah dan stylish, sempurna untuk di kota',
                'harga_sewa' => 300000,
                'stock' => 3,
            ],
            [
                'nama_mobil' => 'Mitsubishi Xpander',
                'merk' => 'Mitsubishi',
                'tahun' => 2023,
                'deskripsi' => 'MPV modern dengan kabin luas dan fitur lengkap',
                'harga_sewa' => 400000,
                'stock' => 4,
            ],
            [
                'nama_mobil' => 'Toyota Innova Reborn',
                'merk' => 'Toyota',
                'tahun' => 2024,
                'deskripsi' => 'MPV premium dengan kenyamanan maksimal untuk perjalanan jauh',
                'harga_sewa' => 500000,
                'stock' => 2,
            ],
            [
                'nama_mobil' => 'Daihatsu Terios',
                'merk' => 'Daihatsu',
                'tahun' => 2022,
                'deskripsi' => 'SUV compact yang tangguh dan cocok untuk berbagai medan',
                'harga_sewa' => 380000,
                'stock' => 3,
            ],
        ];

        foreach ($mobils as $mobilData) {
            $mobil = Mobil::create($mobilData);

            // Create 2-3 dummy images for each car
            $imageCount = rand(2, 3);
            for ($i = 0; $i < $imageCount; $i++) {
                MobilImage::create([
                    'mobil_id' => $mobil->mobil_id,
                    'image_path' => 'mobil-images/dummy-car-' . rand(1, 5) . '.jpg',
                    'is_primary' => $i === 0,
                    'order' => $i,
                ]);
            }
        }
    }
}
