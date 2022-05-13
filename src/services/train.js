const axios = require('axios');
class TrainService{
	getlist(params){
		return axios.get(`/api/Train/GetAllTrains${params}`)
            .then(function (response) {
			return {data:response.data};
		})
		.catch(function (error) {
			return error;
		});
	}
    async create(formData){
        var res = await  axios.post('/api/Train',formData).then(function(e){
            return {status: 1, data: e.data}
        }).catch(function(e){
            return {status: 0, data: e};
        });
        return res;
    }
    delete(id){
        return axios.delete(`/api/Train/${id}`);
	}
    async update(formData, id){ 
		// formData.append('_method','put')
      
		var res = await  axios.post(`/api/Train/${id}`,formData).then(function(e){
            return {status: 1, data: e.data}
        }).catch(function(e){
            return {status: 0, data: e};
        });
        return res;
	}
}
export default new TrainService();