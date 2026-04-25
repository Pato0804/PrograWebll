console.log("social.js cargado correctamente");

async function cargarListaDeUsuarios() {
    const miId = localStorage.getItem('userId');
    
    try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) throw new Error('Error: ${response.status}');
        
        const usuarios = await response.json();
        const contenedor = document.getElementById('lista-usuarios');
        
        if (!contenedor) {
            console.error("No se encontró el elemento 'lista-usuarios'");
            return;
        }

        contenedor.innerHTML = '';

        usuarios.forEach(user => {
            if (user.id_user != miId) {
                const divUsuario = document.createElement('div');
                divUsuario.className = 'user-card'; 
                
                divUsuario.innerHTML = `
                    <p>${user.full_name}</p>
                    <button onclick="enviarSolicitud(${user.id_user}, this)">Agregar amigo</button>
                `;
                contenedor.appendChild(divUsuario);
            }
        });
    } catch (error) {
        console.error("Error al cargar la lista de usuarios:", error);
    }
}

//enviar soli
async function enviarSolicitud(idAmigo, botonElemento) {
    const miId = localStorage.getItem('userId');
    const miNombre = "Alguien";

    if (!miId) {
        alert("Primero debes iniciar sesión");
        return;
    }

    try {
        const responseAmistad = await fetch('http://localhost:3000/friendships', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                requester_id: parseInt(miId),
                receiver_id: idAmigo,
                status: 'pending',
                request_date: new Date().toISOString().split('T')[0]
            })
        });

        if (responseAmistad.ok) {
            await fetch('http://localhost:3000/notifications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id_user: idAmigo,
                    message: `Has recibido una nueva solicitud de amistad`,
                    type: 'friend',
                    is_read: false
                })
            });
            alert("¡Solicitud enviada con éxito!");
            botonElemento.disabled = true;
            botonElemento.textContent = "Solicitud enviada";
            botonElemento.style.backgroundColor = "gray";
        } else {
            alert("Hubo un error al enviar la solicitud");
        }
    } catch (error) {
        console.error("Error de conexión:", error);
    }
}
//buscador
const buscador = document.getElementById('buscador');
if (buscador) {
    buscador.addEventListener('input', (e) => {
        const textoBusqueda = e.target.value.toLowerCase();
        const usuariosCards = document.querySelectorAll('.user-card');
        
        usuariosCards.forEach(card => {
            const nombreUsuario = card.querySelector('p').textContent.toLowerCase();
            card.style.display = nombreUsuario.includes(textoBusqueda) ? 'block' : 'none';
        });
    });
}

cargarListaDeUsuarios();