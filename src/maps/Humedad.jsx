import React, { memo } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Api_key } from '../utils/Env';

const containerStyle = {
    width: 'auto',
    height: '400px'
};

function Humedad({center}) {
    return (
        <>
            
            <div className='row'>
                <div className="container text-center alert alert-primary col-sm-8 mt-4" role="alert">
                    <LoadScript
                        googleMapsApiKey={Api_key}
                    >
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={center}
                            zoom={11}
                        >
                            { /* Child components, such as markers, info windows, etc. */ }
                            <></>
                        </GoogleMap>
                    </LoadScript>
                </div>                
            </div>
        </>
        
    )
}

export default memo(Humedad)
