import request from '../request'

export default async (menuType) => {
    return await request.get('/menu/'+menuType)
}