var main = 'https://61e827b3e32cd90017acc0cf.mockapi.io/api/v1';
var servicios = [];
search = async function(){
    try {
        let campos = document.getElementById('campo');
        if(campos != null){
            deleteRows(campos);
        }
        let id = document.getElementById('guia').value;
        const get = await fetch(main + '/Costumers/' + id).then(response => response.json());
        const tabla = document.getElementById('identificadorEstado');
        tabla.innerHTML += `
        <tr id="campo">
            <td> ${get.Nombre} </td>
            <td> ${get.Estado} </td>
        </tr>
        `;
    } catch (error) {
        alert('Persona No Encontrada.');
    }
    
}

function deleteRows(campos){
    campos.parentNode.removeChild(campos);
}


total = function(){
    for (let index = 0; index < servicios.length; index++) {
        servicios.pop();
    }

    let vinilo = document.getElementById('Vinilo').checked;
    let micro = document.getElementById('Microperforado').checked;
    let banner = document.getElementById('Banner').checked;
    let acrilico = document.getElementById('Acrílico').checked;
    let total = 0;
    if(vinilo){
        servicios.push('Vinilo');
        total += 35000;
    }
    if(micro){
        servicios.push('Microperforado');
        total += 150000;
    }
    if(banner){
        servicios.push('Banner');
        total += 30000;
    }
    if(acrilico){
        servicios.push('Acrílico');
        total += 200000;
    }
    console.log(total);
    document.getElementById('total').innerHTML = `<p>Total: $ ${total} COP</p>`;
    return total;
}

add = async function(){
    let mas = total();
    const service = {
        Nombre: document.getElementById('nombre').value,
        Estado: 'En Proceso',
        Fecha_Entrega: document.getElementById('fechaEntrega').value,
        total: mas,
        Productos: servicios
    }
    const response = await fetch(main + '/Costumers', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(service)
    });
    console.log(response.length);
    if(response.status == 200 || response.status == 201){
        alert('AGREGADO!');
    }
    return response.json();
}