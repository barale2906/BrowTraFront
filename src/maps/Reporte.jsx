import { useEffect, useState } from "react";
import Paginacion from "../utils/Paginacion";
import axios from "axios";
import { Url } from "../utils/Env";

export default function Reporte() {
    const [humedades, setHumedades]=useState([])

    //parámetros de paginación 
    const [itemsPerPage, setItemsPerPage]=useState(15);
    const [currentPage, setCurrentPage]=useState(1);
    const totalItems = humedades?.length; //Total de registros a paginar
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex-itemsPerPage;


    // Carga Humedades
    const axiosHumedades=async()=>{
        const ruta = Url+"wetness"
        await axios.get(ruta)
        .then((res)=>{
            setHumedades(res.data.data)
        })

        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=>{
        axiosHumedades()
    },[])

    if(humedades)
    return(
        <>
            <div className="row">
                <div className="container text-center alert alert-primary col-sm-10 mt-4" role="alert">
                    <h5>A continuación encuentra el historial de consultas</h5>
                </div>
                <div className="container text-center alert alert-success col-sm-2 mt-4" role="alert">
                    <a className="btn btn-success" href="/" role="button">Volver</a>
                </div>
            </div>
            
            <Paginacion 
                itemsPerPage={itemsPerPage} 
                setItemsPerPage={setItemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={totalItems}
            />
            <table className="table table-success table-hover table-bordered table-responsive table-striped">
                <thead>
                    <tr>
                        <th scope="col">CIUDAD</th>
                        <th scope="col">LATITUD</th>
                        <th scope="col">LONGITUD</th>
                        <th scope="col">HÚMEDAD</th>
                    </tr>
                </thead>
                <tbody>
                    {humedades.map((humedad, index)=>(                                        
                        <tr key={humedad.id}>
                            <td>{humedad.name}</td>
                            <td>{humedad.lat}</td>
                            <td>{humedad.lon}</td>
                            <td>{humedad.wetness}</td>                            
                        </tr>                                        
                    )).slice(firstIndex,lastIndex)}
                </tbody>
            </table>
        </>
    )
}