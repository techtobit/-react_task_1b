export default function MkdSDK() {
  this._baseurl = "https://reacttask.mkdlabs.com";
  this._project_id = "reacttask";
  this._secret = "d9hedycyv6p7zw8xi34t9bmtsjsigy5t7";
  this._BearerToken = "cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==";
  this._table = "";
  this._custom = "";
  this._method = "";

  const raw = this._project_id + ":" + this._secret;
  // const raw = this._BearerToken;
  let base64Encode = btoa(raw);

  this.setTable = function (table) {
    this._table = table;
  };
  
  this.login = async function (email, password, role) {

    try {
      const response = await fetch(this.baseUrl() + "/v2/api/lambda/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'x-project' :`${this._BearerToken}`, 
          // 'x-project' :base64Encode, //geting 401 issue with decoded token 
        },
        body: JSON.stringify({
          "email": email,
          "password": password,
          "role": role,
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        // this.check(data.role);
        // if(role){
        // }
        return true;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  

  this.getHeader = function () {
    return {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "x-project": this._BearerToken,
    };
  };

  this.baseUrl = function () {
    return this._baseurl;
  };
  
  this.callRestAPI = async function (payload, method) {
    const header = {
      "Content-Type": "application/json",
      "x-project": this._BearerToken,
      Authorization: "Bearer " + localStorage.getItem("token"),
    };

    switch (method) {
      case "GET":
        const getResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/GET`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload),
          }
        );
        const jsonGet = await getResult.json();

        if (getResult.status === 401) {
          throw new Error(jsonGet.message);
        }

        if (getResult.status === 403) {
          throw new Error(jsonGet.message);
        }
        return jsonGet;
      
      case "PAGINATE":
        if (!payload.page) {
          payload.page = 1;
        }
        if (!payload.limit) {
          payload.limit = 10;
        }
        const paginateResult = await fetch(
          this._baseurl + `/v1/api/rest/${this._table}/${method}`,
          {
            method: "post",
            headers: header,
            body: JSON.stringify(payload),
          }
        );
        const jsonPaginate = await paginateResult.json();

        if (paginateResult.status === 401) {
          throw new Error(jsonPaginate.message);
        }

        if (paginateResult.status === 403) {
          throw new Error(jsonPaginate.message);
        }
        return jsonPaginate;
      default:
        break;
    }
  };  

  this.check = async function () {

    try {
      const response = await fetch(this.baseUrl() + "/v2/api/lambda/check", {
        method: "POST",
        headers: {
          // 'Content-Type': 'application/json',
          Authorization: "Bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTQxOTY3NjAsImV4cCI6MTcxNDIzMjc2MH0.m8KyxPLk1YrRAUyWZmLUCEpRXokU12SDkkVnH00Y3H4',
          'x-project' :'cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==',
        },
        body: JSON.stringify({
          "role": "admin"
        })
      });
  
      if (!response.ok) {
        throw new Error('Invalid response: ' + response.status);
      }
  
      const data = await response.json();
      console.log('Admin user found', data.role);
    } catch (error) {
      throw new Error('Error in user type checking: ' + error.message);
    }
  };
  

  return this;
}
