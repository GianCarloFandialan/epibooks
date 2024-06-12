import axios from "axios"

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVjNTQ4ZmQzMzNiMTAwMTU2OWNkMzQiLCJpYXQiOjE3MTczMzEzMjUsImV4cCI6MTcxODU0MDkyNX0.Y0bjkYMSFIjRTSw3MU4lMOmhX7W3zmspvpQlmdXiyHM'

export default axios.create({
  baseURL: `https://striveschool-api.herokuapp.com/api/comments/`,
  headers: {'Authorization': `Bearer ${token}`}
});
