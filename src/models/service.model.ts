export type serviceTypes = 'Fontanería' | 'Carpintería' | 'Electricidad'

export interface Service {
  providerId: string
  id: string
  nameService: string
  description: string
  typeService: serviceTypes
  urlsImagesService?: string[]
  rateStars?: [number, number, number, number, number]
  rate?: number
  totalReviews?: number
}
