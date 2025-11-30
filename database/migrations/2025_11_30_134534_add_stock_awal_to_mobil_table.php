<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('mobil', function (Blueprint $table) {
            $table->integer('stock_awal')->default(1)->after('stock');
        });

        // Set stock_awal sama dengan stock yang ada saat ini
        DB::table('mobil')->update([
            'stock_awal' => DB::raw('stock')
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('mobil', function (Blueprint $table) {
            $table->dropColumn('stock_awal');
        });
    }
};
