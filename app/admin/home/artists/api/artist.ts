'use server'
import { createServerSupabaseClient } from '@/app/utils/supabase/server';
import { Database} from '@/types_db'

export type ArtistRow = Database["public"]["Tables"]["artist"]["Row"];
export type ArtistRowInsert = Database["public"]["Tables"]["artist"]["Insert"];
export type ArtistRowUpdate = Database["public"]["Tables"]["artist"]["Update"];

function handleError(error: any){
  console.error(error);
  throw new Error(error.message)
}

export async function getArtists({
  searchInput = ''
}){
   const supabase = await createServerSupabaseClient()

   const {data , error} = await supabase.from('artist').select('*').like('name', `%${searchInput}%`).order('created_dt', {ascending : false})

  if(error){
    handleError(error)
  }

  return data;
}

export async function getArtist(id : string){
   const supabase = await createServerSupabaseClient()

   const {data , error} = await supabase.from('artist').select('*').eq('id', id)

  if(error){
    handleError(error)
  }

  if(data == null){
    handleError({
      message : '데이터가 존재하지 않습니다.'
    })
  }

  return data![0];
}

export async function createArtist(artist:ArtistRowInsert) {
  const supabase = await createServerSupabaseClient()

  const {data, error} = await supabase.from('artist').insert({
    ...artist
  })

  if(error){
    handleError(error)
  }

  return data
}

export async function updateArtist(artist:ArtistRowUpdate) {
  const supabase = await createServerSupabaseClient()

  const {data, error} = await supabase.from('artist').update({
    ...artist,
    edit_dt : new Date().toISOString()
  }).eq('id', artist.id)

  if(error){
    handleError(error)
  }

  return data
}

export async function deleteArtist(id : string) {
  const supabase = await createServerSupabaseClient()

  const {data, error} = await supabase.from('artist').delete().match({ id : id})

  if(error){
    handleError(error)
  }

  return data
}