export type StrapiUser = Record<string, any>

export interface StrapiRegistrationResult {
  user: StrapiUser
  jwt: string
}

export interface StrapiRegistrationData {
  username: string | null
  email: string | null
  password: string | null
}

export interface StrapiLoginResult {
  user: StrapiUser
  jwt: string
}

export interface StrapiLoginData {
  identifier: string | null
  password: string | null
}

