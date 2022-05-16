const axios = require('axios');
class StationService{
	getlist(params){
		return axios.get(`/api/Station/GetAllStations${params}`)
            .then(function (response) {
			return {data:response.data};
		})
		.catch(function (error) {
			return error;
		});
	}
    async create(formData){
        var res = await  axios.post('/api/Station',formData).then(function(e){
            return {status: 1, data: e.data}
        }).catch(function(e){
            return {status: 0, data: e};
        });
        return res;
    }
    delete(id){
        return axios.post(`/api/Station/delete/${id}`).then(function(e){
            return {status: 1, data: e.data}
        }).catch(function(e){
            return {status: 0, data: e};
        });
	}
    async update(formData, id){ 
		// formData.append('_method','put')
      
		var res = await  axios.post(`/api/Station/update/${id}`,formData).then(function(e){
            return {status: 1, data: e.data}
        }).catch(function(e){
            return {status: 0, data: e};
        });
        return res;
	}
}
export default new StationService();