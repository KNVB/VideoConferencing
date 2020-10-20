export default {
  API_HOST: process.env.REACT_APP_API_HOST || 'localhost',
  API_PORT: process.env.REACT_APP_API_PORT || 9000,
  API_URL: process.env.REACT_APP_API_URL,
  SOCKET_URL:process.env.REACT_APP_SOCKET_IO_URL,
  DEFAULT_MEETING_PWD:((process.env.REACT_APP_DEFAULT_MEETING_PWD===undefined)?"1":"")
}
