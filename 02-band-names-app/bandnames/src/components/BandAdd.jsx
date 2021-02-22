import React, { useState } from 'react'

export const BandAdd = ({createBand}) => {
    const [name, setName] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(name.trim().length > 0){
            createBand(name)
            setName('')
        }
    }
    return(
        <div>
            <h3> Add band</h3>

            <form onSubmit={onSubmit}>
                <input 
                className="form-control"
                placeholder="Band name"
                value={name}
                onChange={ (e) => setName(e.target.value)}
                />
            </form>
        </div>
    )
}