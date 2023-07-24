export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      bots: {
        Row: {
          activate_after: number | null
          allowed_domains: string | null
          base_prompt: string | null
          bg_color: string | null
          capture_leads: boolean | null
          char_count: number | null
          created_at: string | null
          default_questions: string | null
          icon_url: string | null
          id: number
          initial_msgs: string | null
          name: string | null
          support_message: string | null
          temperature: number | null
          text_color: string | null
          updated_at: string | null
          user_id: string
          uuid: string
          visibility: string | null
        }
        Insert: {
          activate_after?: number | null
          allowed_domains?: string | null
          base_prompt?: string | null
          bg_color?: string | null
          capture_leads?: boolean | null
          char_count?: number | null
          created_at?: string | null
          default_questions?: string | null
          icon_url?: string | null
          id?: number
          initial_msgs?: string | null
          name?: string | null
          support_message?: string | null
          temperature?: number | null
          text_color?: string | null
          updated_at?: string | null
          user_id: string
          uuid?: string
          visibility?: string | null
        }
        Update: {
          activate_after?: number | null
          allowed_domains?: string | null
          base_prompt?: string | null
          bg_color?: string | null
          capture_leads?: boolean | null
          char_count?: number | null
          created_at?: string | null
          default_questions?: string | null
          icon_url?: string | null
          id?: number
          initial_msgs?: string | null
          name?: string | null
          support_message?: string | null
          temperature?: number | null
          text_color?: string | null
          updated_at?: string | null
          user_id?: string
          uuid?: string
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bots_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      conversations: {
        Row: {
          bot_id: number | null
          chat_data: Json | null
          created_at: string | null
          id: number
          updated_at: string | null
          user_id: string | null
          visitor_id: string | null
        }
        Insert: {
          bot_id?: number | null
          chat_data?: Json | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
          user_id?: string | null
          visitor_id?: string | null
        }
        Update: {
          bot_id?: number | null
          chat_data?: Json | null
          created_at?: string | null
          id?: number
          updated_at?: string | null
          user_id?: string | null
          visitor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_bot_id_fkey"
            columns: ["bot_id"]
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      documents_main: {
        Row: {
          bot_id: number | null
          char_count: number | null
          created_at: string | null
          data: Json | null
          id: number
          name: string | null
          user_id: string | null
        }
        Insert: {
          bot_id?: number | null
          char_count?: number | null
          created_at?: string | null
          data?: Json | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Update: {
          bot_id?: number | null
          char_count?: number | null
          created_at?: string | null
          data?: Json | null
          id?: number
          name?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_main_bot_id_fkey"
            columns: ["bot_id"]
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_main_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      documents_ve: {
        Row: {
          bot_id: number | null
          content: string | null
          embedding: string | null
          id: number
          metadata: Json | null
          parent_document: number | null
          user_id: string | null
        }
        Insert: {
          bot_id?: number | null
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
          parent_document?: number | null
          user_id?: string | null
        }
        Update: {
          bot_id?: number | null
          content?: string | null
          embedding?: string | null
          id?: number
          metadata?: Json | null
          parent_document?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_ve_bot_id_fkey"
            columns: ["bot_id"]
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_ve_parent_document_fkey"
            columns: ["parent_document"]
            referencedRelation: "documents_main"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_ve_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      leads: {
        Row: {
          bot_id: number | null
          conversation_id: number | null
          created_at: string | null
          email: string | null
          first_name: string | null
          id: number
          interests: string | null
          last_name: string | null
          org: string | null
          score: number | null
          user_id: string | null
        }
        Insert: {
          bot_id?: number | null
          conversation_id?: number | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          interests?: string | null
          last_name?: string | null
          org?: string | null
          score?: number | null
          user_id?: string | null
        }
        Update: {
          bot_id?: number | null
          conversation_id?: number | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          id?: number
          interests?: string | null
          last_name?: string | null
          org?: string | null
          score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_bot_id_fkey"
            columns: ["bot_id"]
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_conversation_id_fkey"
            columns: ["conversation_id"]
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: number
          updated_at: string | null
          user_id: string
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: number
          updated_at?: string | null
          user_id: string
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: number
          updated_at?: string | null
          user_id?: string
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          consumed_leadsr: number | null
          consumed_messages: number | null
          full_name: string | null
          id: string
          payment_method: Json | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          consumed_leadsr?: number | null
          consumed_messages?: number | null
          full_name?: string | null
          id: string
          payment_method?: Json | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          consumed_leadsr?: number | null
          consumed_messages?: number | null
          full_name?: string | null
          id?: string
          payment_method?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      match_documents: {
        Args: {
          query_embedding: string
          botid: number
          match_count?: number
        }
        Returns: {
          id: number
          content: string
          metadata: Json
          similarity: number
        }[]
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
