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

   const {data , error} = await supabase.from('video').select('*').like('cover_artist', `%${searchInput}%`).order('created_dt', {ascending : false})

  if(error){
    handleError(error)
  }

  return data;
}

export async function getVideo(id : string){
  const supabase = await createServerSupabaseClient()

  const {data , error} = await supabase.from('video').select('*').eq('link', id)

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

export async function createVideo(video:VideoRowInsert) {
  const supabase = await createServerSupabaseClient()

  const {data, error} = await supabase.from('video').insert({
    ...video
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
  }).eq('link', video.link!)

  if(error){
    handleError(error)
  }

  return data
}

export async function deleteVideo(id : string) {
  const supabase = await createServerSupabaseClient()

  const {data, error} = await supabase.from('video').delete().match({ link : id})

  if(error){
    handleError(error)
  }

  return data
}