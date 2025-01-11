import {useState, useEffect} from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next';

function CategoriesAPI() {
    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)
    const [language, setLanguage] = useState('la');
    const { t } = useTranslation();

    useEffect(() =>{
        const getCategories = async () =>{
            const res = await axios.get('http://localhost:5000/api/category')
            const cateTitleTranslation = res.data.map((cate) => ({
                ...cate,
                // name: t(`categoryTitles.${cate._id}`),
              }));
            setCategories(cateTitleTranslation)
        }
        getCategories()
    },[callback,t])
    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback],
        language: [language, setLanguage]
    }
}

export default CategoriesAPI