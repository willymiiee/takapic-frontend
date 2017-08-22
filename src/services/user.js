import axios from 'axios';
import {token, project, appid} from './nowdb';
import {firebase} from './firebase';

// export const checkUserById = function(id) {
//   return new Promise(function(resolve, reject){
//     axios.get(`https://api.takapic.com/v2/select_id/token/${token}/project/${project}/collection/user/appid/${appid}/id/${id}`)
//     .then((response) => {
//       if(response.data.Data === '0'){
//         reject(new Error('User not found'));
//       } else {
//         resolve(response.data[0]);
//       }
//     }).catch((error) => reject(error));
//   });
// }

export const checkUserById = function(uid) {
  return new Promise(function(resolve, reject){
    axios.get(`https://api.takapic.com/v2/select_where/token/${token}/project/${project}/collection/user/appid/${appid}/where_field/user_id/where_value/${uid}`)
    .then((response) => {
      if(response.data.Data === '0'){
        reject(new Error('User not found'));
      } else {
        resolve(response.data[0]);
      }
    }).catch((error) => reject(error));
  });
}

export const checkUserByEmail = function(email) {
  return new Promise(function(resolve, reject){
    axios.get(`https://api.takapic.com/v2/select_where/token/${token}/project/${project}/collection/user/appid/${appid}/where_field/email/where_value/${email}`)
    .then((response) => {
      if(response.data.Data === '0'){
        reject(new Error('User not found'));
      } else {
        resolve(response.data[0]);
      }
    }).catch((error) => reject(error));
  });
}

export const checkUserByUsername = function(username) {
  return new Promise(function(resolve, reject){
    axios.get(`https://api.takapic.com/v2/select_where/token/${token}/project/${project}/collection/user/appid/${appid}/where_field/username/where_value/${username}`)
    .then((response) => {
      if(response.data.Data === '0'){
        reject(new Error('User not found'));
      } else {
        resolve(response.data[0]);
      }
    }).catch((error) => reject(error));
  });
}

export const logOutUser = function(){
  return new Promise(function(resolve, reject){
    firebase.auth().signOut().then(function(){
      resolve({success: true});
    }).catch(function(error){
      reject(new Error('Log Out Failed'));
    });
  });
}

export const loginUser = function(email, password) {
  return new Promise(function(resolve, reject){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
      reject(new Error(error.message));
    })
  });
}

export const updateUserId = function(email, uid){
  let body = new FormData();
  body.append('token', token);
  body.append('project', project);
  body.append('collection', 'user');
  body.append('appid', appid);

  body.append('update_field', 'user_id');
  body.append('update_value', uid);
  body.append('where_field', 'email');
  body.append('where_value', email);

  return new Promise(function(resolve, reject){
    axios.post('https://api.takapic.com/v2/update_where', body)
    .then((response) => resolve(response))
    .catch((error) => reject(error));
  })
}

export const registerUser = function(name, email, password, username, phone='') {
  return new Promise(function(resolve, reject){
    checkUserByEmail(email)
    .then((user) => reject(new Error('Email already used')))
    .catch((error) => {
      checkUserByUsername(username)
      .then((user) => reject(new Error('Username already used')))
      .catch((error) => {
        sendRegisterForm(name, email, password, username, phone)
        .then((response) => {
          return resolve(response)
        })
        .catch((error) => {
          return reject(new Error('Server Error'))}
        )
      })
    });
  });
}

export const sendRegisterForm = function(name, email, password, username, phone){
  let body = new FormData();

  let date = new Date();
  let month = date.getMonth()+1;
  let day = date.getDate();
  let year = date.getFullYear();
  let hour = date.getHours() >= 10?date.getHours():'0'+date.getHours();
  let minutes = date.getMinutes()>=10?date.getMinutes():'0'+date.getMinutes();
  let seconds = date.getSeconds()>=10?date.getSeconds():'0'+date.getSeconds();

  body.append('token', token);
  body.append('project', project);
  body.append('collection', 'user');
  body.append('appid', appid);

  body.append('name', name);
  body.append('username', username);
  body.append('email', email);
  body.append('phone', phone);
  body.append('password', password);
  body.append('user_id', '');
  body.append('date_signup', `${year}-${month}-${day}`);
  body.append('time_signup', `${hour}:${minutes}:${seconds}`);

  return new Promise(function(resolve, reject){
    axios.post('https://api.takapic.com/v2/insert', body)
    .then((response) => resolve(response.data[0]))
    .catch((error) => reject(error))
  })
}