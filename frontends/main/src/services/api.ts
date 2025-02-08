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
    return await this.client.get(url, { params })
  }

  // Méthode pour effectuer une requête POST
  async post(url: string, data: object = {}) {
    return await this.client.post(url, data)
  }

  // Méthode pour effectuer une requête PATCH
  async patch(url: string, data: object = {}) {
    return await this.client.patch(url, data)
  }

  // Méthode pour effectuer une requête PUT
  async put(url: string, data: object = {}) {
    return await this.client.put(url, data)
  }

  // Méthode pour effectuer une requête DELETE
  async delete(url: string) {
    return await this.client.delete(url)
  }

  // Méthode pour login l'utilisateur
  async login(email: string, password: string) {
    return await this.client.post('login', { email, password })
  }
}

// Exportez une instance de la classe ApiClient avec l'URL de base
export default ApiClient // Remplacez par votre URL de base
