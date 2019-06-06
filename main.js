Vue.component("product-details", {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template:
    `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `
})

Vue.component("product", {
    props: {
        premium:{
            type: Boolean,
            required: true
        }
    },
    template:
    `
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image" :alt="altText">
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory > 0">Almost sold out!</p>
            <p v-else>Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>

            <product-details :details="details"></product-details>

            <div v-for="(variant, index) in variants"
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor}"
                @mouseover="updateProduct(index)">
            </div>

            <button v-on:click="addToCart"
                    :disabled="!isInStock"
                    :class="{ disabledButton: !isInStock }"
            >Add to Cart</button>
        </div>
    </div>
    `,
    data: function () {
        return {
            brand: "Vue Mastery",
            product: "Socks",
            selectedVariant: 0,
            altText: "Green socks",
            details: [
                "80% cotton",
                "20% polyester",
                "Gender-neutral"
            ],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: "./assets/vmSocks-green.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: "./assets/vmSocks-blue.jpg",
                    variantQuantity: 0
                },
            ]
        }
    },
    methods: {
        addToCart: function() {
            this.cart++
        },
        updateProduct: function(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title: function () {
            return this.brand + " " + this.product;
        },
        isInStock: function () {
            if (this.inventory > 0) {
                return true
            }
            return false
        },
        image: function (index) {
            return this.variants[this.selectedVariant].variantImage
        },
        inventory: function () {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping: function () {
            if (this.premium) {
                return "Free"
            }
            return 2.99
        }
    }
})

const app = new Vue({
    el: "#app",
    data: {
        premium: true,
        cart: 0
    }
});
