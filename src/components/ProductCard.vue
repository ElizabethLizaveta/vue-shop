<template>
  <div class="product-card">
    <div class="img-wrap">
      <img :src="item.productImageUrl" alt="product photo" class="product-img" />
    </div>
    <router-link class="product-name" :to="`/Product/${index}/${item.productName}`">{{item.productName}}</router-link>
    <span class="product-price">{{ item.productPrice }} $</span>
    <div class="count">
      <button class="minus-btn" @click="reduceNumber">-</button>
      <span class="counter">{{cartItem.counter}}</span>
      <button class="plus-btn" @click="increaseNumber">+</button>
    </div>
    <button
      @click="addProductToCart()"
      v-bind:disabled="this.cartItem.counter === 0"
      class="add-btn"
    >Add to cart</button>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    item: Object,
    index: Number,
  },
  data() {
    return {
      cartItem: {
        product: this.item,
        counter: 0
      }
    };
  },
  methods: {
    reduceNumber: function() {
      if (this.cartItem.counter > 0) {
        this.cartItem.counter--;
      }
    },
    increaseNumber: function() {
      this.cartItem.counter++;
    },
    addProductToCart() {
      this.$store.dispatch("addProductToCart", { ...this.cartItem });
      this.cartItem.counter = 0;
    }
  },
  created() {}
};
</script>

<style scoped>
.product-card {
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 30px 40px;
  margin: 30px 5px;
  max-width: 300px;
  height: 430px;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px 2px rgba(191, 189, 191, 1);
  text-align: center;
  background: #ffffff;
}

.product-card:hover {
  box-shadow: 0px 0px 16px 3px rgba(191, 189, 191, 1);
  transform: scale(1.1);
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.img-wrap {
  margin-bottom: 30px;
}

.product-img {
  max-width: 100%;
}

.product-name {
  font-size: 30px;
  color: rgb(0, 27, 27);
  margin-bottom: 10px;
  text-decoration: none;
  display: block;
  font-weight: bold;
}

.product-name:hover {
  color: rgb(240, 185, 66);
}

.product-price {
  font-size: 25px;
  color: rgb(0, 104, 104);
  font-weight: 700;
}

.count {
  display: flex;
  justify-content: center;
  margin: 40px 0 10px;
}

.counter {
  box-sizing: border-box;
  display: block;
  border: 2px solid rgb(0, 104, 104);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: rgb(0, 104, 104);
  font-weight: 700;
}

.minus-btn,
.plus-btn {
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 0 15px;
  background: rgb(0, 104, 104);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: white;
  font-weight: 700;
}

.minus-btn:hover,
.plus-btn:hover {
  background: rgba(0, 104, 104, 0.7);
  cursor: pointer;
}

.add-btn {
  font-size: 12px;
  background: rgb(240, 185, 66);
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid transparent;
  border-radius: 15px;
  cursor: pointer;
  color: #ffffff;
  margin: 10px 0;
  padding: 7px 20px;
}
.add-btn:hover {
  transform: scale(1.1);
}
.add-btn:disabled {
  cursor: unset;
  transform: scale(1);
}


</style>