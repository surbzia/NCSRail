const axios = require('axios');
class PermissionService{
	getlist(params){
		return axios.get(`/api/Permissions/GetAllPermissions${params}`)
            .then(function (response) {
			return {data:response.data};
		})
		.catch(function (error) {
			return error;
		});
	}
	getPermissions(){
		return axios.get(`/api/Permissions/GetAllPermissionsCustom`)
            .then(function (response) {
			return {data:response.data};
		})
		.catch(function (error) {
			return error;
		});
	}
    async create(formData){
        var res = await  axios.post('/api/Permissions',formData).then(function(e){
            return {status: 1, data: e.data}
        }).catch(function(e){
            return {status: 0, data: e};
        });
        return res;
    }
          get(id){
		return axios.get(`/api/Permissions/Get/${id}`).then(e=>e.data);
	}
    delete(id){
        return axios.post(`/api/Permissions/delete/${id}`).then(function (e) {
            return {status: 1, data: e.data.code}
        }).catch(function(e){
            return {status: 0, data: e};
        });
	}
    async update(formData, id){ 
		// formData.append('_method','put')
      
		var res = await  axios.post(`/api/Permissions/update/${id}`,formData).then(function(e){
            return {status: 1, data: e.data}
        }).catch(function(e){
            return {status: 0, data: e};
        });
        return res;
	}
}
export default new PermissionService();