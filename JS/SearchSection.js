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
            <td> ${get.Fecha_Entrega} </td>
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

    const response = await fetch(main+'/Costumers').then(resp => resp.json());
    let longitud = response.length + 1;
    const getLong = await fetch(main + '/Costumers', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(service)
    });
    console.log(longitud);
    if(getLong.status == 200 || getLong.status == 201){
        alert('AGREGADO! Su guía es: ' + longitud);
    }
    
    
    return getLong.json();
}


/*
    SECCIÓN DE MODIFICACIÓN DEL CRUD
*/

async function generarModificar(){
    let id = document.getElementById('modGuia').value;
    const response = await fetch(main + '/Costumers/' + id).then(respond => respond.json());
    document.getElementById('seccionModificar').innerHTML = `
    <div class="row justify-content-center" id="cambios">
                <div class="col-10">
                    <input class="form-control" type="text" name="nombre" id="nombreM" placeholder="Nombre Y Apellidos" value="${response.Nombre}">
                </div>

                <div id="row justify-content-center" style="margin-top: 2%; text-align: center;">
                    <div class="col">
                        <label for="fechaEntrega">Elige tu fecha de entrega:</label>
                        <input type="date" id="fechaEntregaM" value="${response.Fecha_Entrega}">
                    </div>
                </div>
                
                <p style="text-align:center;">Estado Actual: ${response.Estado}</p>
                <div class="row">
                    <label for="proceso">Defina el estado del proceso</label>
                    <select name="proceso" id="estadoM">
                        <option value="En Proceso">En Proceso</option>
                        <option value="En Envío">En Envío</option>
                        <option value="Entregado">Entregado</option>
                    </select>
                </div>

                <div class="row justify-content-center" style="margin-top: 2%;">
                    <button class="btn btn-warning" onclick="modificar()">Guardar Cambios</button>
                </div>
                <p id="total" style="text-align: center;"></p>
    `;
}


modificar = async function(){
    let id = document.getElementById('modGuia').value;
    console.log(id);
    const service = {
        Nombre: document.getElementById('nombreM').value,
        Estado: document.getElementById('estadoM').value,
        Fecha_Entrega: document.getElementById('fechaEntregaM').value
    }

    const response = fetch(main + '/Costumers/' + id, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(service)
    });
    if((await response).status == 200 || (await response).status == 201){
        alert('DATOS MODIFICADOS CORRECTAMENTE');
        let cambios = document.getElementById('cambios');
        cambios.parentNode.removeChild(cambios);
        document.getElementById('modGuia').value = "";
    }
}

