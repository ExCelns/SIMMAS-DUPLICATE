import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * GET /api/jurusan
 * Fetch all jurusan with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const status = searchParams.get('status');

    let query = supabase
      .from('jurusan')
      .select('*')
      .order('nama_jurusan', { ascending: true });

    // Filter by search
    if (search) {
      query = query.or(`nama_jurusan.ilike.%${search}%,kode_jurusan.ilike.%${search}%,singkatan.ilike.%${search}%`);
    }

    // Filter by status
    if (status && status !== 'semua') {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching jurusan:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/jurusan
 * Create new jurusan
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { kode_jurusan, nama_jurusan, singkatan, deskripsi, kuota_siswa, status } = body;

    // Validation
    if (!kode_jurusan || !nama_jurusan || !singkatan) {
      return NextResponse.json(
        { error: 'Kode jurusan, nama jurusan, dan singkatan wajib diisi' },
        { status: 400 }
      );
    }

    // Check if kode_jurusan already exists
    const { data: existing } = await supabase
      .from('jurusan')
      .select('id')
      .eq('kode_jurusan', kode_jurusan)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: `Kode jurusan "${kode_jurusan}" sudah digunakan` },
        { status: 409 }
      );
    }

    // Insert new jurusan
    const { data, error } = await supabase
      .from('jurusan')
      .insert([{
        kode_jurusan,
        nama_jurusan,
        singkatan,
        deskripsi: deskripsi || null,
        kuota_siswa: kuota_siswa || 36,
        status: status || 'aktif'
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating jurusan:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Jurusan berhasil ditambahkan', data },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/jurusan
 * Update existing jurusan
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, kode_jurusan, nama_jurusan, singkatan, deskripsi, kuota_siswa, status } = body;

    // Validation
    if (!id) {
      return NextResponse.json(
        { error: 'ID jurusan wajib diisi' },
        { status: 400 }
      );
    }

    if (!kode_jurusan || !nama_jurusan || !singkatan) {
      return NextResponse.json(
        { error: 'Kode jurusan, nama jurusan, dan singkatan wajib diisi' },
        { status: 400 }
      );
    }

    // Check if kode_jurusan already exists (exclude current id)
    const { data: existing } = await supabase
      .from('jurusan')
      .select('id')
      .eq('kode_jurusan', kode_jurusan)
      .neq('id', id)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: `Kode jurusan "${kode_jurusan}" sudah digunakan oleh jurusan lain` },
        { status: 409 }
      );
    }

    // Update jurusan
    const { data, error } = await supabase
      .from('jurusan')
      .update({
        kode_jurusan,
        nama_jurusan,
        singkatan,
        deskripsi: deskripsi || null,
        kuota_siswa: kuota_siswa || 36,
        status: status || 'aktif'
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating jurusan:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Jurusan tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Jurusan berhasil diupdate', data },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/jurusan
 * Delete jurusan by ID
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID jurusan wajib diisi' },
        { status: 400 }
      );
    }

    // TODO: Check if jurusan is being used by siswa
    // const { data: siswaCount } = await supabase
    //   .from('siswa')
    //   .select('id', { count: 'exact' })
    //   .eq('jurusan_id', id);
    
    // if (siswaCount && siswaCount.length > 0) {
    //   return NextResponse.json(
    //     { error: 'Jurusan tidak dapat dihapus karena masih digunakan oleh siswa' },
    //     { status: 409 }
    //   );
    // }

    const { error } = await supabase
      .from('jurusan')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting jurusan:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Jurusan berhasil dihapus' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
