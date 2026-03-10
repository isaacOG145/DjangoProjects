import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import toast, { Toaster } from "react-hot-toast";
import {
  createProducts,
  getProducts,
  updateProducts,
  deleteProducts,
} from "../services/api";

export default function product() {
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const [isEditingId, setIsEditingId] = useState(null);
  const [filter, setFilter] = useState("");
  const [chargeTable, setChargeTable] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoria: "",
    descripcion: "",
  });

  useEffect(() => {
    chargeProducts();
  }, []);

  const chargeProducts = async () => {
    setChargeTable(true);

    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Error al cargar productos: ", error);
      toast.error("Error al obtener los datos del servidor");
    } finally {
      setChargeTable(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      if (isEditingId) {
        await updateProducts(isEditingId, formData);
        toast.success("Producto actualizado correctamente");
      } else {
        await createProducts(formData);
        toast.success("Producto registrado exitosamente");
      }

      setFormData({});
      setIsEditingId(null);
      chargeProducts();
    } catch (error) {
      console.error("Error al guardar: ", error);

      if (error.response && error.response.data) {
        setErrors(error.response.data);
        toast.error("Porfavor, corrige los errores en el formulario");
      } else {
        toast.error("Hubo un error de conexión con el servidor");
      }
    } finally {
      setSaving(false);
    }
  };

  const prepareEditing = (products) => {
    setFormData({
      nombre: products.nombre,
      precio: products.precio,
      stock: products.stock,
      categoria: products.categoria,
      descripcion: products.descripcion,
    });
    setIsEditingId(products.id);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
      const toastId = toast.loading("Eliminando producto...");

      try {
        await deleteProducts(id);
        toast.success("producto eliminado", { id: toastId });
        chargeProducts();
      } catch (error) {
        console.error("Error al eliminar: ", error);
        toast.error("Error al eliminar el producto: ", { id: toastId });
      }
    }
  };

  const filterProducts = products.filter((product) =>
    product.nombre.toLowerCase(),
  );

  const searchBar = (
    <div className="input-group mb-3" style={{ maxWidth: "300px" }}>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por nombre..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {filter && (
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => setFilter("")}
        >
          ✖
        </button>
      )}
    </div>
  );

  const SpinnerTabla = () => (
    <div className="p-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>

      <p className="mt-2 text-muted">Cargando registros...</p>
    </div>
  );

  const columnas = [
    //cambiar por mi proyecto
    { name: "Nombre", selector: (row) => row.nombre, sortable: true },
    { name: "Precio", selector: (row) => row.precio, sortable: true },
    { name: "Stock", selector: (row) => row.stock, sortable: true },
    { name: "Categoria", selector: (row) => row.categoria, soportable: true },
    {
      name: "Descripción",
      selector: (row) => row.descripcion,
      soportable: true,
    },

    {
      name: "Acciones",
      cell: (row) => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-warning btn-sm"
            onClick={() => prepareEditing(row)}
            disabled={chargeTable}
          >
            ✏️ Editar
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row.id)}
            disabled={chargeTable}
          >
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
    <div className="container-fluid mt-5">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="row">
        <div className="col-md-4 mb-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                {isEditingId ? "Editar Producto" : "Producto"}
              </h5>
            </div>

            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre</label>

                  <input
                    type="text"
                    name="nombre"
                    placeholder="Ej.Sabritas"
                    className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  />

                  {errors.nombre && (
                    <div className="invalid-feedback">
                      {errors.nombre.join(", ")}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Precio</label>

                  <input
                    type="number"
                    name="precio"
                    placeholder="Ej.10.00"
                    className={`form-control ${errors.precio ? "is-invalid" : ""}`}
                    value={formData.precio}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  />

                  {errors.precio && (
                    <div className="invalid-feedback">
                      {errors.precio.join(", ")}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    className={`form-control ${errors.stock ? "is-invalid" : ""}`}
                    value={formData.stock}
                    placeholder="Ej.100"
                    onChange={handleChange}
                    required
                    disabled={saving}
                  />
                  
                  {errors.stock && (
                    <div className="invalid-feedback">
                      {errors.stock.join(", ")}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Categoria</label>
                  <input
                    type="text"
                    name="categoria"
                    placeholder="Ej.frituras"
                    className={`form-control ${errors.categoria ? "is-invalid" : ""}`}
                    value={formData.categoria}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  />
                  
                  {errors.categoria && (
                    <div className="invalid-feedback">
                      {errors.categoria.join(", ")}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <input
                    type="text"
                    name="descripcion"
                    placeholder="Ej.Paquete chico de frituras"
                    className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
                    value={formData.descripcion}
                    onChange={handleChange}
                    required
                    disabled={saving}
                  />
                  
                  {errors.descripcion && (
                    <div className="invalid-feedback">
                      {errors.descripcion.join(", ")}
                    </div>
                  )}
                </div>

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={saving}
                  >
                    
                    {saving ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Guardando...
                      </>
                    ) : isEditingId ? (
                      "Actualizar"
                    ) : (
                      "Guardar"
                    )}
                  </button>

                  {isEditingId && (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        setIsEditingId(null);
                        setFormData({
                          nombre: "",
                          precio: "",
                          stock: "",
                          categoria: "",
                          descripcion: "",
                        });
                        setErrors({});
                      }}
                      disabled={saving}
                    >
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
                title="Lista de productos"
                columns={columnas}
                data={filterProducts}
                pagination
                paginationPerPage={5}
                highlightOnHover
                responsive
                subHeader
                subHeaderComponent={searchBar}
                subHeaderAlign="right"
                noDataComponent="No hay Productos que coincidan con la búsqueda"
                progressPending={chargeTable}
                progressComponent={<SpinnerTabla />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
