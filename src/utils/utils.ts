import { Review } from '../models/review.model'

export const calculateRateReviews = (stars: number[], totalReviews) => {
  const valueRate = stars.reduce((acc, currentValue, index): any => acc + currentValue * index + 1, 0) / totalReviews
  return Math.trunc(valueRate * 100) / 100
}

export const calculateStars = (reviews: Review[]) => {
  const stars = [0, 0, 0, 0, 0]
  reviews.forEach(review => {
    stars[Math.trunc(review.rate) - 1] = stars[Math.trunc(review.rate) - 1] + 1
  })
  return stars
}
