'use server'
import { createServerSupabaseClient } from '@/app/utils/supabase/server';
import { Database} from '@/types_db'

export type ProfileLinkRow = Database["public"]["Tables"]["profile_link"]["Row"];
export type ProfileLinkRowInsert = Database["public"]["Tables"]["profile_link"]["Insert"];
export type ProfileLinkRowUpdate = Database["public"]["Tables"]["profile_link"]["Update"];

function handleError(error: any){
  console.error(error);
  throw new Error(error.message)
}

export async function getProfileLinks({
  searchInput = ''
}){
   const supabase = await createServerSupabaseClient()

   const {data , error} = await supabase.from('profile_link').select('*').like('artist_id', `%${searchInput}%`)

  if(error){
    handleError(error)
  }

  return data;
}

export async function getProfileLink(name : string){
  const supabase = await createServerSupabaseClient()

  const {data , error} = await supabase.from('profile_link').select('*').eq('name', name)

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

export async function createProfileLink(profile_link:ProfileLinkRowInsert) {
  const supabase = await createServerSupabaseClient()

  const {data, error} = await supabase.from('profile_link').insert({
    ...profile_link
  })

  if(error){
    handleError(error)
  }

  return data
}

export async function updateProfileLink(profile_link:ProfileLinkRowUpdate) {
  const supabase = await createServerSupabaseClient()

  const {data, error} = await supabase.from('profile_link').update({
    ...profile_link,
    edit_time : new Date().toISOString()
  }).eq('name', profile_link.name!)

  if(error){
    handleError(error)
  }

  return data
}

export async function deleteProfileLink(name : string) {
  const supabase = await createServerSupabaseClient()

  const {data, error} = await supabase.from('profile_link').delete().match({ name : name})

  if(error){
    handleError(error)
  }

  return data
}