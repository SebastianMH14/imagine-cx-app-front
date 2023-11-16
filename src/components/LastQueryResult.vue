<template>
  <div class="container">
    <h1 class="mb-4">Última Consulta al Backend</h1>
    <div v-if="lastQueryResult">
      <h2 class="mt-4">Resultados de la Última Consulta</h2>
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Ciudad</th>
              <th>Correo</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in lastQueryResult.data" :key="contact.id">
              <td>{{ contact.id }}</td>
              <td>{{ contact.name }}</td>
              <td>{{ contact.city }}</td>
              <td>{{ contact.email }}</td>
              <td>{{ contact.phone }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else>
      <p>No hay resultados disponibles.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      lastQueryResult: null,
    };
  },
  mounted() {
    this.fetchLastQueryResult();
  },
  methods: {
    async fetchLastQueryResult() {
      try {
        const response = await axios.get(
          "https://imaginecx-api.azurewebsites.net/contacts/last-query"
        );
        this.lastQueryResult = response.data;
        console.log(this.lastQueryResult);
      } catch (error) {
        console.error("Error fetching last query result:", error.message);
      }
    },
  },
};
</script>

<style>
/* Puedes agregar estilos según sea necesario */
</style>
