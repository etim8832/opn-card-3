class Cart {
    items = [];
    discounts = {};

    constructor() {}

    add(product_id, quantity, isReward = false) {
        const objIndex =  this.items.findIndex(obj => obj.product_id == product_id);
        if (objIndex >= 0) {
            this.items[objIndex].quantity += quantity
        } else {
            this.items.push({
                product_id,
                quantity: quantity,
                isReward: isReward
             })
        }
    }

    update(product_id, quantity) {
        const objIndex =  this.items.findIndex(obj => obj.product_id == product_id);
        if (objIndex >= 0) {
            this.items[objIndex].quantity = quantity
        }
        console.log('show update -> ', this.items)
    }

    remove(product_id) {
        const objIndex =  this.items.findIndex(obj => obj.product_id == product_id);
        this.items.splice(objIndex, 1); 
        console.log('show remove -> ', this.items)
    }

    destroy() {
        this.items = [];
        this.discounts = {};
    }

    has(product_id) {
        const product = this.items.find(f => f.product_id == product_id)
        return !!product
    }

    isEmpty() {
        return this.items.length === 0;
    }

    count() {
        return this.items;
    }

    // quantity() {
    //     return Object.keys(this.items).length;
    // }

    total() {
        let total = 0;
        for (const item of this.items) {
            // Sum only item isReward = false
            if(!item.isReward) {
              total += item.quantity * getProductPrice(item.product_id);
            }
        }
        // Apply discounts
        for (const discount of Object.values(this.discounts)) {
            if (discount.type === "fixed") {
                total -= discount.amount;
            } else if (discount.type === "percentage") {
                const deduct = total * (discount.amount / 100);
                if (discount.max && deduct > discount.max) {
                    total = total - discount.max
                }
                total = total - deduct
            }
        }
        return total;
    }

    addDiscount(name, discount) {
        this.discounts[name] = discount;
    }

    removeDiscount(name) {
        delete this.discounts[name];
    }

    addFreebie(name, condition, reward) {
        const objIndex =  this.items.findIndex(obj => obj.product_id == condition.product_id);
        if (condition.type === "contains" && (objIndex >= 0)) {
            // Add reward to cart
            this.add(reward.product_id, reward.quantity, reward.isReward);
        }
    }
}

function getProductPrice(product_id) {
    return 100; // Dummy price for test
}

module.exports = Cart