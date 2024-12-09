import { menuArray } from "./data.js"
let orderArray = []
function displayMenu() {

    let menuItems = ``
    menuArray.forEach(function(menu) {
        menuItems += `
                    <div class="menu-item">
                        <img src="${menu.image}" class="image-emoji">
                        <div class="menu-title">
                            <p>${menu.name}</p>
                            <p class="composition">${menu.ingredients.join(", ")}</p>
                            <p>${menu.price} zł</p>
                        </div>
                        <button class="add-btn" id="${menu.id}">+</button>
                    </div>`
    })
    return menuItems
}
function selectedOrder() {
    let itemOrdered = ``
    orderArray.forEach(function(order) {
        

         itemOrdered += `
                             <div class="complete-order">
                                 <button id="${order.id}" class="remove-btn">-</button>
                                 <p>${order.name}${order.emoji}</p>
                                 <p>${order.price} zł</p>
                            </div>`
    })
    return itemOrdered
}


function renderOrder() {
    document.getElementById("selected-order").innerHTML = selectedOrder();
    document.getElementById("submit-order").innerHTML = completeOrder()
}
function addOrder(orderId) {
    const selectedOrder = menuArray.find(menu => menu.id === orderId)
    
        if(selectedOrder) {
            orderArray.push(selectedOrder)
        }
        renderOrder()
}

function completeOrder() {
    const totalOrder = orderArray.reduce((total, order) => total + order.price, 0)
    const completedItems = `<div class="total-price">
            <p>Total Price:</p>
            <p class="total-amount">${totalOrder} zł</p>
        </div>
        <button class="pay-order">Complete order</button>`
    
    return completedItems
}
const paymentDetails = document.getElementById("payment-details")
const submitForm = document.getElementById("submit-form")
const checkoutOrder = document.getElementById("order-complete")
document.addEventListener("click", function(e) {
    
    if(e.target.classList.contains("add-btn")) {
        addOrder(parseInt(e.target.id))
    }
    if(e.target.classList.contains("remove-btn")) {
        removeOrder(parseInt(e.target.id))
    }
    if(e.target.classList.contains("pay-order")) {
        paymentDetails.style.display = "block"
    }
})
submitForm.addEventListener("submit", function(e) {
    e.preventDefault()
    const orderCompleted = new FormData(submitForm)
    const fullName = orderCompleted.get("name")
    checkoutOrder.innerHTML = `Thanks, ${fullName}! Your order is on its way! 🛵`
    paymentDetails.style.display = "none"
    checkoutOrder.style.display = "block"
    document.getElementById("clear-content").style.display = "none"
})
function removeOrder(orderId) {
    const duplicateOrder = orderArray.findIndex(order => order.id === orderId)
   
    if(duplicateOrder !== -1) {
        orderArray.splice(duplicateOrder, 1)
    }
    renderOrder()
}

function renderMenu() {
    document.getElementById("display-menu").innerHTML = displayMenu()
    
}
renderMenu()