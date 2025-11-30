<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

Route::get('/', function () {
    $mobils = \App\Models\Mobil::with('images')
        ->take(6)
        ->get()
        ->map(function ($mobil) {
            return [
                'id' => $mobil->mobil_id,
                'nama_mobil' => $mobil->nama_mobil,
                'merk' => $mobil->merk,
                'tahun' => $mobil->tahun,
                'transmisi' => $mobil->transmisi,
                'penggerak' => $mobil->penggerak,
                'harga_sewa' => $mobil->harga_sewa,
                'stock' => $mobil->stock,
                'primary_image' => $mobil->images->where('is_primary', true)->first()
                    ? asset('storage/' . $mobil->images->where('is_primary', true)->first()->image_path)
                    : null,
            ];
        });

    // Get unique brands
    $brands = \App\Models\Mobil::select('merk')
        ->distinct()
        ->orderBy('merk')
        ->pluck('merk');

    return Inertia::render('home/index', [
        'mobils' => $mobils,
        'brands' => $brands
    ]);
})->name('homepage');

Route::get('/collection', function () {
    $mobils = \App\Models\Mobil::with('images')
        ->paginate(9)
        ->through(function ($mobil) {
            return [
                'id' => $mobil->mobil_id,
                'nama_mobil' => $mobil->nama_mobil,
                'merk' => $mobil->merk,
                'tahun' => $mobil->tahun,
                'transmisi' => $mobil->transmisi,
                'penggerak' => $mobil->penggerak,
                'harga_sewa' => $mobil->harga_sewa,
                'stock' => $mobil->stock,
                'primary_image' => $mobil->images->where('is_primary', true)->first()
                    ? asset('storage/' . $mobil->images->where('is_primary', true)->first()->image_path)
                    : null,
            ];
        });

    return Inertia::render('collection/index', [
        'mobils' => $mobils
    ]);
})->name('collectionpage');

Route::get('/about', function () {
    return Inertia::render('about/index');
})->name('aboutpage');

Route::get('/contact', function () {
    return Inertia::render('contact/index');
})->name('contactpage');

Route::get('/detail/{id}', function ($id) {
    $mobil = \App\Models\Mobil::with('images')->findOrFail($id);

    return Inertia::render('detail/index', [
        'mobil' => [
            'id' => $mobil->mobil_id,
            'nama_mobil' => $mobil->nama_mobil,
            'merk' => $mobil->merk,
            'tahun' => $mobil->tahun,
            'transmisi' => $mobil->transmisi,
            'penggerak' => $mobil->penggerak,
            'deskripsi' => $mobil->deskripsi,
            'harga_sewa' => $mobil->harga_sewa,
            'stock' => $mobil->stock,
            'images' => $mobil->images->map(function ($image) {
                return [
                    'id' => $image->image_id,
                    'url' => asset('storage/' . $image->image_path),
                    'is_primary' => $image->is_primary,
                ];
            }),
            'primary_image' => $mobil->images->where('is_primary', true)->first()
                ? asset('storage/' . $mobil->images->where('is_primary', true)->first()->image_path)
                : null,
        ]
    ]);
})->name('cardetail');

// Protected routes - require authentication
Route::middleware(['auth'])->group(function () {
    Route::get('/confirmation/{id}', function ($id) {
        $mobil = \App\Models\Mobil::with('images')->findOrFail($id);

        return Inertia::render('confirmation/index', [
            'mobil' => [
                'id' => $mobil->mobil_id,
                'nama_mobil' => $mobil->nama_mobil,
                'merk' => $mobil->merk,
                'tahun' => $mobil->tahun,
                'transmisi' => $mobil->transmisi,
                'penggerak' => $mobil->penggerak,
                'harga_sewa' => $mobil->harga_sewa,
                'images' => $mobil->images->map(function ($image) {
                    return [
                        'id' => $image->image_id,
                        'url' => asset('storage/' . $image->image_path),
                        'is_primary' => $image->is_primary,
                    ];
                }),
                'primary_image' => $mobil->images->where('is_primary', true)->first()
                    ? asset('storage/' . $mobil->images->where('is_primary', true)->first()->image_path)
                    : null,
            ]
        ]);
    })->name('orderconfirmation');

    Route::post('/booking/store', function (\Illuminate\Http\Request $request) {
        $validated = $request->validate([
            'mobil_id' => 'required|exists:mobil,mobil_id',
            'tanggal_ambil' => 'required|date',
            'tanggal_kembali' => 'required|date|after:tanggal_ambil',
            'total_biaya' => 'required|numeric|min:0',
            'bukti_sim' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'bukti_pembayaran' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        // Check stock availability
        $mobil = \App\Models\Mobil::findOrFail($validated['mobil_id']);
        if ($mobil->stock < 1) {
            return back()->with('error', 'Maaf, mobil tidak tersedia. Stok habis.');
        }

        // Upload SIM
        $simPath = $request->file('bukti_sim')->store('sim', 'public');

        // Upload Bukti Pembayaran
        $paymentPath = $request->file('bukti_pembayaran')->store('payments', 'public');

        // Create Booking
        $booking = \App\Models\Booking::create([
            'user_id' => auth()->id(),
            'mobil_id' => $validated['mobil_id'],
            'tanggal_ambil' => $validated['tanggal_ambil'],
            'tanggal_kembali' => $validated['tanggal_kembali'],
            'total_biaya' => $validated['total_biaya'],
            'status_booking' => 'pending',
        ]);

        // Create Payment
        \App\Models\Payment::create([
            'booking_id' => $booking->booking_id,
            'bukti_pembayaran' => $paymentPath,
            'status_pembayaran' => 'pending',
            'tanggal_pembayaran' => now(),
        ]);

        // Decrement stock
        $mobil->decrement('stock');

        return redirect()->route('orderhistory')->with('success', 'Booking successfully created!');
    })->name('booking.store');

    Route::get('/history', function () {
        $bookings = \App\Models\Booking::with(['mobil.images'])
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($booking) {
                return [
                    'id' => $booking->booking_id,
                    'car_name' => $booking->mobil->nama_mobil,
                    'car_image' => $booking->mobil->images->where('is_primary', true)->first()
                        ? asset('storage/' . $booking->mobil->images->where('is_primary', true)->first()->image_path)
                        : null,
                    'pickup_date' => $booking->tanggal_ambil->format('Y-m-d'),
                    'dropoff_date' => $booking->tanggal_kembali->format('Y-m-d'),
                    'total' => $booking->total_biaya,
                    'status' => $booking->status_booking,
                ];
            });

        return Inertia::render('history/index', [
            'bookings' => $bookings
        ]);
    })->name('orderhistory');

    Route::get('/booking/{id}/receipt', function ($id) {
        $booking = \App\Models\Booking::with(['mobil', 'user', 'payment'])
            ->where('booking_id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        // Only allow confirmed bookings to download receipt
        if ($booking->status_booking !== 'confirmed') {
            abort(403, 'Receipt only available for confirmed bookings');
        }

        return view('receipt', [
            'booking' => $booking
        ]);
    })->name('booking.receipt');
});

// Route::get('/home', function () {
//     return Inertia::render('homepage', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');

require __DIR__ . '/settings.php';
