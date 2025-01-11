import {useState, useEffect} from 'react'
import axios from 'axios'

function BandAPI() {
    const [bands, setBands] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getCategories = async () =>{
            const res = await axios.get('http://localhost:5000/api/band')
            setBands(res.data)
        }
        getCategories()
    },[callback])
    return {
        bands: [bands, setBands],
        callback: [callback, setCallback]
    }
}

export default BandAPI