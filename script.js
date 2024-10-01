class Product {
    constructor(id, name, price, img) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.img = img;
        this.quantity = 1;
    }
    increment() {
        this.quantity++;
    }

    decrement() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

    getTotalPrice() {
        return this.price * this.quantity;
    }

    affiche() {
        return `
            <div class="w-full md:w-1/3 max-w-sm rounded-lg shadow bg-gray-800 border-gray-700 relative">
                <div class="w-[50px] h-[50px] bg-blue-600 absolute rounded-lg end-0 m-2 flex items-center justify-center cursor-pointer">
                    <svg class="w-6 h-6 text-white heart" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
                    </svg>
                </div>
                <img class="p-8 mb-4 w-full h-[400px] box-border bg-blue-200 rounded-lg border-yellow-50 border-2 object-contain hover:p-1 ease-in-out duration-75" src="${this.img}" alt="${this.name} image" />
                <div class="px-5 pb-5">
                    <h5 class="text-xl text-center font-semibold tracking-tight text-white">${this.name}</h5>
                    <div class="flex items-center justify-between mb-4">
                        <span class="text-3xl font-bold text-white">$<span class="text-3xl font-bold text-white">${this.price}</span></span>
                        <div class="flex items-center space-x-2">
                            <button class="decrement-button focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2.5 py-1 text-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">-</button>
                            <span class="counter text-2xl font-bold text-white">${this.quantity}</span>
                            <button class="increment-button focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2.5 py-1 text-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">+</button>
                        </div>
                    </div>
                    <div class="flex flex-col">
                        <button class="delete-button w-full flex items-center justify-center cursor-pointer focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-white  px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800">
                            <svg class="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
        this.totalElement = document.getElementById("totalprix");
        this.cartElement = document.getElementById("cart");
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id); 
        if (existingItem) {
            existingItem.increment(); 
        } else {
            this.items.push(product);
        }
        this.affiche();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.affiche();
    }

    updateTotal() {
        const total = this.items.reduce((acc, item) => acc + item.getTotalPrice(), 0);
        this.totalElement.innerText = total.toFixed(2);
    }

    affiche() {
        this.cartElement.innerHTML = ""; 
        this.items.forEach(item => {
            this.cartElement.innerHTML += item.affiche();
        });
        this.updateTotal(); 
        this.addEventListeners(); 
    }

    addEventListeners() {
        const decrementButtons = document.querySelectorAll('.decrement-button');
        const incrementButtons = document.querySelectorAll('.increment-button');
        const deleteButtons = document.querySelectorAll('.delete-button');

        decrementButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                this.items[index].decrement(); 
                this.affiche(); 
            });
        });

        incrementButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                this.items[index].increment(); 
                this.affiche(); 
            });
        });

        deleteButtons.forEach((button, index) => {
            const productId = this.items[index].id; 
            button.addEventListener('click', () => {
                this.removeItem(productId); 
            });
        });
    }
}


const cart = new ShoppingCart();
const product1 = new Product(1, "Airpods2", 50, "./img/airpods.png");
const product2 = new Product(2, "Casque", 100, "./img/casque.png");
const product3 = new Product(3, "iPhoneX", 200, "./img/iphoneX.png");
const product4 = new Product(4, "souris", 200, "./img/souris.png");

cart.addItem(product1);
cart.addItem(product2);
cart.addItem(product3);
cart.addItem(product4);
