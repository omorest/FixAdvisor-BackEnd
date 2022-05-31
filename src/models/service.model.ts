export type serviceTypes = 'Fontanería' | 'Carpintería' | 'Electricidad'

export interface Service {
  providerId: string
  id: string
  description: string
  typeService: serviceTypes
  urlsImagesService?: string[]
  rateStarts?: [number, number, number, number, number]
  rate?: number
  totalReviews?: number
}
