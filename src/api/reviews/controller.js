import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Reviews } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Reviews.create({ ...body, createdBy: user })
    .then((reviews) => reviews.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Reviews.find(query, select, cursor)
    .populate('createdBy')
    .then((reviews) => reviews.map((reviews) => reviews.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Reviews.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then((reviews) => reviews ? reviews.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Reviews.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((reviews) => reviews ? Object.assign(reviews, body).save() : null)
    .then((reviews) => reviews ? reviews.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Reviews.findById(params.id)
    .then(notFound(res))
    .then((reviews) => reviews ? reviews.remove() : null)
    .then(success(res, 204))
    .catch(next)
