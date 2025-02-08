'use server'
import { createServerSupabaseClient } from '@/app/utils/supabase/server';
import { Database} from '@/types_db'

export type VideoRow = Database["public"]["Tables"]["video"]["Row"];

function handleError(error: any){
  console.error(error);
  throw new Error(error.message)
}

export async function getVideosByChannel(id : string){
  const supabase = await createServerSupabaseClient()

  const {data , error} = await supabase.from('video').select('*').eq('channel', id)

 if(error){
   handleError(error)
 }

 return data ?? [];
}