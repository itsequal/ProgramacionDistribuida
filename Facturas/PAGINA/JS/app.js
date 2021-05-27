let InvProducts = [];
let products = new Map()
let total = 0;
const btnGetProducts = document.getElementById("btnGetProducts");

btnGetProducts.addEventListener('click', () => {
    //get de api/product
    //trabajar en el resultado para mandarlo al menu
    products.clear();
    fetch('http://localhost:1339/api/product')
        .then(response => response.json())
        .catch(error => console.log(error))
        .then(json => {
            //formar una cadena que tenga esto
            let x = document.getElementById("mnuproducts");
            x.innerHTML = ""
            json.forEach(element => {
                x.innerHTML += `
            <option value="${element.id}">${element.name} $ ${element.cost}</option>`
                products.set(element.id, element)
            });
        })
})

const btnadd = document.getElementById("btnadd");

btnadd.addEventListener('click', () => {
    let name, quantity, cost;
    name = document.getElementById("txtname").value;
    quantity = document.getElementById("txtquantity").value;
    cost = document.getElementById("txtcost").value;

    var data = {
        name: name,
        quantity: quantity,
        cost: cost
    }
    console.log(data)
    fetch('http://localhost:1339/api/product', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .catch(error => console.log(error))
        .then(json => console.log(json))
})


const btnAdd2Invoice = document.getElementById("btnAdd2Invoice");
btnAdd2Invoice.addEventListener('click', () => {
    let menu = document.getElementById("mnuproducts");
    let quantity = document.getElementById("txtinvquantity").value;
    let costo;

    if (menu.value == "") {
        alert("Debes obtener un producto primero");
    } else {
        if (quantity == 0) {
            alert("Cantidad de producto no valida");
        } else {
            costo = products.get(parseInt(menu.value)).cost;
            menu = menu.value;
            console.log(costo);
            total += costo * quantity;
            let record = {
                id: menu,
                quantity: quantity,
                cost: costo
            }
            InvProducts.push(record);
            document.getElementById('detallefactura').innerHTML += `
            <p>${record.quantity} $ ${record.cost}</p>`;
        }
    }
})

const btnSaveInvoice = document.getElementById("btnSaveInvoice");
btnSaveInvoice.addEventListener('click', () => {
    let rfc = document.getElementById("rfcSaveInvoice").value;
    let data = {
        rfc: rfc,
        total: total,
        tax: total * 0.16,
        detalles: InvProducts
    }
    console.log(data)
    if (rfc == "") {
        alert("Falta ingresar un RFC");
    } else {
        fetch('http://localhost:1339/api/invoice', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(response => response.json())
            .catch(error => console.log(error))
            .then(json => console.log(json))
    }
})