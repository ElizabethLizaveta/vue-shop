<template>
  <div class="page" :class="[this.$store.state.page === 2 ? 'shadow' : '']">
    <div class="cart-label" @mouseover="mouseOver">
      <div class="img-wrap">
        <img src="../assets/cart-icon-16.png" />
        <span
          class="dot"
          v-show="this.$store.state.cart.length > 0"
        >{{this.$store.state.cart.length}}</span>
      </div>
      <div class="cart" v-show="this.$store.state.cart.length > 0">
        <Card
          v-for="item in this.$store.state.cart"
          v-bind:item="item"
          v-bind:key="item.product.id"
        ></Card>
        <button @click="orderForm()" class="order-btn">Order</button>
      </div>
    </div>
    <Filtration />
    <div class="product-list">
      <ProductCard
        v-for="(product, index) in this.$store.state.data.products"
        v-bind:item="product"
        v-bind:key="product.id"
        v-bind:index="index"
      />
    </div>
    <OrderForm v-show="this.$store.state.page === 2"></OrderForm>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from "@/components/ProductCard.vue";
import Filtration from "@/components/Filtration.vue";
import Card from "@/components/Card.vue";
import OrderForm from "@/components/OrderForm.vue";

export default {
  name: "Home",
  data() {
    return {
      style: '',
    };
  },
  components: {
    ProductCard,
    Filtration,
    Card,
    OrderForm
  },
  methods: {
    orderForm() {
      this.$store.state.page = 2;
      this.$store.dispatch("formOrder");
    },
    mouseOver() {
      this.style = 'shadow';
    }  
  }
};
</script>

<style scoped>
.page {
  display: flex;
  position: relative;
  background: url('https://w-dog.ru/wallpapers/2/13/479050758060438.jpg');
  background-size: cover;
 background-attachment: fixed;
  height: 100%;
}

.shadow {
  position: fixed;
  height: 100vh;
  width: 100%;
}

.shadow:after {
  content: "";
  position: absolute;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.7;
  z-index: 11;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 180px 20px 100px;
  width: 86%;
}

.aside { 
  width: 15%;
  padding: 60px 60px 60px 180px;
  display: flex;
  flex-direction: column;
  align-items: flex-start; 
  text-align: center;
  background: rgba(252, 249, 249, 0.8); 
  height: 100vh;
   
}

.cart-label {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 10;
}

.cart-label:hover .cart {
  display: block;
}

.img-wrap {
  width: 80px;
  height: 80px;
  position: fixed;
  right: 20px;
  top: 20px;
}

.dot {
  display: block;
  width: 20px;
  height: 20px;
  border: 1px solid rgb(44, 43, 43);
  border-radius: 50%;
  background: rgb(240, 185, 66);
  position: absolute;
  right: 0px;
  top: 0px;
  z-index: 20;
  font-weight: bold;
}

.img-wrap img {
  max-width: 100%;
}

.cart {
  display: none;
  width: 400px;
  background: white;
  border: 1px solid transparent;
  box-shadow: 0px 0px 5px 2px rgba(191, 189, 191, 1);
  border-radius: 10px;
  padding: 30px;
}

.order-btn {
  font-size: 12px;
  background: rgb(240, 185, 66);
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid transparent;
  border-radius: 15px;
  cursor: pointer;
  color: #ffffff;
  margin-bottom: 10px;
  padding: 7px 20px;
}
</style>