import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Card, Container, Row, Col, Button, Overlay, Popover, Badge, NavDropdown } from 'react-bootstrap';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

const generateOptions = (maxValue) => {
  return {
    responsive: true,
    animation: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: maxValue,
      },
      x: {
        ticks: { color: 'black' },
      },
    },
  };
};

const generateData = (label, dataValues) => {
  return {
    labels: meses,
    datasets: [
      {
        label: label,
        data: dataValues,
        backgroundColor: '#e70994',
      },
    ],
  };
};

const BarChart = () => {
    const [selectedOption, setSelectedOption] = useState('Total');
    const [selectedButton, setSelectedButton] = useState('reproducciones');
  
    const handleDropdownSelect = (eventKey) => {
      setSelectedOption(eventKey);
      // Lógica adicional que se ejecuta al seleccionar una opción del menú desplegable
    };
  
    const handleButtonClick = (buttonName) => {
      setSelectedButton(buttonName);
    };
  
    // Inicializando valores de ejemplo de las barras de cada gráfico (reproducciones, valoraciones, comentarios) => backend
    const reproduccionesData = [72, 56, 20, 36, 80, 40, 30, 20, 25, 30, 12, 60];
    const valoracionesData = [50, 80, 45, 70, 30, 65, 90, 75, 20, 40, 60, 85];
    const comentariosData = [15, 30, 10, 25, 40, 20, 35, 50, 45, 60, 30, 10];
    // Crear data para cada gráfico de barra (reproducciones, valoraciones, comentarios) insertando los valores anteriores
    const reproduccionesChart = generateData('Reproducciones', reproduccionesData);
    const valoracionesChart = generateData('Valoraciones', valoracionesData);
    const comentariosChart = generateData('Comentarios', comentariosData);
    // Crear opciones para cada gráfico de barra estableciendo su valor máximo
    const reproduccionesOptions = generateOptions(Math.max(...reproduccionesData));
    const valoracionesOptions = generateOptions(Math.max(...valoracionesData));
    const comentariosOptions = generateOptions(Math.max(...comentariosData));
  
    return (
      <div className="gradient-custom-2" style={{ backgroundColor: '#9de2ff' }}>
        <div className="d-flex align-items-center justify-content-center" style={{paddingTop: "20px"}}>              
          <Card style={{width: "1400px", hight: "200px" }}>
            <Card.Body>
              <Row>
                <Col md={11}>
                  <ButtonGroup>
                  <ToggleButton
                      id="reproducciones"
                      type="radio"
                      variant={selectedButton === 'reproducciones' ? 'primary' : 'outline-primary'}
                      checked={selectedButton === 'reproducciones'}
                      value="reproducciones"
                      onChange={() => handleButtonClick('reproducciones')}
                  >
                      Reproducciones
                  </ToggleButton>
                  <ToggleButton
                      id="valoraciones"
                      type="radio"
                      variant={selectedButton === 'valoraciones' ? 'primary' : 'outline-primary'}
                      checked={selectedButton === 'valoraciones'}
                      value="valoraciones"
                      onChange={() => handleButtonClick('valoraciones')}
                  >
                      Valoraciones
                  </ToggleButton>
                  <ToggleButton
                      id="comentarios"
                      type="radio"
                      variant={selectedButton === 'comentarios' ? 'primary' : 'outline-primary'}
                      checked={selectedButton === 'comentarios'}
                      value="comentarios"
                      onChange={() => handleButtonClick('comentarios')}
                  >
                      Comentarios
                  </ToggleButton>
                  </ButtonGroup>
                </Col>
                <Col md={1}>
                  <NavDropdown title={selectedOption} id="dropdown-basic" onSelect={handleDropdownSelect}>
                  <NavDropdown.Item eventKey="Total">Total</NavDropdown.Item>
                  <NavDropdown.Item eventKey="Año actual">Año actual</NavDropdown.Item>
                  <NavDropdown.Item eventKey="Mes actual">Mes actual</NavDropdown.Item>
                  <NavDropdown.Item eventKey="Semana actual">Semana actual</NavDropdown.Item>
                  </NavDropdown>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
        <div className="d-flex align-items-center justify-content-center" style={{paddingTop: "20px", paddingBottom: "20px" }}>       
          <Card>
            <Card.Body className="d-flex align-items-center justify-content-center" style={{padding: "32px", width: "1000px"}}>
              {selectedButton === 'reproducciones' && <Bar data={reproduccionesChart} options={reproduccionesOptions}/>}
              {selectedButton === 'valoraciones' && <Bar data={valoracionesChart} options={valoracionesOptions} />}
              {selectedButton === 'comentarios' && <Bar data={comentariosChart} options={comentariosOptions} />}
            </Card.Body>
          </Card>
        </div> 
      </div>
    );
  };

export default BarChart;