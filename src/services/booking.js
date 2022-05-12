const axios = require('axios');
class bookingservice{
	getlist(params){
		return axios.get(`/api/BookingService/GetAllBookings${params}`)
            .then(function (response) {
			return {data:response.data};
		})
		.catch(function (error) {
			return error;
		});
	}
    async create(formData){
        var res = await  axios.post('/api/categories',formData).then(function(e){
            return {status: 1, data: e.data.data}
        }).catch(function(e){
            return {status: 0, data: e.response.data.errors};
        });
        return res;
    }
    delete({query,id}){
		return axios.delete(`/api/categories/${id}`);
	}
    get(id){
		return axios.get(`/api/BookingService/GetBookingDetail/${id}`).then(e=>e.data);
	}
    pay(json){
		return axios.post(`/api/BookingService/paynow`,{hash:json}).then(e=>e);
	}
    async update(formData, id){
		formData.append('_method','put')
		var res = await  axios.post('/api/categories/'+id,formData).then(function(e){
            return {status: 1, data: e.data.data}
        }).catch(function(e){
            return {status: 0, data: e.response.data.errors};
        });
        return res;
	}
}
export default new bookingservice();