import React, { useState } from 'react'
import { useSocket } from '../hooks/useSocket';

export const BandAdd = () => {
    const [name, setName] = useState('');
    const {socket} = useSocket('http://localhost:8080/')

    const onSubmit = (e) => {
        e.preventDefault()

        if(name.trim().length > 0){
            socket.emit('create-band', { name });
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