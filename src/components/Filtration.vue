<template>
  <div class="aside">
    <div class="filter-fields">
      <span class="category">Gender</span>
      <div class="option">
        <span class="option-label">male</span>
        <input type="checkbox" name="male" value="male" v-model="filter.productGender" />
      </div>

      <div class="option">
        <span class="option-label">female</span>
        <input type="checkbox" name="female" value="female" v-model="filter.productGender" />
      </div>
    </div>
    <div class="filter-fields">
      <span class="category">Type</span>
      <div class="option">
        <span class="option-label">mounting</span>
        <input type="checkbox" name="mounting" value="mounting" v-model="filter.productType" />
      </div>
      <div class="option">
        <span class="option-label">city</span>
        <input type="checkbox" name="city" value="city" v-model="filter.productType" />
      </div>
    </div>
    <div class="filter-fields">
      <span class="category">Wheel size</span>
      <div class="option">
        <span class="option-label">26</span>
        <input type="checkbox" name="26" value="26" v-model="filter.productWheelSize" />
      </div>
      <div class="option">
        <span class="option-label">27</span>
        <input type="checkbox" name="27" value="27" v-model="filter.productWheelSize" />
      </div>
      <div class="option">
        <span class="option-label">28</span>
        <input type="checkbox" name="28" value="28" v-model="filter.productWheelSize" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Filtration",
  data() {
    return {
      filter: {
        productGender: [],
        productType: [],
        productWheelSize: []
      }
    };
  },
  watch: {
    filter: {
      handler: function(currentFilter) {
        this.$store.dispatch("setFilter", currentFilter);
        this.$store.dispatch("getData");
      },
      deep: true
    }
  }
};
</script>

<style scoped>

 
.filter-fields {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10vh;
}

.category {
  font-size: 30px;
  font-weight: 700;
  display: block;
  margin-bottom: 15px;
  color: rgb(0, 104, 104);
}
.option {
  display: flex;

}
.option-label {
  display: block;
  min-width: 100px;
  text-align: left;
  font-size: 18px;
}

</style>
 