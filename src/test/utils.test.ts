/* eslint-disable no-undef */

import { calculateRateReviews, calculateStars } from '../utils/utils'

const reviews = [
  {
    id: 'l5ikpo0m5b1dkq9hmn5',
    rate: 3,
    clientName: 'ibi',
    date: '2-6-2022',
    opinion: 'Increíbles'
  },
  {
    opinion: 'Increíbles',
    id: 'l5ikpoqv7jhyit2drq',
    date: '2-6-2022',
    rate: 3,
    clientName: 'ibi'
  }
]

describe('test sort function', () => {
  it('should return stars', () => {
    expect(calculateStars(reviews)).toEqual([
      0,
      0,
      2,
      0,
      0
    ])
  })

  it('should return the rate 3.3', () => {
    expect(calculateRateReviews([
      0,
      0,
      2,
      1,
      0
    ])).toEqual(3.33)
  })

  it('should return the rate 0', () => {
    expect(calculateRateReviews([
      0,
      0,
      0,
      0,
      0
    ])).toEqual(0)
  })
})
