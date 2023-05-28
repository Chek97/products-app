import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

export const Search = ({products, setFound, setProducts, setReload}) => {

    const [search, setSearch] = useState('');

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (search !== "") {
          const newList = products.filter(product => product.name.includes(search));
          if (newList.length === 0) {
            setFound(true);
            setProducts(newList);
          } else {
            setReload(true);
            setProducts(newList);
          }
        }
    }

  return (
    <form onSubmit={handleSearch} className={styles.filterContainer}>
        <input
          type="search"
          placeholder='Busca tu producto'
          name='search'
          onChange={handleChange}
          value={search}
        />
        <button type='submit'>Buscar</button>
    </form>
  )
}
