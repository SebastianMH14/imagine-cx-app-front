<template>
  <div v-if="successMessage" class="alert alert-success" role="alert">
    {{ successMessage }}
    <!-- <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> -->
  </div>
  <div class="contacts">
    <h1 class="mb-4">Lista de Contactos</h1>
    <div class="container text-center">
      <div class="row">
        <div class="col-sm-12 col-md-4 mb-2">
          <input
            v-model="query"
            class="form-control input-query"
            placeholder="Buscar por nombre, ciudad, correo o teléfono"
          />
        </div>
        <div class="col-sm-12 col-md-4 mb-2">
          <select v-model="searchBy" class="form-select select-query">
            <option value="name" selected>Nombre</option>
            <option value="city">Ciudad</option>
            <option value="email">Correo</option>
            <option value="phone">Teléfono</option>
          </select>
        </div>
        <div class="col-sm-12 col-md-2 mb-2">
          <button @click="performSearch" class="btn btn-primary btn-block">
            Buscar
          </button>
          <button @click="clearSearch" class="btn btn-secondary btn-block">
            Limpiar
          </button>
        </div>
      </div>
    </div>

    <div class="container text-center pt-5" v-if="contacts.length > 0">
      <div class="row">
        <div
          v-for="contact in contacts"
          :key="contact.id"
          class="col-md-4 mb-4"
        >
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">
                {{ contact.name }}
              </h5>
              <p class="card-text">Ciudad: {{ contact.city }}</p>
              <p class="card-text">
                Correo:
                {{
                  contact.email ? contact.email.replace(".invalid", "") : null
                }}
              </p>
              <p class="card-text">Telefono: {{ contact.phone }}</p>
              <button
                @click="showUpdateModalWithData(contact)"
                data-bs-toggle="modal"
                data-bs-target="#updateModal"
                class="btn btn-secondary pr-2 mr-2"
              >
                Actualizar
              </button>
              <button
                @click="deleteContact(contact.id)"
                class="btn btn-danger mr-2"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        v-if="nextPage"
        @click="loadMore"
        class="btn btn-primary mt-3 load-more"
        :disabled="loading"
      >
        {{ loading ? "Cargando..." : "Cargar más" }}
      </button>
    </div>
    <div v-else>
      <p>No hay contactos disponibles.</p>
    </div>

    <div
      class="modal"
      id="updateModal"
      tabindex="-1"
      aria-labelledby="updateModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="updateModalLabel">
              Actualizar Contacto
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateContact">
              <div class="mb-3">
                <label for="updateName" class="form-label">Nombre</label>
                <input
                  v-model="updateFormData.firstname"
                  type="text"
                  class="form-control"
                  id="updateName"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="updateName" class="form-label">Apellido</label>
                <input
                  v-model="updateFormData.lastname"
                  type="text"
                  class="form-control"
                  id="updateName"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="updateCity" class="form-label">Ciudad</label>
                <input
                  v-model="updateFormData.address"
                  type="text"
                  class="form-control"
                  id="updateCity"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="updateCity" class="form-label">Correo</label>
                <input
                  v-model="updateFormData.emails"
                  type="text"
                  class="form-control"
                  id="updateCity"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="updateCity" class="form-label">Telefono</label>
                <input
                  v-model="updateFormData.phones"
                  type="text"
                  class="form-control"
                  id="updateCity"
                  required
                />
              </div>

              <button
                type="submit"
                data-bs-dismiss="modal"
                class="btn btn-primary"
              >
                Actualizar
              </button>
            </form>
          </div>
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
      contacts: [],
      nextPage: null,
      loading: false,
      showUpdateModal: false,
      selectedContact: null,
      successMessage: "",
      updateFormData: {
        name: "",
      },
      query: "",
      searchBy: "all",
      searchParams: {},
    };
  },
  mounted() {
    this.fetchContacts();
  },
  methods: {
    async fetchContacts() {
      setTimeout(() => {
        this.successMessage = "";
      }, 2000);
      try {
        this.loading = true;
        const response = await axios.get("http://localhost:3000/contacts");
        const data = response.data;
        this.contacts = data.data;
        this.nextPage = data.next;
      } catch (error) {
        console.error("Error fetching contacts:", error.message);
      } finally {
        this.loading = false;
      }
    },
    async loadMore() {
      if (this.loading) {
        return;
      }

      try {
        this.loading = true;
        const response = await axios.get("http://localhost:3000/contacts", {
          params: {
            ...this.searchParams,
            next: this.nextPage,
          },
        });
        const data = response.data;
        this.contacts = [...this.contacts, ...data.data];
        this.nextPage = data.next;
      } catch (error) {
        console.error("Error loading more contacts:", error.message);
      } finally {
        this.loading = false;
      }
    },

    showUpdateModalWithData(contact) {
      this.updateFormData = {
        id: contact.id,
        firstname: contact.firstname,
        lastname: contact.lastname,
        address: contact.city,
        emails: contact.email,
        phones: contact.phone,
      };
    },

    resetUpdateModal() {
      this.updateFormData = {};
    },

    async updateContact() {
      try {
        const response = await axios.put(
          `http://localhost:3000/contacts/${this.updateFormData.id}`,
          this.updateFormData
        );
        this.successMessage = response.data.message;

        await this.performSearch();

        this.resetUpdateModal();
      } catch (error) {
        console.error("Error updating contact:", error.message);
      }
    },

    async deleteContact(contactId) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/contacts/${contactId}`
        );
        this.successMessage = response.data.message;

        await this.performSearch();
      } catch (error) {
        console.error("Error deleting contact:", error.message);
      }
    },

    async performSearch() {
      try {
        this.loading = true;
        const response = await axios.get("http://localhost:3000/contacts", {
          params: {
            ...this.searchParams,
            [this.searchBy]: this.query,
          },
        });
        const data = response.data;
        this.contacts = data.data;
        this.nextPage = data.next;

        this.searchParams = {
          searchBy: this.searchBy,
          query: this.query,
        };
      } catch (error) {
        console.error("Error performing search:", error.message);
      } finally {
        this.loading = false;
      }
    },

    clearSearch() {
      this.query = "";
      this.fetchContacts();
    },
  },
};
</script>

<style>
.contacts {
  margin-top: 10px;
}

.load-more {
  background-color: #04004f !important;
}

button {
  margin: 5px !important;
}

/* .select-query {
  width: 250px !important;
  position: center !important;
}

.input-query {
  width: 250px !important;
} */
</style>
