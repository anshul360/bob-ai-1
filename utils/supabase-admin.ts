'use server'

import { toDateTime } from './helpers';
import { stripe } from './stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import type { Database } from 'types_db';

type Product = Database['public']['Tables']['products']['Row'];
type Price = Database['public']['Tables']['prices']['Row'];

// Note: supabaseAdmin uses the SERVICE_ROLE_KEY which you must only use in a secure server-side context
// as it has admin privileges and overwrites RLS policies!
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const upsertProductRecord = async (product: Stripe.Product) => {
  const productData: Product = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? null,
    image: product.images?.[0] ?? null,
    metadata: product.metadata
  };

  const { error } = await supabaseAdmin.from('products').upsert([productData]);
  if (error) throw error;
  console.log(`Product inserted/updated: ${product.id}`);
};

const upsertPriceRecord = async (price: Stripe.Price) => {
  const priceData: Price = {
    id: price.id,
    product_id: typeof price.product === 'string' ? price.product : '',
    active: price.active,
    currency: price.currency,
    description: price.nickname ?? null,
    type: price.type,
    unit_amount: price.unit_amount ?? null,
    interval: price.recurring?.interval ?? null,
    interval_count: price.recurring?.interval_count ?? null,
    trial_period_days: price.recurring?.trial_period_days ?? null,
    metadata: price.metadata
  };

  const { error } = await supabaseAdmin.from('prices').upsert([priceData]);
  if (error) throw error;
  console.log(`Price inserted/updated: ${price.id}`);
};

const createOrRetrieveCustomer = async ({
  email,
  uuid
}: {
  email: string;
  uuid: string;
}) => {
  const { data, error } = await supabaseAdmin
    .from('customers')
    .select('stripe_customer_id')
    .eq('id', uuid)
    .single();
  if (error || !data?.stripe_customer_id) {
    // No customer record found, let's create one.
    const customerData: { metadata: { supabaseUUID: string }; email?: string } =
      {
        metadata: {
          supabaseUUID: uuid
        }
      };
    if (email) customerData.email = email;
    const customer = await stripe.customers.create(customerData);
    // Now insert the customer ID into our Supabase mapping table.
    const { error: supabaseError } = await supabaseAdmin
      .from('customers')
      .insert([{ id: uuid, stripe_customer_id: customer.id }]);
    if (supabaseError) throw supabaseError;
    console.log(`New customer created and inserted for ${uuid}.`);
    return customer.id;
  }
  return data.stripe_customer_id;
};

/**
 * Copies the billing details from the payment method to the customer object.
 */
const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod
) => {
  //Todo: check this assertion
  const customer = payment_method.customer as string;
  const { name, phone, address } = payment_method.billing_details;
  if (!name || !address) return; //|| !phone
  //@ts-ignore
  await stripe.customers.update(customer, { name, phone, address });
  const { error } = await supabaseAdmin
    .from('users')
    .upsert({
      billing_address: { ...address },
      payment_method: { ...payment_method[payment_method.type] },
      full_name: name,
      id: uuid
    })
    //.eq('id', uuid);
  if (error) throw error;
};

const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {
  // Get customer's UUID from mapping table.
  const { data: customerData, error: noCustomerError } = await supabaseAdmin
    .from('customers')
    .select('id')
    .eq('stripe_customer_id', customerId)
    .single();
  if (noCustomerError) throw noCustomerError;

  const { id: uuid } = customerData!;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method']
  });
  // Upsert the latest status of the subscription object.
  const subscriptionData: Database['public']['Tables']['subscriptions']['Insert'] =
    {
      id: subscription.id,
      user_id: uuid,
      metadata: subscription.metadata,
      status: subscription.status,
      price_id: subscription.items.data[0].price.id,
      //TODO check quantity on subscription
      // @ts-ignore
      quantity: subscription.quantity,
      cancel_at_period_end: subscription.cancel_at_period_end,
      cancel_at: subscription.cancel_at
        ? toDateTime(subscription.cancel_at).toISOString()
        : null,
      canceled_at: subscription.canceled_at
        ? toDateTime(subscription.canceled_at).toISOString()
        : null,
      current_period_start: toDateTime(
        subscription.current_period_start
      ).toISOString(),
      current_period_end: toDateTime(
        subscription.current_period_end
      ).toISOString(),
      created: toDateTime(subscription.created).toISOString(),
      ended_at: subscription.ended_at
        ? toDateTime(subscription.ended_at).toISOString()
        : null,
      trial_start: subscription.trial_start
        ? toDateTime(subscription.trial_start).toISOString()
        : null,
      trial_end: subscription.trial_end
        ? toDateTime(subscription.trial_end).toISOString()
        : null
    };

  const { error } = await supabaseAdmin
    .from('subscriptions')
    .upsert([subscriptionData]);
  if (error) throw error;
  console.log(
    `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
  );
  console.log(`**craeteAction=${createAction}**uuid=${uuid}**defaultpaymentmethod=`);
  console.log(subscription.default_payment_method);
  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method && uuid)
    //@ts-ignore
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod
    );
};

const getUserIdFromBot = async (botid: string) => {
  const res: any = {success: true}
  try {
  const { data: botdata } = await supabaseAdmin
    .from('bots')
    .select('user_id')
    .eq('id', botid)
    .throwOnError();

    res.data = botdata![0].user_id;
  } catch(ex) {
    console.log(ex);
    res.success = false;
    res.message = ex;
  }
  return res;
}

const getMsgCFromUser = async (userid: string) => {
  const res: any = {success: true}
  try {
  const { data: userdata } = await supabaseAdmin
    .from('users')
    .select('consumed_messages')
    .eq('id', userid)
    .throwOnError();

    res.data = userdata;
  } catch(ex) {
    console.log(ex);
    res.success = false;
    res.message = ex;
  }
  return res;
}

const saveMsgCToUser = async (userid: string, msgcount: number) => {
  const res: any = {success: true}
  try {
  const { data: userdata } = await supabaseAdmin
    .from('users')
    .update({ 
      'consumed_messages':msgcount
    })
    .eq('id', userid)
    .throwOnError();

    res.data = userdata;
  } catch(ex) {
    console.log(ex);
    res.success = false;
    res.message = ex;
  }
  return res;
}

export const saveUserConversation = async (chatinst: any) => {
  const response: any = {success: true};
  try {
    console.log("--from store geo server--", chatinst.geo);
    if(chatinst.id){

      const { data: res } = await supabaseAdmin
      .from('conversations')
      .update({chat_data: chatinst.chat_data, geo: chatinst.geo})
      .match({ id: chatinst.id })
      .select("*")
      .throwOnError()

      response.data = res;
    } else {
      const { data: res } = await supabaseAdmin
      .from('conversations')
      .insert({chat_data: chatinst.chat_data, visitor_id: chatinst.visitor_id, bot_id: chatinst.bot_id, geo: chatinst.geo})
      .select("*")
      .throwOnError();

      response.data = res;
    }
    
  } catch(error) {
    response.success = false; response.msg = error
  }
  return response;
}

/**save lead */
const saveLeadInfo = async (lead: any, conid: number, botid: number) => {
  const response: any = {success: true};
  try {
    const { data: res } = await supabaseAdmin
    .from('leads')
    .insert({
      name: lead.name, org: lead.org, 
      email: lead.email, phone: lead.phone,
      bot_id: botid, conversation_id: conid
    })
    .throwOnError();
    console.log(res);
    response.data = res;
  } catch(error) {
    console.log(error);
    response.success = false; response.msg = error
  }
  return response;
}

export {
  upsertProductRecord,
  upsertPriceRecord,
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange,
  getUserIdFromBot,
  getMsgCFromUser,
  saveMsgCToUser,
  saveLeadInfo
};
