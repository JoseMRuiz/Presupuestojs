class Ingreso extends Dato {
    static contadorIngresos = 0;

    constructor(descripcion, valor) {
        super(descripcion, valor);
        this._idd = ++Ingreso.contadorIngresos;
    }
    get id() {
        return this._id;
    }
}
