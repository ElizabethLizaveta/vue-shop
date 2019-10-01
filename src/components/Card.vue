<template>
  <div class="card">
   <h3 class="product-name">{{item.product.productName}}: <span class="count"> {{ item.counter }} items</span></h3>
    <span class="total">total price: <span class="total-number">{{ item.counter * item.product.productPrice }}$</span></span>
      <div class="row">
      <div class="count-row">
      <button class="minus-btn" @click="reduceNumber">-</button>
      <span class="counter">{{item.counter}}</span>
      <button class="plus-btn" @click="increaseNumber">+</button>
    </div>
      
      <button
      @click="removeProductFromCart()"
      class="remove-btn"
    >Remove from cart</button>
  </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    item: Object,
  },
  data() {
    return {
      cartItem: {
        product: this.item,
      }
    };
  },
   methods: {
    removeProductFromCart() {
      this.$store.dispatch("removeProductFromCart", { ...this.cartItem });
    },
     reduceNumber: function() {
      if (this.item.counter > 0) {
        this.item.counter--;
      }
    },
    increaseNumber: function() {
      this.item.counter++;
    }
  },
};
</script>

<style scoped>
.card {
  text-align: left;
  margin-bottom: 15px;
  border-bottom: 1px solid gray;
}
.product-name {
  margin: 0 0 10px 0;
}
 .count {
   color: rgb(124, 0, 0);
 }
.total {
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
}
.total-number {
     color: rgb(124, 0, 0);
}

.remove-btn {
  font-size: 12px;
  background: rgba(0, 104, 104, 1);
  cursor: pointer; 
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid transparent;
  border-radius: 15px; 
  cursor: pointer;
  color: #ffffff;
   margin-bottom: 10px;
   padding: 3px 10px;
}

.remove-btn:hover {
  background: rgba(0, 104, 104, 0.7);
}

.count-row {
  display: flex;
  justify-content: center;
  margin: 0px 0 10px;
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

.row {
  display: flex;
}

</style>