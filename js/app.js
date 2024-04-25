const Ingresos = [
    new Ingreso('renta departamento', 900),
    new Ingreso('venta coche', 1600),
    new Ingreso('venta merk', 1800),
];

const Egresos = [
    new Egreso('renta departamento', 900),
    new Egreso('ropa', 400),
    new Egreso('teclado', 400),

];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngreso = 0;
    for (let ingreso of Ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgreso = 0;
    for (let egreso of Egresos) {
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', { style: 'percent', minimumFractionDigits: 2 });
}

const cargarIngresos = () => {
    let ingresosHTML = ' ';
    for (let ingreso of Ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML
}

const cargarEgresos = () => {
    let EgresoHTML = ' ';
    for (let egreso of Egresos) {
        EgresoHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = EgresoHTML
}



const eliminarIngreso = (id) => {
    let indiceEliminar = Ingresos.findIndex(ingreso => ingreso.id === id);
    Ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const crearIngresoHTML = (ingreso) => {
    let ingresosHTML =
        `<div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close" onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>`;
    return ingresosHTML

}

const eliminarEgreso = (id) => {
    let indiceEliminar = Egresos.findIndex(egreso => egreso.id === id);
    Egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

const crearEgresoHTML = (Egreso) => {
    let EgresosHTML =
        `<div class="elemento limpiarEstilos">
                <div class="elemento_descripcion">${Egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(Egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(Egreso.valor / totalEgresos())}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close" onclick='eliminarEgreso(${Egreso.id})'></ion-icon>
                            </button>
                        </div>
                    </div>
                </div>`
        ;
    return EgresosHTML;

}

let agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if (descripcion.value !== '' && valor.value !== '') {
        if (tipo.value === 'ingreso') {
            Ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }
        else if (tipo.value === 'egreso') {
            Egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}

