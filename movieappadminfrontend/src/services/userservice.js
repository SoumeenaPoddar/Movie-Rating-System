const BASE_URL = "http://localhost:5000/";

class UserService {
  async login(user) {

    const response =  fetch(BASE_URL + 'LoginAdmin/',{
      method: 'POST',
      headers:{
        'Content-type':'application/json',
        'accept':'*/*',
        'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(user)
    });
    
    return response;

  }

  register(user) {

    const response =  fetch(BASE_URL + 'RegisterAdmin/',{
      method: 'POST',
      headers:{
        'Content-type':'application/json',
        'accept':'*/*',
        'Access-Control-Allow-Origin': '*'},
        body: JSON.stringify(user)
    });
    
    return response;
  }
}

export default new UserService();
