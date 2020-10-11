import Axios from 'axios';

export class DataSource {
  constructor(err_handler) {
    this.error_handler = err_handler || (() => {});
  }

  SendRequest = (method, url) =>
    Axios.request({
      method,
      url,
    });

  GetData = (url) => this.SendRequest('get', url);
}
