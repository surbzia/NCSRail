const axios = require('axios');
class CoachService{
	getlist(params){
		return axios.get(`/api/TrainCoach/GetAllCoaches${params}`)
            .then(function (response) {
			return {data:response.data};
		})
		.catch(function (error) {
			return error;
		});
	}
    async create(formData){
        var res = await  axios.post('/api/TrainCoach',formData).then(function(e){
            return {status: 1, data: e.data}
        }).catch(function(e){
            return {status: 0, data: e.response.data};
        });
        return res;
    }
      get(id){
		return axios.get(`/api/TrainCoach/Get/${id}`).then(e=>e.data);
	}
    delete(id){
        return axios.delete(`/api/TrainCoach/${id}`);
	}
    async update(formData, id){ 
		var res = await  axios.post(`/api/TrainCoach/${id}`,formData).then(function(e){
            return {status: 1, data: e.data}
        }).catch(function(e){
            return {status: 0, data: e.response.data};
        });
        return res;
	}
}
export default new CoachService();