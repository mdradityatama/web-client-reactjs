export const isAuthentication = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/api/claims', {
      method: 'POST',
      headers: {
        'Authorization' : `Bearer ${data}`
      }
    })
    .then(response => response.json())
    .then(response => {
      if (typeof response === 'object') {
        const dataUser = {
          name: response.name,
          username: response.username,
          email: response.email,
          phone: response.phone,
          token: data
        }

        dispatch({
          type: "CHANGE_USER",
          value: dataUser,
        })

        dispatch({
          type: "CHANGE_ISLOGIN",
          value: true,
        })        

        localStorage.setItem('currentUser', JSON.stringify(dataUser));
        
        resolve(dataUser);
      }
      else {
        reject(response);
      }
    })
    .catch(error => console.warn(error))
  })
}

export const loginUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        const { data } = response;
        
        const dataUser = {
          name: data.user.name,
          username: data.user.username,
          email: data.user.email,
          phone: data.user.phone,
          token: data.token
        }
  
        dispatch({
          type: "CHANGE_ISLOGIN",
          value: true,
        });
  
        dispatch({
          type: "CHANGE_USER",
          value: dataUser,
        });

        localStorage.setItem('currentUser', JSON.stringify(dataUser));

        resolve(dataUser);
      }
      else {
        reject(response.message)
      }
    })
    .catch(error => console.log(error))
  });
};

export const registerUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/api/register', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        resolve(response);
      }
      else {
        reject(response);
      }
    })
    .catch(error => console.log(error))
  });
};

export const getProductsAPI = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/api/products', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(response => {
      resolve(response)
    })
    .catch(error => console.log(error))
  });
};

export const getOrderByUserAPI = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/api/orders-by-user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(response => {
      resolve(response)
    })
    .catch(error => console.log(error))
  });
};