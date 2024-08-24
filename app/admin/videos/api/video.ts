'use server'
import { createServerSupabaseClient } from '@/app/utils/supabase/server';
import { Database} from '@/types_db'

export type VideoRow = Database["public"]["Tables"]["video"]["Row"];
export type VideoRowInsert = Database["public"]["Tables"]["video"]["Insert"];
export type VideoRowUpdate = Database["public"]["Tables"]["video"]["Update"];

function handleError(error: any){
  console.error(error);
  throw new Error(error.message)
}

export async function getVideos({
  searchInput = ''
}){
   const supabase = await createServerSupabaseClient()

   const {data , error} = await supabase.from('video').select('*').like('id', `%${searchInput}%`).order('create_dt', {ascending : false})

  if(error){
    handleError(error)
  }

  return data;
}

export async function createVideo(video:VideoRowInsert) {
  const supabase = await createServerSupabaseClient()

  const {data, error} = await supabase.from('video').insert({
    ...video,
    created_time : new Date().toISOString(),
    edit_time : new Date().toISOString()
  })

  if(error){
    handleError(error)
  }

  return data
}

export async function updateVideo(video:VideoRowUpdate) {
  const supabase = await createServerSupabaseClient()

  const {data, error} = await supabase.from('video').update({
    ...video,
    edit_time : new Date().toISOString()
  }).eq('id', video.id)

  if(error){
    handleError(error)
  }

  return data
}

export async function deleteVideo(id : string) {
  const supabase = await createServerSupabaseClient()

  const {data, error} = await supabase.from('video').delete().match({ video_id : id})

  if(error){
    handleError(error)
  }

  return data
}