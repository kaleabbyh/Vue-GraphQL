<template>
  <div class="bg-gray-100 py-12 mt-20">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-4xl font-extrabold text-gray-900 text-center mb-8">
        About Us
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
          <p class="text-gray-700">
            My-Recipe was founded with a simple belief: that cooking should be
            approachable, enjoyable, and accessible to everyone. It all started
            in a small kitchen where a group of friends gathered to share their
            love for food and explore new recipes together. Inspired by the joy
            of cooking and the desire to create a community of food enthusiasts,
            we embarked on a journey to create a platform that would inspire and
            guide fellow cooks on their culinary adventures.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
          <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Philosophy</h3>
          <p class="text-gray-700">
            At the heart of our philosophy is the belief that food has the power
            to connect people, cultures, and memories. We believe that cooking
            is an expression of creativity, a way to nourish both body and soul,
            and a means to celebrate life's special moments. We strive to
            provide a platform that encourages experimentation, fosters culinary
            knowledge, and sparks inspiration in the kitchen.
          </p>
        </div>
      </div>

      <div class="mt-12">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Our Team</h3>
        <p class="text-gray-700">
          Behind My-Recipe is a team of passionate individuals who bring their
          expertise and love for food to curate an exceptional culinary
          experience for our users. Our team consists of experienced chefs,
          talented writers, and dedicated food enthusiasts who are committed to
          delivering high-quality recipes, helpful cooking tips, and engaging
          content that will elevate your cooking skills.
        </p>
      </div>

      <div class="mt-12">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">
          Join Our Community
        </h3>
        <p class="text-gray-700">
          We invite you to join our growing community of food lovers, where you
          can connect with like-minded individuals, share your own culinary
          creations, and discover new recipes that will tantalize your taste
          buds. Whether you're a seasoned chef or just starting your culinary
          journey, there's a place for you at My-Recipe.
        </p>
      </div>

      <div class="mt-12">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Contact Us</h3>
        <p class="text-gray-700">
          We would love to hear from you! If you have any questions, feedback,
          or partnership inquiries, please don't hesitate to reach out to us.
          You can contact our team at [email address] or connect with us on
          [social media platforms].
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
};
</script>

<style scoped>
.grid {
  display: grid;
}
.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
</style>
