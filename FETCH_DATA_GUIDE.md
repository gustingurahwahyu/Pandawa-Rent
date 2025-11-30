# Panduan Menampilkan Data Backend Laravel ke Frontend React

## 📌 Cara 1: Menggunakan Inertia.js (RECOMMENDED)

Inertia.js memungkinkan Anda pass data langsung dari Laravel Controller ke React Component tanpa perlu API request.

### Langkah-langkah:

#### 1. Di Laravel Route/Controller

```php
// routes/web.php
Route::get('/collection', function () {
    $mobils = \App\Models\Mobil::with('images')->get()->map(function ($mobil) {
        return [
            'id' => $mobil->mobil_id,
            'nama_mobil' => $mobil->nama_mobil,
            'merk' => $mobil->merk,
            'tahun' => $mobil->tahun,
            'harga_sewa' => $mobil->harga_sewa,
            'primary_image' => $mobil->images->where('is_primary', true)->first()
                ? asset('storage/' . $mobil->images->where('is_primary', true)->first()->image_path)
                : null,
        ];
    });

    return Inertia::render('collection/index', [
        'mobils' => $mobils
    ]);
})->name('collectionpage');
```

#### 2. Di React Component

```tsx
// resources/js/pages/collection/index.tsx
interface Mobil {
  id: number;
  nama_mobil: string;
  merk: string;
  tahun: number;
  harga_sewa: number;
  primary_image: string | null;
}

interface Props {
  mobils: Mobil[];
}

export default function Collection({ mobils }: Props) {
  return (
    <>
      <Hero />
      <CollectionSection mobils={mobils} />
    </>
  );
}
```

### Keuntungan Cara Inertia:

✅ Tidak perlu API request terpisah
✅ Data sudah tersedia saat page load
✅ Lebih cepat (no loading state)
✅ SEO friendly
✅ Type-safe dengan TypeScript

---

## 📌 Cara 2: Menggunakan API Fetch (Untuk Dynamic Data)

Jika Anda butuh fetch data secara dynamic (misalnya filter, search realtime), gunakan API.

### Langkah-langkah:

#### 1. API sudah tersedia di:

```
GET /api/v1/mobils
GET /api/v1/mobils/{id}
GET /api/v1/mobils-merks
```

#### 2. Di React Component:

```tsx
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Mobil {
  id: number;
  nama_mobil: string;
  merk: string;
  tahun: number;
  harga_sewa: number;
  primary_image: string | null;
}

export default function Collection() {
  const [mobils, setMobils] = useState<Mobil[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMobils();
  }, []);

  const fetchMobils = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/v1/mobils');
      setMobils(response.data.data); // data dari pagination
    } catch (error) {
      console.error('Error fetching mobils:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Hero />
      <CollectionSection mobils={mobils} />
    </>
  );
}
```

#### 3. Dengan Filter dan Search:

```tsx
const fetchMobils = async (filters?: {
  search?: string;
  merk?: string;
  available_only?: boolean;
}) => {
  try {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.merk) params.append('merk', filters.merk);
    if (filters?.available_only) params.append('available_only', '1');

    const response = await axios.get(`/api/v1/mobils?${params.toString()}`);
    setMobils(response.data.data);
  } catch (error) {
    console.error('Error fetching mobils:', error);
  } finally {
    setLoading(false);
  }
};

// Panggil dengan filter:
<SearchBar onSearch={(term) => fetchMobils({ search: term })} />;
```

### Keuntungan Cara API:

✅ Dynamic data fetching
✅ Real-time filter/search
✅ Bisa dipanggil kapan saja
✅ Bisa digunakan dari aplikasi lain (mobile app, dll)

---

## 📌 Cara 3: Kombinasi Inertia + API (BEST PRACTICE)

Gunakan Inertia untuk initial load, lalu API untuk dynamic updates:

```tsx
interface Props {
  initialMobils: Mobil[]; // dari Inertia
}

export default function Collection({ initialMobils }: Props) {
  const [mobils, setMobils] = useState<Mobil[]>(initialMobils);
  const [loading, setLoading] = useState(false);

  // Initial data dari Inertia (cepat)
  useEffect(() => {
    setMobils(initialMobils);
  }, [initialMobils]);

  // Filter/search menggunakan API
  const handleSearch = async (search: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/v1/mobils?search=${search}`);
      setMobils(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {loading ? <div>Loading...</div> : <CollectionSection mobils={mobils} />}
    </>
  );
}
```

---

## 🔧 Tips & Best Practices

### 1. Setup Axios Base URL (Optional)

```ts
// resources/js/lib/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

Gunakan:

```tsx
import api from '@/lib/axios';

const response = await api.get('/mobils');
```

### 2. Buat Custom Hook untuk Fetch Data

```tsx
// resources/js/hooks/useMobils.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

export function useMobils(filters?: any) {
  const [mobils, setMobils] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMobils();
  }, [filters]);

  const fetchMobils = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/v1/mobils', { params: filters });
      setMobils(response.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { mobils, loading, error, refetch: fetchMobils };
}

// Gunakan di component:
const { mobils, loading, error } = useMobils({ merk: 'Toyota' });
```

### 3. Error Handling

```tsx
try {
  const response = await axios.get('/api/v1/mobils');
  setMobils(response.data.data);
} catch (error) {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      console.error('Data tidak ditemukan');
    } else if (error.response?.status === 500) {
      console.error('Server error');
    }
  }
}
```

### 4. Loading State

```tsx
{
  loading ? (
    <div className="grid grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  ) : (
    <div className="grid grid-cols-3 gap-6">
      {mobils.map((mobil) => (
        <CarCard key={mobil.id} {...mobil} />
      ))}
    </div>
  );
}
```

---

## 🎯 Kapan Menggunakan Apa?

| Skenario                            | Solusi           |
| ----------------------------------- | ---------------- |
| Data statis yang tidak berubah      | ✅ Inertia       |
| Halaman dengan SEO penting          | ✅ Inertia       |
| Filter/search real-time             | ✅ API           |
| Data yang sering berubah            | ✅ API           |
| Initial page load + dynamic updates | ✅ Inertia + API |
| Mobile app integration              | ✅ API only      |

---

## 📝 Contoh Lengkap: Collection Page dengan Filter

```tsx
import { useState } from 'react';
import axios from 'axios';

interface Mobil {
  id: number;
  nama_mobil: string;
  merk: string;
  tahun: number;
  harga_sewa: number;
  primary_image: string | null;
}

interface Props {
  initialMobils: Mobil[];
  merks: string[];
}

export default function Collection({ initialMobils, merks }: Props) {
  const [mobils, setMobils] = useState<Mobil[]>(initialMobils);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    merk: '',
    available_only: false,
  });

  const fetchMobils = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.search) params.append('search', filters.search);
      if (filters.merk) params.append('merk', filters.merk);
      if (filters.available_only) params.append('available_only', '1');

      const response = await axios.get(`/api/v1/mobils?${params.toString()}`);
      setMobils(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <Hero />

      {/* Filter Section */}
      <div className="filters px-6 py-4">
        <input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />

        <select
          value={filters.merk}
          onChange={(e) => handleFilterChange('merk', e.target.value)}
        >
          <option value="">All Brands</option>
          {merks.map((merk) => (
            <option key={merk} value={merk}>
              {merk}
            </option>
          ))}
        </select>

        <button onClick={fetchMobils}>Apply Filter</button>
      </div>

      {/* Collection Grid */}
      {loading ? <div>Loading...</div> : <CollectionSection mobils={mobils} />}
    </>
  );
}

Collection.layout = (page: React.ReactNode) => <AppLayout children={page} />;
```

Dan di Laravel:

```php
Route::get('/collection', function () {
    $mobils = \App\Models\Mobil::with('images')->get();
    $merks = \App\Models\Mobil::distinct()->pluck('merk');

    return Inertia::render('collection/index', [
        'initialMobils' => $mobils,
        'merks' => $merks,
    ]);
})->name('collectionpage');
```

---

## 🚀 Next Steps

1. ✅ Data sudah ditampilkan dari database
2. [ ] Tambahkan pagination
3. [ ] Tambahkan filter dan search
4. [ ] Tambahkan loading skeleton
5. [ ] Handle error states
6. [ ] Optimize images (lazy loading)
