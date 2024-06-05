import { Asset } from '@storyblok/field-plugin'

export interface Data {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  ogImage: Asset | null
  twitterTitle: string
  twitterDescription: string
  twitterImage: Asset | null
  twitterSite: string | null
  twitterCreator: string | null
  twitterCard: string
}

export interface FieldRequirement {
  maxLength?: number
  required?: boolean
}

export interface Requirements {
  [key: string]: FieldRequirement
}

export interface Defaults {
  [key: string]: string|null|boolean|number
}
