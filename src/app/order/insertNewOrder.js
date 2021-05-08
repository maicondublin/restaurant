import request from '../request'

export default async (order) => {
    return await request.post('/order', order)
}