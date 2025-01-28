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

   const {data , error} = await supabase.from('song').select('*').like('title', `%${searchInput}%`).order('created_time', {ascending : false})

  if(error){
    handleError(error)
  }

  return data;
}

export async function getSong(song_id : string){
   const supabase = await createServerSupabaseClient()

   const {data , error} = await supabase.from('song').select('*').eq('song_id', song_id)

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