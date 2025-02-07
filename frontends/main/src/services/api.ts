// Importez axios pour effectuer les requêtes HTTP
import axios, { AxiosInstance } from 'axios'

// Créez une classe ApiClient
class ApiClient {
  client: AxiosInstance;
  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
    })
  }

  // Méthode pour effectuer une requête GET
  async get(url: string, params: object = {}) {
    const response = await this.client.get(url, { params })
    return response.data
  }

  // Méthode pour effectuer une requête POST
  async post(url: string, data: object = {}) {
    return await this.client.post(url, data)
  }

  // Méthode pour effectuer une requête PATCH
  async patch(url: string, data: object = {}) {
    const response = await this.client.patch(url, data)
    return response.data
  }

  // Méthode pour effectuer une requête PUT
  async put(url: string, data: object = {}) {
    const response = await this.client.put(url, data)
    return response.data
  }

  // Méthode pour effectuer une requête DELETE
  async delete(url: string) {
    const response = await this.client.delete(url)
    return response.data
  }

  // Méthode pour login l'utilisateur
  async login(login: string, password: object = {}) {
    return await this.client.post('/login', {
      login: login,
      password: password
    })
  }
}

// Exportez une instance de la classe ApiClient avec l'URL de base
export default ApiClient // Remplacez par votre URL de base
