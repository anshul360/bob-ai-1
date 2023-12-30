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
      api_keys: {
        Row: {
          created_at: string
          id: number
          key: string | null
          name: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          key?: string | null
          name?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          key?: string | null
          name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_keys_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      bots: {
        Row: {
          activate_after: number | null
          allowed_domains: string | null
          base_prompt: string | null
          bg_color: string | null
          bubble_msg: string | null
          capture_leads: boolean | null
          char_count: number | null
          created_at: string | null
          default_questions: string | null
          description: string | null
          headline: string | null
          icon_pos: string | null
          icon_url: string | null
          id: number
          initial_msgs: string | null
          leads_config: Json | null
          name: string | null
          rate_message: string | null
          req_per_min: number | null
          support_message: string | null
          temperature: number | null
          text_color: string | null
          theme: string | null
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
          bubble_msg?: string | null
          capture_leads?: boolean | null
          char_count?: number | null
          created_at?: string | null
          default_questions?: string | null
          description?: string | null
          headline?: string | null
          icon_pos?: string | null
          icon_url?: string | null
          id?: number
          initial_msgs?: string | null
          leads_config?: Json | null
          name?: string | null
          rate_message?: string | null
          req_per_min?: number | null
          support_message?: string | null
          temperature?: number | null
          text_color?: string | null
          theme?: string | null
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
          bubble_msg?: string | null
          capture_leads?: boolean | null
          char_count?: number | null
          created_at?: string | null
          default_questions?: string | null
          description?: string | null
          headline?: string | null
          icon_pos?: string | null
          icon_url?: string | null
          id?: number
          initial_msgs?: string | null
          leads_config?: Json | null
          name?: string | null
          rate_message?: string | null
          req_per_min?: number | null
          support_message?: string | null
          temperature?: number | null
          text_color?: string | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string
          uuid?: string
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bots_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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
          geo: Json | null
          id: number
          updated_at: string | null
          user_id: string | null
          visitor_id: string | null
        }
        Insert: {
          bot_id?: number | null
          chat_data?: Json | null
          created_at?: string | null
          geo?: Json | null
          id?: number
          updated_at?: string | null
          user_id?: string | null
          visitor_id?: string | null
        }
        Update: {
          bot_id?: number | null
          chat_data?: Json | null
          created_at?: string | null
          geo?: Json | null
          id?: number
          updated_at?: string | null
          user_id?: string | null
          visitor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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
            isOneToOne: true
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
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_main_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_ve_parent_document_fkey"
            columns: ["parent_document"]
            isOneToOne: false
            referencedRelation: "documents_main"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_ve_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      form_field_submissions: {
        Row: {
          created_at: string
          field_id: string | null
          form_submission_id: number | null
          id: number
          value: string | null
        }
        Insert: {
          created_at?: string
          field_id?: string | null
          form_submission_id?: number | null
          id?: number
          value?: string | null
        }
        Update: {
          created_at?: string
          field_id?: string | null
          form_submission_id?: number | null
          id?: number
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_field_submissions_field_id_fkey"
            columns: ["field_id"]
            isOneToOne: false
            referencedRelation: "form_fields"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "form_field_submissions_form_submission_id_fkey"
            columns: ["form_submission_id"]
            isOneToOne: false
            referencedRelation: "form_submissions"
            referencedColumns: ["id"]
          }
        ]
      }
      form_fields: {
        Row: {
          created_at: string
          form_id: string | null
          id: string
          name: string | null
          options: string | null
          required: boolean | null
          system_generated: boolean | null
          type: Database["public"]["Enums"]["form_field_type"] | null
        }
        Insert: {
          created_at?: string
          form_id?: string | null
          id: string
          name?: string | null
          options?: string | null
          required?: boolean | null
          system_generated?: boolean | null
          type?: Database["public"]["Enums"]["form_field_type"] | null
        }
        Update: {
          created_at?: string
          form_id?: string | null
          id?: string
          name?: string | null
          options?: string | null
          required?: boolean | null
          system_generated?: boolean | null
          type?: Database["public"]["Enums"]["form_field_type"] | null
        }
        Relationships: [
          {
            foreignKeyName: "form_fields_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          }
        ]
      }
      form_submissions: {
        Row: {
          created_at: string
          form_id: string | null
          id: number
        }
        Insert: {
          created_at?: string
          form_id?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          form_id?: string | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "form_submissions_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "forms"
            referencedColumns: ["id"]
          }
        ]
      }
      forms: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string | null
          type: Database["public"]["Enums"]["form_type"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          type?: Database["public"]["Enums"]["form_type"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          type?: Database["public"]["Enums"]["form_type"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forms_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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
          name: string | null
          org: string | null
          phone: string | null
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
          name?: string | null
          org?: string | null
          phone?: string | null
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
          name?: string | null
          org?: string | null
          phone?: string | null
          score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_bot_id_fkey"
            columns: ["bot_id"]
            isOneToOne: false
            referencedRelation: "bots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      messages: {
        Row: {
          content: string | null
          conversation_id: number | null
          created_at: string
          id: number
          rating: Database["public"]["Enums"]["message_rating"] | null
          role: Database["public"]["Enums"]["message_role"] | null
          sources: Json[] | null
        }
        Insert: {
          content?: string | null
          conversation_id?: number | null
          created_at?: string
          id?: number
          rating?: Database["public"]["Enums"]["message_rating"] | null
          role?: Database["public"]["Enums"]["message_role"] | null
          sources?: Json[] | null
        }
        Update: {
          content?: string | null
          conversation_id?: number | null
          created_at?: string
          id?: number
          rating?: Database["public"]["Enums"]["message_rating"] | null
          role?: Database["public"]["Enums"]["message_role"] | null
          sources?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          }
        ]
      }
      one_times: {
        Row: {
          created_at: string
          id: string
          payment_intent: string | null
          price_id: string | null
          quantity: number | null
          session: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id: string
          payment_intent?: string | null
          price_id?: string | null
          quantity?: number | null
          session?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          payment_intent?: string | null
          price_id?: string | null
          quantity?: number | null
          session?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "one_times_price_id_fkey"
            columns: ["price_id"]
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "one_times_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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
          lookup_key: string | null
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
          lookup_key?: string | null
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
          lookup_key?: string | null
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
            isOneToOne: false
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
            isOneToOne: true
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
            isOneToOne: false
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          addon_chatbots: number | null
          addon_messages: number | null
          api_keys: Json | null
          avatar_url: string | null
          billing_address: Json | null
          chatbot_char_count: number | null
          consumed_leadsr: number | null
          consumed_messages: number | null
          email: string | null
          full_name: string | null
          id: string
          payment_method: Json | null
          sub_active: boolean | null
          sub_chatbots: number | null
          sub_messages: number | null
          white_labeled: boolean | null
        }
        Insert: {
          addon_chatbots?: number | null
          addon_messages?: number | null
          api_keys?: Json | null
          avatar_url?: string | null
          billing_address?: Json | null
          chatbot_char_count?: number | null
          consumed_leadsr?: number | null
          consumed_messages?: number | null
          email?: string | null
          full_name?: string | null
          id: string
          payment_method?: Json | null
          sub_active?: boolean | null
          sub_chatbots?: number | null
          sub_messages?: number | null
          white_labeled?: boolean | null
        }
        Update: {
          addon_chatbots?: number | null
          addon_messages?: number | null
          api_keys?: Json | null
          avatar_url?: string | null
          billing_address?: Json | null
          chatbot_char_count?: number | null
          consumed_leadsr?: number | null
          consumed_messages?: number | null
          email?: string | null
          full_name?: string | null
          id?: string
          payment_method?: Json | null
          sub_active?: boolean | null
          sub_chatbots?: number | null
          sub_messages?: number | null
          white_labeled?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      webhook_events: {
        Row: {
          created_at: string
          data: Json | null
          id: number
          status: Database["public"]["Enums"]["event_status"] | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: number
          status?: Database["public"]["Enums"]["event_status"] | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: number
          status?: Database["public"]["Enums"]["event_status"] | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "webhook_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      webhooks: {
        Row: {
          created_at: string
          event_types: Json | null
          id: number
          url: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_types?: Json | null
          id?: number
          url?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_types?: Json | null
          id?: number
          url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "webhooks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
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
      event_status: "pending" | "complete" | "failed"
      form_field_type:
        | "text"
        | "email"
        | "phone"
        | "textarea"
        | "checkbox"
        | "select"
        | "mselect"
      form_type: "lead" | "ticket"
      message_rating: "good" | "bad"
      message_role: "user" | "assistant"
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
