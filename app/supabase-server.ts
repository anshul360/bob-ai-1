'use server'

import { Database } from '@/types_db';
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
    .select("id, name, uuid")
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
  try{
    const { data: botDocuments } = await supabase
    .from("docments_main")
    .select("*")
    .eq("bot_id", botId)
    .throwOnError();

    return botDocuments;
  } catch(error) {
    console.error('Error:', error);
    return null;
  }
}

/**conversation per user */
export const getUserConversations = async (userId: string) => {
  const supabase = createServerSupabaseClient();
  try{
    const { data: userConversations } = await supabase
    .from("conversation")
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
    .from("conversation").select("*").eq("bot_id", botId).throwOnError();

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
