export const loginUserAPI = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      if (response.succeeded) {
        const dataUser = {
          name: response?.user.name,
          username: response?.user.username,
          email: response?.user.email,
          phone: response?.user.phone,
          token: response?.token
        }
  
        dispatch({
          type: "CHANGE_ISLOGIN",
          value: true,
        });
  
        dispatch({
          type: "CHANGE_USER",
          value: dataUser,
        });
  
        resolve(response);
      }
      else {
        reject(response.message)
      }


      // if (token != null) {
      //   const { name, username, email, phone } = response.user; 

      //   setUser({
      //     ...user,
      //     auth: true,
      //     name,
      //     username,
      //     email,
      //     phone,
      //     token
      //   })

      //   localStorage.setItem('currentUser', JSON.stringify({
      //     auth: true,
      //     name,
      //     username,
      //     email,
      //     phone,
      //     token
      //   }));
      // }
      // else {
      //   setError(response);
      // }

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