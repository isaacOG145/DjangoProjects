
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import { createProducts, getProducts, updateProducts, deleteProducts} from '../services/api';


export default function mascotas() {

    const [errors, setErrors] = useState({});
    const [products, setProducts] = useState([]);
    const [isEditingId, setIsEditingId] = useState(null);
    const [filter, setFilter] = useState(''); 
    const [chargeTable, setChargeTable] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        stock: '',
        categoria: '',
        descripcion: ''
    });


    useEffect( () => {
        chargeProducts();
    }, []);

    const chargeProducts = async () => {

        setChargeTable(true);

        try{
            const response = await getProducts();
            setProducts(response.data);

        }catch(error){
            console.error("Error al cargar mascotas: ", error);
            toast.error("Error al obtener los datos del servidor");
        } finally {
            setChargeTable(false);
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});

        await new Promise(resolve => setTimeout(resolve, 500));

        try{

            if(isEditingId){
                await updateProducts(isEditingId, formData);
                toast.success("Producto actualizado correctamente");
            }else{
                await createProducts(formData);
                toast.success("Producto registrado exitosamente")
            }

            setFormData({});
            setIsEditingId(null);
            chargeProducts();
        
        }catch(error){

            console.error("Error al guardar: ", error);

            if(error.response && error.response.data){
                setErrors(error.response.data);
                toast.error("Porfavor, corrige los errores en el formulario");
            }else{
                toast.error("Hubo un error de conexión con el servidor");
            }
        }finally{
                setSaving(false);
        }
    }

    const prepareEditing = (products) => {
        
        setFormData({
            nombre: products.name,
            precio: products.precio,
            stock: products.stock,
            categoria: products.categoria,
            descripcion: products.descripcion
        })
        setIsEditingId(product.id);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const handleDelete = async () => {

        if(window.confirm("¿Seguro que quieres eliminar este producto?")){
            const toastId = toast.loading("Eliminando producto...");

            try{
                
                await deleteProducts(id);
                toast.success("producto eliminado", {id: toastId});
                chargeProducts();

            }catch(error){
                console.error("Error al eliminar: ", error);
                toast.error("Error al eliminar el producto: ", {id: toastId});
            }
        }
    };

    const filterProducts = products.filter(
        product => 
            products.nombre.toLowerCase().include(filter.toLocaleLowerCase)
    );

    const searchBar = (
        <div className="input-group mb-3" style={{ maxWidth: '300px' }}>

        <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
        />

        {filter && (
            <button className="btn btn-outline-secondary" type="button" onClick={() => setFiltro('')}>
               ✖
          </button>
        )}

       </div>
    );

    
    const columnas = [
    //cambiar por mi proyecto
    { name: 'Nombre', selector: row => row.nombre, sortable: true },
    { name: 'Especie', selector: row => row.especie, sortable: true },
    { name: 'Edad', selector: row => row.edad, sortable: true },
    { name: 'Acciones', cell: row => (

        <div className="d-flex gap-2">

            <button className="btn btn-warning btn-sm" onClick={() => prepararEdicion(row)} disabled={chargeTable}>
                ✏️ Editar
            </button>

            <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(row.id)} disabled={chargeTable}>
                🗑️ Eliminar
            </button>

        </div>
        ),

        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        },
    ];

    return (

        <div className="container mt-5">

            <Toaster position="top-right" reverseOrder={false} /> 

                <div className="row">

                    <div className="col-md-4 mb-4">
                       <div className="card shadow-sm">
                           <div className="card-header bg-primary text-white">

                               <h5 className="mb-0">{editandoId ? 'Editar Mascota' : 'Registrar Mascota'}</h5>

                            </div>

                            <div className="card-body">

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">

                                        <label className="form-label">Nombre</label>

                                        <input 
                                            type="text" 
                                            name="nombre" 
                                            // Si hay error en 'nombre', agregamos la clase 'is-invalid'
                                            className={`form-control ${erroresBackend.nombre ? 'is-invalid' : ''}`} 
                                            value={formData.nombre} 
                                            onChange={handleChange} 
                                            required 
                                            disabled={cargandoGuardar} 
                                        />

                                        {erroresBackend.nombre && (

                                            <div className="invalid-feedback">
                                                {erroresBackend.nombre.join(', ')}
                                            </div>
                                        )}
                                                              
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Especie</label>
                                        
                                        <input 

type="text" 

 name="especie" 

placeholder="Ej. perro, gato" 

 className={`form-control ${erroresBackend.especie ? 'is-invalid' : ''}`} 

value={formData.especie} 

 onChange={handleChange} 

required 

disabled={cargandoGuardar} 
/>

{erroresBackend.especie && (

         <div className="invalid-feedback">

           {erroresBackend.especie.join(', ')}

         </div>

      )}

                              </div>

                           <div className="mb-3">

                                <label className="form-label">Edad</label>
                              <input 
type="number" 
      name="edad" 

      className={`form-control ${erroresBackend.edad ? 'is-invalid' : ''}`} 

         value={formData.edad} 

        onChange={handleChange} 

      required 
disabled={cargandoGuardar} 

/>

&{erroresBackend.edad && (

   <div className="invalid-feedback">

      {erroresBackend.edad.join(', ')}

 </div>

 )}                                </div>

                       <div className="d-grid gap-2">

<button type="submit" className="btn btn-success" disabled={cargandoGuardar}>

&{cargandoGuardar ? (

        <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Guardando...</>

      ) : (

      editandoId ? 'Actualizar' : 'Guardar'

   )}

</button>

{editandoId && (

<button type="button" className="btn btn-secondary" onClick={() => { setEditandoId(null); setFormData({ nombre: '', especie: '', edad: '' }); setErroresBackend({}); }} disabled={cargandoGuardar}>

Cancelar

</button>

)}

</div>

                   </form>

             </div>

         </div>

</div>



<div className="col-md-8">

<div className="card shadow-sm">

<div className="card-body p-0 pt-3">

<DataTable
title="Lista de Mascotas"
olumns={columnas}
data={mascotasFiltradas}
pagination
paginationPerPage={5}
highlightOnHover
responsive
subHeader
subHeaderComponent={barraDeBusqueda}
subHeaderAlign="right"
noDataComponent="No hay mascotas que coincidan con la búsqueda"                             
progressPending={cargandoTabla}

progressComponent={<SpinnerTabla />}

/>
</div>

</div>

</div>

</div>

</div>

);



}