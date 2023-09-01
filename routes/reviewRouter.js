const { Router } = require('express')
const { getAllReview, createReview, updateAllReview, updateReview, deleteReview } = require('../service/reviewService.js')
const { authorizationMiddlewareAll, authorizationMiddlewareApprover } = require("../middleware/authorization-middleware")


const reviewRouter = Router()

reviewRouter.get('/', authorizationMiddlewareAll, getAllReview)
reviewRouter.post('/', authorizationMiddlewareAll, createReview)
reviewRouter.put('/:id', authorizationMiddlewareApprover, updateAllReview)
reviewRouter.patch('/:id', authorizationMiddlewareApprover, updateReview)
reviewRouter.delete("/:id", authorizationMiddlewareAll, deleteReview);

module.exports = reviewRouter  