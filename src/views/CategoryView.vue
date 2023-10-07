<template>
  <div class="flex flex-wrap flex-col justify-center pt-20 mx-10 md:mx-96">
    <div
      v-for="category in categories"
      :key="category.id"
      class="bg-white rounded-lg shadow-lg flex m-4"
    >
      <div class="w-1/3">
        <img
          :src="category.image"
          class="object-cover h-full w-full rounded-l-lg"
          :alt="category.name"
        />
      </div>
      <div class="p-4 w-2/3">
        <h2 class="text-lg font-semibold mb-2">{{ category.name }}</h2>
        <p class="text-gray-600">{{ category.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        {
          id: 1,
          name: "Breakfast",
          image: "../assets/images/breakfast.jpg",
          description: "Start your day with delicious breakfast recipes.",
        },
        {
          id: 2,
          name: "Lunch",
          image: "../assets/images/lunch.jpg",
          description: "Enjoy a hearty and fulfilling lunch.",
        },
        {
          id: 3,
          name: "Dinner",
          image: "../assets/images/dinner.jpg",
          description: "Indulge in flavorful dinner dishes.",
        },
        // Add more categories as needed
      ],
    };
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
