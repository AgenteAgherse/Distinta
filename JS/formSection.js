var url = 'https://61e827b3e32cd90017acc0cf.mockapi.io/api/v1/PQRS';

datosSolicitud = function(){
    datos = {
        name: document.getElementById('nombre').value,
        telefono: document.getElementById('tel').value,
        correo: document.getElementById('correo').value,
        mensaje: document.getElementById('motivo').value,
        tipoSolicitud: document.getElementById('tipoSolicitud').value
    };
    return datos;
}

add = async function(){
    const get = await fetch(url).then(resp => resp.json());
    let longitud = get.length + 1;
    const response = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(datosSolicitud())
    });
    if(response.status == 200 || response.status == 201){
        alert('Enviado! Su número de petición es: ' + longitud);
    }
    return response.json();
}

sectionOfMessage = async function(){
    let id = document.getElementById('pet').value;
    const response = await fetch(url + '/' + id).then(resp => resp.json());
    document.getElementById('mensaje').value = response.mensaje + '\n';
    document.getElementById('mensaje').value += 'Tipo de Solicitud: ' + response.tipoSolicitud;
}