import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';


function ProductsAPI() {
    const [products, setProducts] = useState([]);
    const [callback, setCallback] = useState(false);
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [result, setResult] = useState(0);
    const [language, setLanguage] = useState('la');
    
    const { t } = useTranslation();

    useEffect(() => {
    const getProducts = async () => {
        const res = await axios.get(
        `http://localhost:5000/api/products?limit=${
          page * 40
        }&${category}&${sort}&title[regex]=${search}`
        );
        const translatedProducts = res.data.products.map((product) => ({
          ...product,
          title: t(`${product.title}`),
          description: t(`${product.description}`),
        }));
        setProducts(translatedProducts);
        setResult(res.data.result);
    };
    getProducts();
    }, [callback, category, sort, search, page,t]);

    return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
    language: [language, setLanguage],
    };
}

export default ProductsAPI;