import { Asset } from '@storyblok/field-plugin'

export interface Metadata {
  title: string
  description: string
}

export interface OpenGraphMetadata extends Metadata {
  image: Asset | null
}

export interface TwitterMetadata extends Metadata {
  image: Asset | null
  site: string | null
  creator: string | null
  card: string
}

export interface Data {
  global: Metadata
  openGraph: OpenGraphMetadata
  twitter: TwitterMetadata
}

export interface FieldRequirement {
  maxLength?: number
  required?: boolean
}

export interface Requirements {
  [key: string]: {
    [key: string]: FieldRequirement
  }
}

export interface Defaults {
  [key: string]: {
    [key: string]: string|null|boolean|number
  }
}
