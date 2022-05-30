const axios = require('axios');
class RouteService {
    getlist(params) {
        return axios.get(`/api/Route/GetAllRoutes${params}`)
            .then(function (response) {
                return { data: response.data };
            })
            .catch(function (error) {
                return error;
            });
    }
    async create(formData) {
        var res = await axios.post('/api/Route', formData).then(function (e) {
            return { status: 1, data: e.code }
        }).catch(function (e) {
            return { status: 0, data: e };
        });
        return res;
    }
    get(id) {
        return axios.get(`/api/Route/Get/${id}`).then(e => e.data);
    }
    getRouteByTrainId(params) {
        return axios.get(`/api/Route/GetRoutesbyID${params}`).then(e => e.data);
    }
    delete(id) {
        return axios.post(`/api/Route/delete/${id}`).then(function (e) {
            return { status: 1, data: e.data }
        }).catch(function (e) {
            return { status: 0, data: e };
        });
    }
    async update(formData, id) {
        var res = await axios.post(`/api/Route/update/${id}`, formData).then(function (e) {
            return { status: 1, data: e.data }
        }).catch(function (e) {
            return { status: 0, data: e };
        });
        return res;
    }
}
export default new RouteService();