import { useState, useEffect } from "react";
import { Button, Form, FormLabel } from "react-bootstrap";
import TarjetasColores from "./TarjetasColores";

const FormularioPaletaColores = () => {
  const [color, setColor] = useState("");
  const coloresLocalStorage = JSON.parse(localStorage.getItem('coloresKey')) || []
  const [colores, setColores] = useState(coloresLocalStorage);

  useEffect(()=>{
    localStorage.setItem('coloresKey', JSON.stringify(colores))
  },[colores])

  const guardarColor = (e) => {
    e.preventDefault();
    setColores([...colores, color]);
    setColor("");
  }

  const borrarColor = (nombreColor) => {
    const coloresFiltrados = colores.filter(color => color !== nombreColor);
    setColores(coloresFiltrados);
  };

  return (
    <>
      <section className="sectionForm mx-auto pt-5 pb-2 mb-5 rounded-3 shadow bg-white">
        <h2 className="text-center mb-5">Administrar colores</h2>
        <Form className="mb-5 d-flex flex-column" onSubmit={guardarColor}>
          <Form.Group className="mb-5 formGroup d-flex flex-column gap-3 justify-content-center align-items-center py-5 px-2">
            <div className="bg-danger containerColor border border-2 border-dark"></div>
            <Form.Control
              type="text"
              placeholder="Ingrese un color. Ej: green"
              className="inputColor align-content-start py-3"
              minLength={3}
              maxLength={50}
              onChange={(e) => setColor(e.target.value)}
              value={color}
              required
            />
            <FormLabel>También puede seleccionar un color: </FormLabel>
             <Form.Control
              type="color"
              placeholder="Ingrese un color. Ej: green"
              className="inputColor align-content-start py-3"
              minLength={3}
              maxLength={50}
              onChange={(e) => setColor(e.target.value)}
              value={color}
            />
          </Form.Group>
          <Button
            className="px-5 py-3 shadow btnGuardar border-0 ms-auto me-5 shadow"
            type="submit"
          >
            Guardar
          </Button>
        </Form>
      </section>
      <TarjetasColores colores={colores} borrarColor={borrarColor}/>
    </>
  );
};

export default FormularioPaletaColores;
