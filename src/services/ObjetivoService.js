class ObjetivoService {
    axios; baseUrl;

    constructor(axios, apiUrl) {
        this.axios = axios;
        this.baseUrl = `${apiUrl}objetivo`;
    }

    get(id) {
        return this.axios.get(`${this.baseUrl}/${id}`)
    }

    getAll() {
        return this.axios.get(`${this.baseUrl}`)
    }

    add(model) {
        return this.axios.post(`${this.baseUrl}`, model)
    }

    update(model, id) {
        return this.axios.put(`${this.baseUrl}/${id}`, model)
    }

    remove(id) {
        return this.axios.delete(`${this.baseUrl}-${id}`)
    }
}

export default ObjetivoService