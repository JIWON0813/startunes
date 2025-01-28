'use server'
import { createServerSupabaseClient } from '@/app/utils/supabase/server';
import { Database} from '@/types_db'

export type ChannelRow = Database["public"]["Tables"]["channel"]["Row"];
export type ChannelRowInsert = Database["public"]["Tables"]["channel"]["Insert"];
export type ChannelRowUpdate = Database["public"]["Tables"]["channel"]["Update"];

function handleError(error: any){
  console.error(error);
  throw new Error(error.message)
}

export async function getChannels({
  searchInput = ''
}){
   const supabase = await createServerSupabaseClient()

   const {data , error} = await supabase.from('channel').select('*').like('name', `%${searchInput}%`).order('created_dt', {ascending : false})

  if(error){
    handleError(error)
  }

  return data;
}

export async function getChannel(id : string){
   const supabase = await createServerSupabaseClient()

   const {data , error} = await supabase.from('channel').select('*').eq('id', id)

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

export async function createChannel(channel:ChannelRowInsert) {
  const supabase = await createServerSupabaseClient()

  const {data, error} = await supabase.from('channel').insert({
    ...channel
  })

  if(error){
    handleError(error)
  }

  return data
}

export async function updateChannel(channel:ChannelRowUpdate) {
  const supabase = await createServerSupabaseClient()

  const {data, error} = await supabase.from('channel').update({
    ...channel,
    edit_dt : new Date().toISOString()
  }).eq('id', channel.id!)

  if(error){
    handleError(error)
  }

  return data
}

export async function deleteChannel(id : string) {
  const supabase = await createServerSupabaseClient()

  const {data, error} = await supabase.from('channel').delete().match({ id : id})

  if(error){
    handleError(error)
  }

  return data
}