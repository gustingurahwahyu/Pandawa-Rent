<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('mobil', function (Blueprint $table) {
            $table->enum('transmisi', ['Manual', 'Automatic', 'CVT', 'DCT'])->default('Automatic')->after('deskripsi');
            $table->enum('penggerak', ['FWD', 'RWD', 'AWD', '4WD'])->default('FWD')->after('transmisi');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mobil', function (Blueprint $table) {
            $table->dropColumn(['transmisi', 'penggerak']);
        });
    }
};
