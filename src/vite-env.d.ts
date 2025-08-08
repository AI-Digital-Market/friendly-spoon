/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare const GITHUB_RUNTIME_PERMANENT_NAME: string
declare const BASE_KV_SERVICE_URL: string

interface ImportMetaEnv {
  // IP Information Service
  readonly VITE_IPINFO_API_KEY: string
  
  // Authentication Service (Passage by 1Password)
  readonly VITE_PASSAGE_APP_ID: string
  
  // AI Services
  readonly VITE_OPENAI_API_KEY?: string
  readonly VITE_ANTHROPIC_API_KEY?: string
  readonly VITE_GOOGLE_AI_API_KEY?: string
  readonly VITE_HUGGINGFACE_API_KEY?: string
  readonly VITE_STABILITY_API_KEY?: string
  readonly VITE_ELEVENLABS_API_KEY?: string
  readonly VITE_REPLICATE_API_TOKEN?: string
  
  // External Services
  readonly VITE_GOOGLE_OAUTH_CLIENT_ID?: string
  readonly VITE_GITHUB_OAUTH_CLIENT_ID?: string
  readonly VITE_STRIPE_PUBLISHABLE_KEY?: string
  readonly VITE_TWILIO_ACCOUNT_SID?: string
  readonly VITE_TWILIO_AUTH_TOKEN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
