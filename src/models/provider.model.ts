export interface Provider {
  email: string
  name: string
  company: string
  location: string
  phoneNumber: number
  logoImage: string
  id: string
  favouriteServices?: string[]
  servicesIds?: string[]
  website?: string
}
