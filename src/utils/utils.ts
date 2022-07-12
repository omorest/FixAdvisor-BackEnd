import { Review } from '../models/review.model'

export const calculateRateReviews = (stars: number[], totalReviews) => {
  const valueRateList: number[] = stars.map((currentValue, index): any => (currentValue * (index + 1)))
  const valueList = valueRateList.reduce((acc, current) => acc + current)
  const valueRate = valueList / stars.reduce((acc, current) => acc + current)
  return Math.trunc(valueRate * 100) / 100
}

export const calculateStars = (reviews: Review[]) => {
  const stars = [0, 0, 0, 0, 0]
  reviews.forEach(review => {
    stars[Math.trunc(review.rate) - 1] = stars[Math.trunc(review.rate) - 1] + 1
  })
  return stars
}
