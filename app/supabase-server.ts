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
      // .single()
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
export const getBotDocuments = async (botId: string, userId: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try{
    const { data: botDocuments } = await supabase
    .from("documents_main")
    .select("*")
    .eq("bot_id", botId).eq("user_id", userId)
    .throwOnError();

    response.data = botDocuments;
  } catch(error) {
    console.error('Error:', error);
    response.success = false; response.msg = error
  }
  return response;
}

/**conversation per user */
export const getUserConversations = async (visitorId: string, botId: string) => {
  const supabase = createServerSupabaseClient();
  try{
    const { data: userConversations } = await supabase
    .from("conversations")
    .select("*")
    .eq("visitor_id", visitorId).eq("bot_id", botId).order("created_at", {ascending: false}).limit(1)
    .throwOnError();

    return userConversations;
  } catch(error) {
    console.error('Error:', error);
    return null;
  }
}

/**conversation per bot */
export const getBotConversations = async (botId: string, userid: string) => {
  const supabase = createServerSupabaseClient();
  try{
    const { data: botConversations } = await supabase
    .from("conversations")
    .select("*, bots(id, name)")
    .eq("bot_id", botId).eq("user_id", userid)
    .order("updated_at", {ascending: false}).limit(1000)
    .throwOnError();

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
    .select("*, conversations(id, geo)")
    .eq("user_id", userId).order("created_at", {ascending: false}).limit(1000)
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
    .from("leads").select("*, conversations(id, geo)")
    .eq("bot_id", botId).order("created_at", {ascending: false}).limit(1000)
    .throwOnError();

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
export const getBotConfig = async (botId: string, userid: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: res } = await supabase
    .from('bots')
    .select("*").eq("id", botId).eq("user_id", userid)
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
    // const {data: resico, error: eico } = await supabase
    // .storage.from("Agent Icons")
    // .upload(config.uuid, config.bicon, {upsert: true});
    // if(eico) throw eico;

    // const {data: resicop } = await supabase.storage.from('Agent Icons').getPublicUrl(config.uuid, {
    //   transform: {
    //     width: 100,
    //     height: 100,
    //     resize: 'fill'
    //   },
    // })

    const { data: res } = await supabase
    .from('bots')
    .update({
      name: config.name,
      default_questions: config.questions,
      initial_msgs: config.initialmsg,
      bg_color: config.bgcolor,
      text_color: config.textcolor,
      visibility: config.visibility,
      allowed_domains: config.domains,
      theme: config.theme,
      // icon_url: resicop.publicUrl,
      icon_pos: config.bpos,
      bubble_msg: config.bbmsg
    }).eq("id", botId)
    .throwOnError();

    response.data = res;
  } catch(error) {
    console.log(error);
    response.success = false; response.msg = error
  }
  return response;
}

/**Save bot base config */
export const saveBotBaseConfig = async (botId: string, config: any) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  // console.log("-=-=-",config);
  try {
    const { data: res } = await supabase
    .from('bots')
    .update({
      base_prompt: config.basep,
      temperature: config.temp,
      support_message: config.supportmsg,
      req_per_min: config.reqpm,
      leads_config: config.leadsconfig,
      visibility: config.visibility
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

    const { data: resmdc } = await supabase
    .from('documents_main')
    .select("char_count").eq("bot_id", botid).throwOnError();

    charcount=0;
    resmdc?.map((mdc) => charcount += mdc.char_count?mdc.char_count:0);

    saveBotCharcount(botid, charcount);

    response.data = resmd;
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}

/**delete main document and related embeddings */
export const deleteEQAMainDocAndEmbeddings = async (botid: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: resmdg } = await supabase
    .from('documents_main')
    .select("id")
    .eq("name", "Q & A").eq("bot_id", botid).throwOnError();
    if(resmdg && resmdg.length > 0) {
      const { data: resve } = await supabase
      .from('documents_ve')
      .delete().eq("parent_document", resmdg[0].id).throwOnError();

      const { data: resmd } = await supabase
      .from('documents_main')
      .delete().eq("id",  resmdg[0].id).throwOnError();

      const { data: resmdc } = await supabase
      .from('documents_main')
      .select("char_count").eq("bot_id", botid).throwOnError();

      let charcount=0;
      resmdc?.map((mdc) => charcount += mdc.char_count?mdc.char_count:0);

      saveBotCharcount(botid, charcount);
      response.data = resmd;
    }
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}

/**get lead with conversation */
export const getLeadWithConversation = async (leadid: string, userid: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: res } = await supabase
    .from('leads')
    .select("*, conversations(id, chat_data, geo)")
    .eq("id", leadid).eq("user_id", userid).throwOnError();

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

/**save conversation */
export const saveUserConversation = async (chatinst: any) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    console.log("--from store geo server--", chatinst.geo);
    if(chatinst.id){
      // const uuidcookie = cookies().get("visuuid");
      // console.log("-=-cook-=-",cookies().getAll());
      // console.log("-=-uuidc-=-", uuidcookie);
      // console.log("-=-=-",chatinst.id);
      const { data: res } = await supabase
      .from('conversations')
      .update({chat_data: chatinst.chat_data, geo: chatinst.geo})
      .match({ id: chatinst.id })
      .select("*")
      .throwOnError()

      response.data = res;
    } else {
      const { data: res } = await supabase
      .from('conversations')
      .insert({chat_data: chatinst.chat_data, visitor_id: chatinst.visitor_id, bot_id: chatinst.bot_id, geo: chatinst.geo})
      .select("*")
      .throwOnError()
      
      // console.log("-=-vidi-=-",res![0].visitor_id);

      // cookies().set({
      //   name: "visuuid", value: res![0].visitor_id!, 
      //   expires: new Date().getTime() + 6.307e+10, //expires 2years from now
      //   domain: "localhost", path: "/"
      // });
      response.data = res;
    }
    
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}

/**conversation per user */
export const getUserConversationsCookie = async (botId: string, visuid: string) => {
  const supabase = createServerSupabaseClient();
  try{
    // const uuidcookie = cookies().get("visuuid");
    // console.log("-=-cook-=-",cookies().getAll());
    // console.log("-=-uuidc-=-", uuidcookie);
    const { data: userConversations } = await supabase
    .from("conversations")
    .select("*")
    .eq("visitor_id", visuid).eq("bot_id", botId).order("created_at", {ascending: false}).limit(1)
    .throwOnError();

    return userConversations;
  } catch(error) {
    console.error('Error:', error);
    return null;
  }
}

/**Get bot config */
export const getBotConfigUuid = async (uuid: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: res } = await supabase
    .from('bots')
    .select("*").eq("uuid", uuid)
    .throwOnError();
    console.log(res);
    response.data = res;
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}

/**get message, keads count */
export const getMsgLeadsFromUser = async (userid: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: res } = await supabase
    .from('users')
    .select("*").eq("id", userid)
    .throwOnError();
    console.log(res);
    response.data = res;
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}

/**get api keys from user */
export const getApikeysFromUser = async (userid: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: res } = await supabase
    .from('users')
    .select("id, api_keys").eq("id", userid)
    .throwOnError();
    console.log(res);
    response.data = res;
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}

/**save api key to user */
export const saveApikeyToUser = async (userid: string, apikeys: any) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: res } = await supabase
    .from('users')
    .update({api_keys: apikeys}).eq("id", userid)
    .throwOnError();
    console.log(res);
    response.data = res;
  } catch(error) {
    console.log(error);
    response.success = false; response.msg = error
  }
  return response;
}

/**conversations per user */
export const getUserConversationsN = async (userid: string, botids: string[] = []) => {
  const supabase = createServerSupabaseClient();
  try{
    let botidst: any = [...botids];

    if(botids.length == 0) {
      const { data: userBots } = await supabase
      .from("bots")
      .select("id").eq("user_id", userid).throwOnError();

      userBots?.map((bot) => botidst.push(bot.id));
    }

    const { data: userConversations } = await supabase
    .from("conversations")
    .select("*, bots(id, name)").in("bot_id", botidst)
    .order("updated_at", {ascending: false}).limit(1000)
    .throwOnError();

    return userConversations;
  } catch(error) {
    console.error('Error:', error);
    return null;
  }
}


/**conversation per user */
export const getUserConversation = async (convid: string, userid: string) => {
  const supabase = createServerSupabaseClient();
  try{
    const { data: userConversations } = await supabase
    .from("conversations")
    .select("*, bots(id,name)").eq("id", convid).eq("user_id", userid)
    .order("updated_at", {ascending: false}).limit(1000)
    .throwOnError();

    return userConversations;
  } catch(error) {
    console.error('Error:', error);
    return null;
  }
}

/**filter conversations */
export const filterConversations = async (fromd: string, tod: string, userid: string, botids: string[] = []) => {
  const supabase = createServerSupabaseClient();
  try{
    const { data: userConversations } = await supabase
    .from("conversations")
    .select("*, bots(id,name)").gte("updated_at", fromd).lte("updated_at", tod).eq("user_id", userid).in("bot_id", botids)
    .order("updated_at", {ascending: false}).limit(1000)
    .throwOnError();

    return userConversations;
  } catch(error) {
    console.error('Error:', error);
    return null;
  }
}

/**get user qa */
export const getQAdoc = async (botid: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: res } = await supabase
    .from('documents_main')
    .select("id, data, char_count").eq("bot_id", botid).eq("name", "Q & A")
    .throwOnError();
    console.log(res);
    response.data = res;
  } catch(error) {
    console.log(error);
    response.success = false; response.msg = error
  }
  return response;
}

/**update main document */
export const updateMainDocument = async (docid: string, charcount: number, content: any) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    console.log(docid, charcount);
    const { data: res } = await supabase
    .from('documents_main')
    .update({"data": content, "char_count": charcount}).eq("id", docid)
    .select().throwOnError();
    // console.log(res);
    response.data = res;
  } catch(error) {
    console.log(error);
    response.success = false; response.msg = error
  }
  return response;
}

/**Get bot config for js */
export const getBotConfigJS = async (botId: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: res } = await supabase
    .from('bots')
    .select("*").eq("uuid", botId)
    .throwOnError();

    response.data = res;
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}

/**filter leads export */
export const filterLeadsExport = async (fromd: string, tod: string, userid: string) => {
  const supabase = createServerSupabaseClient();
  try{
    const { data: userLeads } = await supabase
    .from("leads")
    .select("*, conversations(chat_data, geo), bots(name)").gte("created_at", fromd).lte("created_at", tod).eq("user_id", userid)
    .order("created_at", {ascending: false}).limit(1000)
    .throwOnError();

    return userLeads;
  } catch(error) {
    console.error('Error:', error);
    return null;
  }
}

/**delete conversation */
export const deleteConversation = async (id: string, userid: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try{
    const { data: userConvo } = await supabase
    .from("conversations")
    .delete().eq("user_id", userid).eq("id", id)
    .throwOnError();
  } catch(error) {
    console.error('Error:', error);
    response.success = false; response.msg = error;
  }
  return response;
}

/**delete lead */
export const deleteLead = async (id: string, userid: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try{
    const { data: userLead } = await supabase
    .from("leads")
    .delete().eq("user_id", userid).eq("id", id)
    .throwOnError();
  } catch(error) {
    console.error('Error:', error);
    response.success = false; response.msg = error;
  }
  return response;
}

/**Get user config */
export const getUserLimits = async (userid: string) => {
  const supabase = createServerSupabaseClient();
  const response: any = {success: true};
  try {
    const { data: res, count } = await supabase
    .from('bots')
    .select("id, users(*)", { count: 'exact' }).eq("user_id", userid)
    .throwOnError();

    response.data = res;
    response.count = count;
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}
