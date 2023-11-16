<template>
  <div v-if="successMessage" class="alert alert-success" role="alert">
    {{ successMessage }}
    <!-- <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> -->
  </div>
  <div>
    <h1 class="mb-4">Crear Contacto</h1>
    <form @submit.prevent="createContact">
      <div class="mb-3">
        <label for="contactName" class="form-label">Nombre</label>
        <input
          v-model="firstname"
          type="text"
          class="form-control"
          id="contactName"
          required
        />
      </div>
      <div class="mb-3">
        <label for="contactName" class="form-label">Apellido</label>
        <input
          v-model="lastname"
          type="text"
          class="form-control"
          id="contactName"
          required
        />
      </div>
      <div class="mb-3">
        <label for="contactCity" class="form-label">Ciudad</label>
        <input
          v-model="city"
          type="text"
          class="form-control"
          id="contactCity"
          required
        />
      </div>
      <div class="mb-3">
        <label for="contactEmail" class="form-label">Correo</label>
        <input
          v-model="email"
          type="text"
          class="form-control"
          id="contactEmail"
          required
        />
      </div>
      <div class="mb-3">
        <label for="contactPhone" class="form-label">Telefono</label>
        <input
          v-model="phone"
          type="text"
          class="form-control"
          id="contactPhone"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Crear Contacto</button>
    </form>

    <div v-if="createdContact">
      <h2 class="mt-4">Contacto Creado</h2>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            {{ createdContact.data.name }}
          </h5>
          <p class="card-text">Ciudad: {{ createdContact.data.city }}</p>
          <p class="card-text">Correo: {{ createdContact.data.email }}</p>
          <p class="card-text">Teléfono: {{ createdContact.data.phone }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      city: "",
      email: "",
      phone: "",
      firstname: "",
      lastname: "",
      createdContact: null,
      successMessage: ""
    };
  },
  methods: {
    async createContact() {
      try {
        const response = await axios.post("https://imaginecx-api.azurewebsites.net/contacts", {
          firstname: this.firstname,
          lastname: this.lastname,
          address: {
            city: this.city,
          },
          emails: {
            address: this.email,
          },
          phones: {
            number: this.phone,
          },
        });

        this.successMessage = response.data.message;

        this.createdContact = response.data;

        this.firstname = "";
        this.lastname = "";
        this.city = "";
        this.email = "";
        this.phone = "";

        setTimeout(() => {
          this.successMessage = "";
        }, 2000);
      } catch (error) {
        console.error("Error creating contact:", error.message);
      }
    },
  },
};
</script>

<style>
/* Puedes agregar estilos según sea necesario */
</style>
