import { useEffect, useState } from "react";
import Humedad from "./Humedad";
import { Url, key_tiempo, url_tiempo } from "../utils/Env";
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";

export default function Consulta(){
    const [ciudades, setCiudades] = useState([])
    const [ciudadElegida, setCiudadElegida] = useState()
    const [ciudadActual, setCiudadActual]=useState("Bogotá")
    const [center, setCenter]=useState({
        lat: 4.6482975,
        lng: -74.107807
    })
    const [humedad, setHumedad]=useState()
    const rutaciudad = Url+"cities"

    // Seleccionar ciudades
    const axiosCiudad = async () => { 
        await axios.get(rutaciudad)
        .then((res)=>{        
            setCiudades(res.data.data);    
        })
        .catch((error)=>{
            console.log(error)
        })
    };

    //Capturar ciudad seleccionada
    const onChange = e=>{          
        setCiudadElegida(e.target.value) 
        updateCenter(e.target.value)              
    }
    

    //Actualizar Center
    const updateCenter=(terminoBusqueda)=>{
        if(terminoBusqueda==="0"){
            const actualCenter={
                lat: 4.6482975,
                lng: -74.107807
            }
            setCenter(actualCenter);
            setCiudadActual("Bogotá")
        }else{           

            const resultadosBusqueda=ciudades?.filter((elemento)=>{                
                if(elemento.id==terminoBusqueda){                
                    return elemento;
                }
            });
            setCiudadActual(resultadosBusqueda[0]?.name)
            const actualCenter={
                lat: resultadosBusqueda[0]?.lat,
                lng: resultadosBusqueda[0]?.lon
            }            
            setCenter(actualCenter);
        }
        
    }

    //Obtener humedad de la ciudad elegida
    const ciudadConsulta = async() =>{   
        
        const rutahumedad=url_tiempo+"?lat="+center.lat+"&lon="+center.lng+"&appid="+key_tiempo 

        await axios.get(rutahumedad)
            .then((res)=>{        
                setHumedad(res.data.main.humidity); 
                guardaHumedad(res.data)
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    // Guardar el registro en la base de datos
    const guardaHumedad = async(info)=>{

        const rutag = Url+"wetness"
        const dataCharged={
            "name"  :info.name,
            "lat"   :info.coord.lat,
            "lon"   :info.coord.lon,
            "wetness":info.main.humidity
        }

        await axios.post(rutag,dataCharged)
            .then((res)=>{      
                Swal.fire({
                    title: 'Se ha guardado correctamente el registro',
                    timer: 1000
                })
            })
            .catch((error)=>{
                console.log(error)
            })


    }

    useEffect(()=>{
        axiosCiudad();
    }, [])

    useEffect(()=>{
        ciudadConsulta()
    }, [center])

    

    if(ciudades)    
    return(
        <>
            <div className='row'>
                <div className="container text-center alert alert-primary col-sm-9 mt-4" role="alert">
                    <Humedad center={center}/>
                </div>
                <div className="container text-center alert alert-info col-sm-3 mt-4" role="alert">
                    <div className="card text-center mt-2">
                        <div className="card-header text-bg-success">
                            Seleccione Ciudad
                        </div>
                        <div className="card-body">
                            <select value={ciudadElegida} className="form-select" onChange={onChange} >
                                <option value="0"></option>
                                {ciudades.map((ciudad)=>(                                        
                                    <option value={ciudad.id} key={ciudad.id}>{ciudad.name}</option>                                     
                                ))}
                            </select>                            
                        </div>
                    </div>
                    <div className="card text-center mt-4">
                        <div className="card-header">
                            <h1>Ciudad: {ciudadActual}</h1>                            
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">Húmedad registrada en la Ciudad: </h5>  
                            <h1><span className="badge bg-success">{humedad}</span></h1>
                            
                        </div>
                    </div>
                    <NavLink to="/reporte"><button type="button" className="btn btn-info mt-5">Ver Reportes</button></NavLink> 
                </div>
            </div>
        </>
    )
}