let products = [];
let editIndex = null;

// Load data dari LocalStorage saat halaman dimuat
document.addEventListener('DOMContentLoaded', function () {
    const savedProducts = JSON.parse(localStorage.getItem('products'));
    if (savedProducts) {
        products = savedProducts;
        renderProducts();
    }
});

// Tambah produk baru
document.getElementById('productForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;

    if (name && price) {
        products.push({ name, price });
        saveProducts();
        renderProducts();
        e.target.reset();
    }
});

// Simpan perubahan produk
document.getElementById('editForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('editName').value;
    const price = document.getElementById('editPrice').value;

    if (name && price && editIndex !== null) {
        products[editIndex] = { name, price };
        saveProducts();
        renderProducts();
        toggleEditForm(false);
    }
});

// Batal edit
document.getElementById('cancelEdit').addEventListener('click', function () {
    toggleEditForm(false);
});

// Simpan data ke LocalStorage
function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

// Render daftar produk
function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const container = document.createElement('div');
        container.className = 'product-container';

        const title = document.createElement('h2');
        title.textContent = product.name;

        const price = document.createElement('p');
        price.textContent = `Harga: Rp ${parseFloat(product.price).toLocaleString('id-ID')}`;

        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'Edit';
        editButton.onclick = function () {
            editIndex = index;
            toggleEditForm(true, product);
        };

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Hapus';
        deleteButton.onclick = function () {
            products.splice(index, 1);
            saveProducts();
            renderProducts();
        };

        container.append(title, price, editButton, deleteButton);
        productList.appendChild(container);
    });
}

// Tampilkan atau sembunyikan form edit
function toggleEditForm(show, product = null) {
    const editForm = document.getElementById('editForm');
    const cancelEdit = document.getElementById('cancelEdit');
    const productForm = document.getElementById('productForm');

    editForm.style.display = show ? 'block' : 'none';
    cancelEdit.style.display = show ? 'block' : 'none';
    productForm.style.display = show ? 'none' : 'block';

    if (product) {
        document.getElementById('editName').value = product.name;
        document.getElementById('editPrice').value = product.price;
    }
}
