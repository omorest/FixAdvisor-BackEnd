import { Request, Response, Router } from 'express'
import { db } from '../../../firebase/firebaseConfig'
import { Review } from '../../models/review.model'

const routerReviews = Router()

routerReviews.get('/api/reviews/:serviceId', async (req: Request, res: Response) => {
  const { serviceId } = req.params
  const reviewsRef = db.collection('reviews')
  const reviewsService = await reviewsRef.where('serviceId', '==', serviceId).get()
  const reviews = reviewsService.docs.map(doc => {
    const { reviews } = doc.data()
    return reviews
  }).flat(1)
  res.json(reviews)
})

routerReviews.post('/api/reviews/newReview/:serviceId', async (req: Request, res: Response) => {
  const { serviceId } = req.params
  const newReview: Review = req.body

  const reviewsRef = await db.collection('reviews').doc('rev' + serviceId)
  const { reviews } = (await reviewsRef.get()).data()
  const indexNewReview = reviews.findIndex((review: Review) => review.id === newReview.id)
  if (indexNewReview < 0) {
    await reviewsRef.update({ reviews: [...reviews, newReview] })
    res.status(200).json({ message: 'correct' })
    return
  }
  const reviewsCopy = [...reviews]
  reviewsCopy[indexNewReview] = newReview
  await reviewsRef.update({ reviews: reviewsCopy })

  res.status(200).json({ message: 'correct' })
})

export { routerReviews }
