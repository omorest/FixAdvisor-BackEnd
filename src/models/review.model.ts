export interface Review {
  id: string
  responseProvider?: string
  opinion: string
  providerName?: string
  clientName: string
  rate: number
  date: string
}

export interface ReviewsService {
  serviceId: string
  reviews: Review[]
  rate: number
  totalReviews: number
  starsRating: [number, number, number, number, number]
}
