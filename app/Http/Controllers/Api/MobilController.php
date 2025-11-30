<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Mobil;
use Illuminate\Http\Request;

class MobilController extends Controller
{
    /**
     * Display a listing of available mobils.
     */
    public function index(Request $request)
    {
        $query = Mobil::with(['images', 'bookings']);

        // Filter by availability
        if ($request->has('available_only') && $request->available_only) {
            $query->where('stock', '>', 0);
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_mobil', 'like', "%{$search}%")
                    ->orWhere('merk', 'like', "%{$search}%");
            });
        }

        // Filter by merk
        if ($request->has('merk')) {
            $query->where('merk', $request->merk);
        }

        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $mobils = $query->paginate($request->get('per_page', 12));

        // Transform data
        $mobils->getCollection()->transform(function ($mobil) {
            $ongoingBookings = $mobil->bookings()
                ->whereIn('status_booking', ['confirmed', 'ongoing'])
                ->count();

            $available = max(0, $mobil->stock - $ongoingBookings);

            return [
                'id' => $mobil->mobil_id,
                'nama_mobil' => $mobil->nama_mobil,
                'merk' => $mobil->merk,
                'tahun' => $mobil->tahun,
                'deskripsi' => $mobil->deskripsi,
                'transmisi' => $mobil->transmisi,
                'penggerak' => $mobil->penggerak,
                'harga_sewa' => $mobil->harga_sewa,
                'stock' => $mobil->stock,
                'available' => $available,
                'is_available' => $available > 0,
                'images' => $mobil->images->map(function ($image) {
                    return [
                        'id' => $image->image_id,
                        'url' => asset('storage/' . $image->image_path),
                        'is_primary' => $image->is_primary,
                    ];
                }),
                'primary_image' => $mobil->images->where('is_primary', true)->first()
                    ? asset('storage/' . $mobil->images->where('is_primary', true)->first()->image_path)
                    : ($mobil->images->first()
                        ? asset('storage/' . $mobil->images->first()->image_path)
                        : null),
            ];
        });

        return response()->json($mobils);
    }

    /**
     * Display the specified mobil.
     */
    public function show($id)
    {
        $mobil = Mobil::with(['images', 'bookings'])->findOrFail($id);

        $ongoingBookings = $mobil->bookings()
            ->whereIn('status_booking', ['confirmed', 'ongoing'])
            ->count();

        $available = max(0, $mobil->stock - $ongoingBookings);

        return response()->json([
            'id' => $mobil->mobil_id,
            'nama_mobil' => $mobil->nama_mobil,
            'merk' => $mobil->merk,
            'tahun' => $mobil->tahun,
            'deskripsi' => $mobil->deskripsi,
            'transmisi' => $mobil->transmisi,
            'penggerak' => $mobil->penggerak,
            'harga_sewa' => $mobil->harga_sewa,
            'stock' => $mobil->stock,
            'available' => $available,
            'is_available' => $available > 0,
            'images' => $mobil->images->map(function ($image) {
                return [
                    'id' => $image->image_id,
                    'url' => asset('storage/' . $image->image_path),
                    'is_primary' => $image->is_primary,
                    'order' => $image->order,
                ];
            }),
        ]);
    }

    /**
     * Get available merks.
     */
    public function getMerks()
    {
        $merks = Mobil::select('merk')
            ->distinct()
            ->orderBy('merk')
            ->pluck('merk');

        return response()->json($merks);
    }
}
