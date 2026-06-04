import { type Data, type Requirements } from './interfaces/metadata'

/**
 * Human readable labels for every metadata field. Used to build validation
 * messages that match the labels shown in the forms.
 */
export const FIELD_LABELS: Record<keyof Data, string> = {
  title: 'Title',
  description: 'Description',
  ogTitle: 'OG Title',
  ogDescription: 'OG Description',
  ogImage: 'OG Image',
  twitterTitle: 'Twitter Title',
  twitterDescription: 'Twitter Description',
  twitterImage: 'Twitter Image',
  twitterSite: 'Twitter Site',
  twitterCreator: 'Twitter Creator',
  twitterCard: 'Twitter Card',
}

export type ValidationErrors = Partial<Record<keyof Data, string>>

const isEmpty = (value: unknown): boolean =>
  value === null || value === undefined || value === ''

/**
 * Validates the metadata against the configured requirements and returns a map
 * of field name to error message. An empty object means the content is valid.
 */
export const validate = (
  data: Data,
  requirements?: Requirements,
): ValidationErrors => {
  const errors: ValidationErrors = {}

  if (!requirements) {
    return errors
  }

  for (const key of Object.keys(requirements)) {
    // Only validate fields we actually know about.
    if (!(key in FIELD_LABELS)) {
      continue
    }

    const field = key as keyof Data
    const requirement = requirements[field]
    const value = data[field]
    const label = FIELD_LABELS[field]

    if (requirement?.required && isEmpty(value)) {
      errors[field] = `${label} is required.`
      continue
    }

    if (
      requirement?.maxLength &&
      typeof value === 'string' &&
      value.length > requirement.maxLength
    ) {
      errors[field] =
        `${label} must not exceed ${requirement.maxLength} characters.`
    }
  }

  return errors
}

/**
 * Combines the per-field errors into a single message for the editor. Returns
 * `undefined` when the content is valid.
 */
export const validationMessage = (
  errors: ValidationErrors,
): string | undefined => {
  const messages = Object.values(errors).filter(Boolean)

  return messages.length > 0 ? messages.join(' ') : undefined
}
