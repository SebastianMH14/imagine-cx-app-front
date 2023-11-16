<template>
  <div class="div-navbar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light text-center">
      <img
        src="../assets/logo-01.png"
        class="d-inline-block align-top logo-img img-fluid"
        alt="Navbar Logo"
      />
      <button
        class="navbar-toggler nav-responsive ms-auto"
        style="background-color: white"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/create-contact">Crear Contacto</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/last-query">Ultima consulta</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "AppNavbar",
};
</script>

<style scoped>
.navbar {
  background: #04004f !important;
}

.div-navbar {
  margin-top: 0px !important;
  padding-top: 0% !important;
}
.navbar-nav .nav-link {
  color: white;
}
.logo-img {
  max-height: 100% !important;
  width: 250px;
}
</style>
