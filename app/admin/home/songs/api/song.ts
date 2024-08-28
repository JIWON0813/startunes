'use server'
import { createServerSupabaseClient } from '@/app/utils/supabase/server';
import { Database} from '@/types_db'

export type SongRow = Database["public"]["Tables"]["song"]["Row"];
export type SongRowInsert = Database["public"]["Tables"]["song"]["Insert"];
export type SongRowUpdate = Database["public"]["Tables"]["song"]["Update"];

function handleError(error: any){
  console.error(error);
  throw new Error(error.message)
}

export async function getSongs({
  searchInput = ''
}){
   const supabase = await createServerSupabaseClient()

   const {data , error} = await supabase.from('song').select('*').like('artist', `%${searchInput}%`).order('created_time', {ascending : false})

  if(error){
    handleError(error)
  }

  return data;
}

export async function createSong(song:SongRowInsert) {
  const supabase = await createServerSupabaseClient()

  const {data, error} = await supabase.from('song').insert({
    ...song,
    created_time : new Date().toISOString(),
    edit_time : new Date().toISOString()
  })

  if(error){
    handleError(error)
  }

  return data
}

export async function updateSong(song:SongRowUpdate) {
  const supabase = await createServerSupabaseClient()

  const {data, error} = await supabase.from('song').update({
    ...song,
    edit_time : new Date().toISOString()
  }).eq('song_id', song.song_id)

  if(error){
    handleError(error)
  }

  return data
}

export async function deleteSong(id : string) {
  const supabase = await createServerSupabaseClient()

  const {data, error} = await supabase.from('song').delete().match({ song_id : id})

  if(error){
    handleError(error)
  }

  return data
}