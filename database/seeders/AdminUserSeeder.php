<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'nama_lengkap' => 'Administrator',
            'email' => 'admin@admin.com',
            'password' => Hash::make('password'),
            'no_telepon' => '08123456789',
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // Create regular user for testing
        User::create([
            'nama_lengkap' => 'User Test',
            'email' => 'user@test.com',
            'password' => Hash::make('password'),
            'no_telepon' => '08987654321',
            'role' => 'user',
            'email_verified_at' => now(),
        ]);
    }
}
