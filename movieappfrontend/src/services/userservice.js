const BASE_URL = "http://localhost:5000/";

class UserService {
  async login(user) {

    const response =  fetch(BASE_URL + 'Login/',{
      method: 'POST',
      headers:{
        'Content-type':'application/json',
        'accept':'*/*',
        'Access-Control-Allow-Origin': 'http://localhost:3000'},
        body: JSON.stringify(user)
    });
    
    return response;

  }

  register(user) {

    const response =  fetch(BASE_URL + 'Register/',{
      method: 'POST',
      headers:{
        'Content-type':'application/json',
        'accept':'*/*',
        'Access-Control-Allow-Origin': 'http://localhost:3000'},
        body: JSON.stringify(user)
    });
    
    return response;
  }
}

export default new UserService();
