export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      artist: {
        Row: {
          created_dt: string | null
          description: string | null
          edit_dt: string | null
          eng_name: string | null
          flag: string | null
          id: string
          name: string
        }
        Insert: {
          created_dt?: string | null
          description?: string | null
          edit_dt?: string | null
          eng_name?: string | null
          flag?: string | null
          id: string
          name: string
        }
        Update: {
          created_dt?: string | null
          description?: string | null
          edit_dt?: string | null
          eng_name?: string | null
          flag?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      channel: {
        Row: {
          created_dt: string
          description: string | null
          edit_dt: string | null
          email: string | null
          flag: string | null
          id: string
          join_date: string | null
          name: string | null
        }
        Insert: {
          created_dt?: string
          description?: string | null
          edit_dt?: string | null
          email?: string | null
          flag?: string | null
          id: string
          join_date?: string | null
          name?: string | null
        }
        Update: {
          created_dt?: string
          description?: string | null
          edit_dt?: string | null
          email?: string | null
          flag?: string | null
          id?: string
          join_date?: string | null
          name?: string | null
        }
        Relationships: []
      }
      profile_link: {
        Row: {
          artist_id: string | null
          link: string
          name: string
        }
        Insert: {
          artist_id?: string | null
          link: string
          name: string
        }
        Update: {
          artist_id?: string | null
          link?: string
          name?: string
        }
        Relationships: []
      }
      song: {
        Row: {
          artist: string | null
          channel_id: string | null
          created_time: string
          description: string | null
          edit_time: string | null
          language: string | null
          lyrics_all: string | null
          lyrics_part: string | null
          song_id: string
          title: string | null
        }
        Insert: {
          artist?: string | null
          channel_id?: string | null
          created_time?: string
          description?: string | null
          edit_time?: string | null
          language?: string | null
          lyrics_all?: string | null
          lyrics_part?: string | null
          song_id: string
          title?: string | null
        }
        Update: {
          artist?: string | null
          channel_id?: string | null
          created_time?: string
          description?: string | null
          edit_time?: string | null
          language?: string | null
          lyrics_all?: string | null
          lyrics_part?: string | null
          song_id?: string
          title?: string | null
        }
        Relationships: []
      }
      video: {
        Row: {
          artist: string
          channel: string | null
          created_dt: string
          description: string | null
          edit_dt: string | null
          flag: string | null
          link: string
          original_artist_id: string | null
          song_id: string | null
          title: string
        }
        Insert: {
          artist: string
          channel?: string | null
          created_dt?: string
          description?: string | null
          edit_dt?: string | null
          flag?: string | null
          link: string
          original_artist_id?: string | null
          song_id?: string | null
          title: string
        }
        Update: {
          artist?: string
          channel?: string | null
          created_dt?: string
          description?: string | null
          edit_dt?: string | null
          flag?: string | null
          link?: string
          original_artist_id?: string | null
          song_id?: string | null
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
