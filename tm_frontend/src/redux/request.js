import { http } from 'http'

export const fetchUsersRequest = async req => {
    const {
        data
    } = await http({
        method: 'GET',
        url: '',
        body: {
            ...req
        }
    })
    return data
}