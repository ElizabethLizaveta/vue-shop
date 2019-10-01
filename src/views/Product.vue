<template>
  <div class="page">
      <div class="container">
    <div class="img-wrap">
      <img :src="product.productImageUrl" alt="product photo" class="product-img" />
    </div>
    <div class="text-content">
      <h1 class="product-name">{{product.productName}}</h1>
      <p class="description">{{product.productDescription}}</p>
    </div>
      </div>
  </div>
</template>


<script> 

export default {
     name: "Product",
     data() {
         return {
             product: {}
         }
     },
     mounted(){
            const product = this.$store.state.data.products[this.$route.params.id]
            this.product = product
     }
}
</script>
 
 <style scoped>
.page {
  position: relative;
  background: url('https://images.adsttc.com/media/images/5c14/57bf/08a5/e58a/ba00/059a/slideshow/Varniu_34_originalus_dydis_1.jpg?1544836987');
  background-size: cover;
 background-attachment: fixed;
  height: 100vh;
}

.container {
  border: 1px solid transparent;
  border-radius: 10px;
  padding: 100px 40px; 
  box-sizing: border-box;
  box-shadow: 0px 0px 5px 2px rgba(191, 189, 191, 1); 
  background: #ffffff;
  width: 50%;
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text-content {
    max-width: 500px;

}

.description {
    text-align: justify;
}

.product-name {
  font-size: 30px;
  color: rgb(0, 27, 27);
  margin-bottom: 10px; 
  font-weight: bold;
}

 </style>