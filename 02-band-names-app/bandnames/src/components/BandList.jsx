import React, { useEffect, useState } from 'react'

export const BandList = ({data, voteBand, deleteBand, updateBandName}) => {
    const [bands, setBands] = useState(data)

    useEffect(() => {
        setBands(data)
    }, [data])

    const nameChanged = (event, id) => {
        const newName = event.target.value
        setBands(bands => bands.map(band => {
            if(band.id === id) band.name = newName
            return band
        }
        ))
    }

    const onBlur = (id,name) => {
        updateBandName(id,name)
    }
return(
    <div>
        <table className="table table-stripped">
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Votes</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {bands.map(band => (
                <tr key={band.id}>
                    <td>
                        <button 
                        className="btn btn-primary"
                        onClick={()=> voteBand(band.id)}
                        >+1</button>
                    </td>
                    <td>
                        <input 
                        className="form-control"
                         value={band.name}
                         onChange={(event) => nameChanged(event,band.id)}
                         onBlur={() => updateBandName(band.id,band.name)}
                         />
                    </td>
                    <td>
                        <h3>{band.votes}</h3>
                    </td>
                    <td>
                        <button 
                        className="btn btn-danger"
                        onClick={()=> deleteBand(band.id)}
                        >
                            Delete
                        </button>
                    </td>
                </tr>

                ))}
            </tbody>
        </table>
    </div>
)
}