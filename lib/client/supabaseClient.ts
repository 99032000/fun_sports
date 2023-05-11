import { createClient } from '@supabase/supabase-js';
import { createRouteHandlerSupabaseClient, createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
// import { headers, cookies } from 'next/headers'
import { Database } from "../../lib/database.types";
export const supabaseClient = createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
// export const supabaseRouteClient = createRouteHandlerSupabaseClient({
//   headers,
//   cookies,
// })
// export const supabaseServerComponentClient = createServerComponentSupabaseClient({
//   headers,
//   cookies,
// });