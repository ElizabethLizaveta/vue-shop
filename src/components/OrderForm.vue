<template>
  <div class="form">
    <button class="close" @click="closePopup()">
      <span class="line"></span>
    </button>
    <form class="vue-form" @submit.prevent="addInfo">
      <div class="form-group">
        <input
          class="form-control"
          type="text"
          placeholder="First Name"
          name="first-name"
          v-model="userInfo.firstName"
          v-validate
          data-vv-rules="required"
        />
        <span
          v-show="errors.has('first-name')"
          class="error-message"
        >{{ errors.first('first-name') }}</span>
      </div>
      <div class="form-group">
        <input
          type="text"
          name="last-name"
          placeholder="Last Name"
          v-model="userInfo.lastName"
          v-validate
          data-vv-rules="required"
        />
        <span v-show="errors.has('last-name')" class="error-message">{{ errors.first('last-name') }}</span>
      </div>
      <div class="form-group">
        <input
          type="email"
          name="email"
          placeholder="Email"
          v-model="userInfo.email"
          v-validate
          data-vv-rules="required|email"
        />
        <span v-show="errors.has('email')" class="error-message">{{ errors.first('email') }}</span>
      </div>
      <div class="form-group">
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          v-model="userInfo.phone"
          v-validate
          data-vv-rules="required|phone"
        />
        <span v-show="errors.has('phone')" class="error-message">{{ errors.first('phone') }}</span>
      </div>
      <div class="form-group">
        <textarea type="text" placeholder="Order comment"></textarea>
      </div>
      <div class="form-group">
        <input type="text" name="city" placeholder="City" v-model="userInfo.city"  v-validate
          data-vv-rules="required"/>
          <span v-show="errors.has('city')" class="error-message">{{ errors.first('city') }}</span>
      </div>
      <div class="form-group">
        <input
          type="text"
          name="address"
          placeholder="Address"
          v-model="userInfo.address"
          v-validate
          data-vv-rules="required"
        />
        <span v-show="errors.has('address')" class="error-message">{{ errors.first('address') }}</span>
      </div>
      <div class="radios">
        <div class="form-group radio">
          <label class="radio-label" for="delivery">Delivery options</label>
          <div class="radio-group" name="delivery">
            <input
              type="radio"
              id="delivery1"
              name="delivery"
              value="pickup"
              v-model="userInfo.delivery"
              v-validate
              data-vv-rules="required"
            />
            <label for="delivery1">Pickup</label>
          </div>
          <div class="radio-group">
            <input
              type="radio"
              id="delivery2"
              name="delivery"
              value="parcel"
              v-model="userInfo.delivery"
              v-validate
              data-vv-rules="required"
            />
            <label for="delivery2">Parcel</label>
          </div>
          <div class="radio-group">
            <input
              type="radio"
              id="delivery3"
              name="delivery"
              value="courier"
              v-model="userInfo.delivery" 
               v-validate
              data-vv-rules="required"
            />
            <label for="delivery3">Courier</label>
          </div>
            <span
              v-show="errors.has('delivery')"
              class="error-message"
            >{{ errors.first('delivery') }}</span>
        </div>
        <div class="form-group radio" name="payment">
          <label class="radio-label" for="payment">Payment options</label>
          <div class="radio-group">
            <input
              type="radio"
              id="payment1"
              name="payment"
              value="cash"
              v-model="userInfo.payment"
               v-validate
              data-vv-rules="required"
            />
            <label for="payment1">Cash</label>
          </div>
          <div class="radio-group">
            <input
              type="radio"
              id="payment2"
              name="payment"
              value="card"
              v-model="userInfo.payment"
               v-validate
              data-vv-rules="required"
            />
            <label for="payment2">Card</label>
          </div>
            <span
              v-show="errors.has('payment')"
              class="error-message"
            >{{ errors.first('payment') }}</span>
        </div>
      </div>
    </form>
    <div class="row">
      <div class="order-info">
        <span class="total">
          Total:
          <span class="total-number">{{this.$store.state.totalPrice}} $</span>
        </span>
      </div>
      <button class="send-btn" :disabled="errors.any()" @click="submitOrder()">Send</button>
    </div>
  </div>
</template>

<script>
import * as VeeValidate from "vee-validate";

VeeValidate.Validator.extend("phone", {
  getMessage(field, params, data) {
    return (data && data.message) || "Something went wrong";
  },
  validate(value) {
    return new Promise(resolve => {
      const MOBILEREG = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/;

      if (MOBILEREG.test(value)) {
        resolve({ valid: true });
      } else {
        resolve({
          valid: false,
          data: { message: `The phone must be a valid phone number` }
        });
      }
    });
  }
});

export default {
  name: "OrderForm",
  data() {
    return {
      userInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        delivery: "",
        payment: ""
      },
      users: []
    };
  },
  methods: {
    submitOrder() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.state.orderInfo = this.userInfo; 
        }
      });
    },
    closePopup() {
      this.$store.state.page = 1;
    }
  }
};
</script>

<style scoped>

.close  {
  position: absolute;
  right: -40px;
  top: -30px;
  border: 0;
  background: transparent;
}

.line {
  width: 40px;
  height: 7px;
  border: 1px solid transparent;
  border-radius: 5px;
  display: block;
  background: rgb(240, 185, 66);
  transform: rotate(145deg);
}

.line:after {
  content: '';
  width: 40px;
  height: 7px;
  border: 1px solid transparent;
  border-radius: 5px;
  display: block;
  background: rgb(240, 185, 66);
  transform: translateX(-1px) rotate(80deg);
}

.form {
  width: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  background: white;
  padding: 30px;
  padding: 30px 30px;
  border: 1px solid transparent;
  border-radius: 10px;
}
 
.vue-form {
  padding: 30px 200px 30px;
}

.form-group {
  margin-bottom: 10px;
  position: relative;
}

.radio {
  display: flex;
  flex-direction: column;
}

.radio-label {
  text-align: left;
  margin-bottom: 10px;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  height: 30px;
  border: 1px solid rgb(67, 67, 80);
  border-radius: 10px;
  padding: 3px 10px;
  margin: 0;
  font-size: 16px;
  font-family:Avenir, Helvetica, Arial, sans-serif;
}

textarea {
  min-height: 80px;
  height: 80px;
  max-height: 200px;
  max-width: 100%;
  min-width: 100%;
}

.radios {
  display: flex;
  margin-top: 30px;
}

.radio {
  width: 50%;
  position: relative;
}

.radio-group {
  text-align: left;
}

.row {
  display: flex;
  justify-content: space-between;
  padding: 0px 200px;
}

.total {
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
}
.total-number {
  color: rgb(124, 0, 0);
}

.send-btn {
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

.error-message {
    font-size: 12px;
    color: rgb(124, 0, 0);
    position: absolute;
    top: 50%;
    right: -10px;
    transform: translateY(-50%);
    display: block;
}

.radio .error-message {
    bottom: 0;
    top: 100%;
    left: 0;
   text-align: left;
}
</style>