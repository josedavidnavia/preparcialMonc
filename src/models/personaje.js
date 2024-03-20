class Personaje {
    constructor(id, nombre, nivel, clase, usuario_id) {
        this.id = id;
        this.nombre = nombre;
        this.nivel = nivel;
        this.clase = clase;
        this.usuario_id = usuario_id;
        this.inventario = [];
    }
}

module.exports = Personaje;