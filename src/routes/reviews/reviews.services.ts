import { Request, Response, Router } from 'express'
import { db } from '../../../firebase/firebaseConfig'
import { Review } from '../../models/review.model'
import { calculateRateReviews, calculateStars } from '../../utils/utils'

const routerReviews = Router()

routerReviews.get('/api/reviews/:serviceId', async (req: Request, res: Response) => {
  const { serviceId } = req.params
  const reviewsRef = db.collection('reviews')
  const reviewsService = await reviewsRef.where('serviceId', '==', serviceId).get()
  const reviews = reviewsService.docs.map(doc => {
    const { reviews } = doc.data()
    return reviews as Review
  }).flat(1)
  res.json(reviews)
})

routerReviews.post('/api/reviews/newReview/:serviceId', async (req: Request, res: Response) => {
  const { serviceId } = req.params
  const newReview: Review = req.body

  const reviewsRef = await db.collection('reviews').doc('rev' + serviceId)
  const { reviews } = (await reviewsRef.get()).data()
  const indexNewReview = reviews && reviews.length > 0 ? reviews.findIndex((review: Review) => review.id === newReview.id) : -1
  if (indexNewReview < 0) {
    const reviewsUpdated = [...reviews, newReview]
    const stars = calculateStars(reviewsUpdated)
    const newRate = calculateRateReviews(stars, reviewsUpdated.length)
    await reviewsRef.update({
      starsRating: stars,
      rate: newRate,
      reviews: reviewsUpdated,
      totalReviews: reviewsUpdated.length
    })
    const serviceRef = await db.collection('services').doc(serviceId)
    serviceRef.update({ rate: newRate, totalReviews: reviewsUpdated.length, rateStars: stars })
    res.status(200).json({ message: 'correct' })
    return
  }
  const reviewsCopy = [...reviews]
  reviewsCopy[indexNewReview] = newReview
  await reviewsRef.update({ reviews: reviewsCopy })

  res.status(200).json({ message: 'correct' })
})

export { routerReviews }
