import axios from 'axios'

import configuration from '../configuration'

const service = axios.create({
  baseURL: configuration.apiUrl,
  timeout: 10000
})

export default {
  user: {
    search: (query, page = 0, pageSize = 5) => {
      // API Reference: https://docs.github.com/en/rest/reference/search#search-users
      return service.get(`search/users?q=${query}&page=${page}&per_page=${pageSize}`)
    },
    get: (user) => {
      // API Reference: https://docs.github.com/en/rest/reference/users#get-a-user
      return service.get(`users/${user}`)
    }
  },
  repository: {
    search: (query, page = 0, pageSize = 5) => {
      // API Reference: https://docs.github.com/en/rest/reference/search#search-repositories
      return service.get(`search/repositories?q=${query}&page=${page}&per_page=${pageSize}`)
    },
    get: () => {}
  }
}
