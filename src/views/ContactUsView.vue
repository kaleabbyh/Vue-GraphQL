<template>
  <div class="bg-contact-image bg-cover bg-center">
    <div class="bg-opacity-50 bg-white py-20">
      <h2 class="text-4xl font-extrabold text-gray-900 text-center mb-8">
        Contact Us
      </h2>

      <p
        class="text-gray-800 text-center text-xl bg-white rounded-lg p-5 bg-opacity-50 font-medium mb-8 mx-20 md:mx-80"
      >
        We would love to hear from you! Please fill out the form below or reach
        out to us using the contact information provided.
      </p>

      <div class="container px-4 grid md:grid-cols-2 gap-4 md:gap-8">
        <div>
          <div
            class="max-w-md ml-40 justify-end bg-white shadow-lg rounded-lg px-8 py-6"
          >
            <h3 class="text-xl font-bold mb-4">Form</h3>
            <form class="bg-white shadow-lg rounded-lg px-8 py-6 mb-8">
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="name"
                  >Name</label
                >
                <input
                  v-model="name"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                />
              </div>

              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="email"
                  >Email</label
                >
                <input
                  v-model="email"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="message"
                  >Message</label
                >
                <textarea
                  v-model="message"
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="message"
                  rows="5"
                  placeholder="Enter your message"
                ></textarea>
              </div>

              <div class="flex items-center justify-end">
                <button
                  @click="submitForm"
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        <div>
          <div
            class="max-w-md mr-40 justify-start h-full bg-white shadow-lg rounded-lg px-8 py-6"
          >
            <p class="text-gray-700">
              You can also reach us using the following contact information:
            </p>
            <div class="mt-4">
              <br />
              <p><i class="fas fa-envelope"></i> kaleabbyh@gmail.com.com</p>
              <br />
              <p><i class="fas fa-phone"></i> +251922555731</p>
              <br />
              <p><i class="fas fa-map-marker-alt"></i> 4 killo Addis Ababa</p>
              <br />
              <p><i class="fas fa-map-marker-alt"></i> linkedIn</p>
              <br />
              <p><i class="fas fa-map-marker-alt"></i> website</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ContactUs",
  data() {
    return {
      name: "",
      email: "",
      message: "",
    };
  },
  methods: {
    submitForm() {
      // Handle form submission logic here
    },
  },
};
</script>

<style>
.bg-contact-image {
  background-image: url("../assets/images/food.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
