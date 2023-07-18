'use server'

import { Database, Json } from '@/types_db';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies })
);

export async function getSession() {
  const supabase = createServerSupabaseClient();
  try {
    const {
      data: { session }
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getUserDetails() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: userDetails } = await supabase
      .from('users')
      .select('*')
      .single();
    return userDetails;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getSubscription() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single()
      .throwOnError();
    return subscription;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getSubscriptionAll() {
  const supabase = createServerSupabaseClient();
  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      // .single()
      .throwOnError();
    return subscription;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const getActiveProductsWithPrices = async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { foreignTable: 'prices' });

  if (error) {
    console.log(error.message);
  }
  return data ?? [];
};

/**bots per user */
export const getUserBots = async (userId: string) => {
  const supabase = createServerSupabaseClient();
  try{
    const { data: userBots } = await supabase
    .from("bots")
    .select("id, name, uuid, char_count")
    .eq("user_id", userId)
    .throwOnError()
    console.log("=--=",userId);
    return userBots;
  } catch(error) {
    console.error('Error:', error);
    return null;
  }
}

/**bot with documents */
export const getBotDocuments = async (botId: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try{
    const { data: botDocuments } = await supabase
    .from("documents_main")
    .select("*")
    .eq("bot_id", botId)
    .throwOnError();

    response.data = botDocuments;
  } catch(error) {
    console.error('Error:', error);
    response.success = false; response.msg = error
  }
  return response;
}

/**conversation per user */
export const getUserConversations = async (userId: string) => {
  const supabase = createServerSupabaseClient();
  try{
    const { data: userConversations } = await supabase
    .from("conversations")
    .select("*")
    .eq("user_id", userId)
    .throwOnError();

    return userConversations;
  } catch(error) {
    console.error('Error:', error);
    return null;
  }
}

/**conversation per bot */
export const getBotConversations = async (botId: string) => {
  const supabase = createServerSupabaseClient();
  try{
    const { data: botConversations } = await supabase
    .from("conversations").select("*").eq("bot_id", botId).throwOnError();

    return botConversations;
  } catch(error) {
    console.error('Error:', error);
    return null;
  }
}

/**leads per user */
export const getUserLeads = async (userId: string) => {
  const supabase = createServerSupabaseClient();
  try{
    const { data: userLeads } = await supabase
    .from("leads")
    .select("*")
    .eq("user_id", userId)
    .throwOnError();

    return userLeads;
  } catch(error) {
    console.error('Error:', error);
    return null;
  }
}

/**leads per bot */
export const getBotLeads = async (botId: string) => {
  const supabase = createServerSupabaseClient();
  try{
    const { data: botLeads } = await supabase
    .from("leads").select("*").eq("bot_id", botId).throwOnError();

    return botLeads;
  } catch(error) {
    console.error('Error:', error);
    return null;
  }
}

/**Create bot */
export const createBot = async (botName: string, userId: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: res } = await supabase
    .from('bots')
    .insert({
      name: botName,
      user_id: userId
    }).select("*").throwOnError();

    response.data = res;
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}

/**Get bot config */
export const getBotConfig = async (botId: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: res } = await supabase
    .from('bots')
    .select("*").eq("id", botId)
    .throwOnError();

    response.data = res;
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}

/**Save bot config */
export const saveBotConfig = async (botId: string, config: any) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  console.log("-=-=-",config);
  try {
    const { data: res } = await supabase
    .from('bots')
    .update({
      name: config.name,
      default_questions: config.questions,
      initial_msgs: config.initialmsg,
      bg_color: config.bgcolor,
      text_color: config.textcolor,
      visibility: config.visibility,
      allowed_domains: config.domains
    }).eq("id", botId)
    .throwOnError();

    response.data = res;
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}

/**update bot char_count */
export const saveBotCharcount = async (botId: string, charcount: number) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: res } = await supabase
    .from('bots')
    .update({
      "char_count": charcount
    }).eq("id", botId)
    .throwOnError();

    response.data = res;
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}

/**save main documents */
export const saveMainDocument = async (name: string, userid: string, botid: number, charcount: number, dataq: Json = {}) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: res } = await supabase
    .from('documents_main')
    .insert({name: name, user_id: userid, bot_id: botid, char_count: charcount, data: dataq})
    .select("*").throwOnError();

    response.data = res;
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}

/**save embeddings */
export const saveEmbeddings = async (content: string, metadata: any, embedding: any, userid: string, botid: number, docid: number) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: res } = await supabase
    .from('documents_ve')
    .insert({content: content, metadata: metadata, embedding: embedding, user_id: userid, bot_id: botid, parent_document: docid})
    .select("*").throwOnError();

    response.data = res;
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}

/**delete main document and related embeddings */
export const deleteMainDocAndEmbeddings = async (docid: number, charcount: number, botid: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: resve } = await supabase
    .from('documents_ve')
    .delete().eq("parent_document", docid).throwOnError();

    const { data: resmd } = await supabase
    .from('documents_main')
    .delete().eq("id", docid).throwOnError();

    saveBotCharcount(botid, charcount);

    response.data = resmd;
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}

/**get lead with conversation */
export const getLeadWithConversation = async (leadid: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: res } = await supabase
    .from('leads')
    .select("*, conversations(id, chat_data)").eq("id", leadid).throwOnError();

    response.data = res;
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}

/**get bot with leads */
export const getBotWithLeads = async (botid: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: res } = await supabase
    .from('bots')
    .select("*, leads(id, first_name, last_name, email)").eq("id", botid).throwOnError();

    response.data = res;
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}