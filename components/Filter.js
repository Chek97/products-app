import React, { useState } from 'react'
import styles from '../styles/Home.module.css';

export const Filter = ({products, setProducts, setFound, setReload}) => {

    const [filter, setFilter] = useState({
        range: "",
        category: "",
        available: false
    });

    const { range, category, available } = filter;

    const handleFilterChange = (e) => {
        setFilter({
          ...filter,
          [e.target.name]: e.target.value
        });
    }

    const handleFilter = (e) => {
        e.preventDefault();
        if (filter.range === "" || filter.category === "") {
          return;
        } else {
          filter.available = available === "true";
          const newList = products.filter(product => {
            if ((product.price <= filter.range) && product.category === filter.category && product.available === filter.available) {
              return product;
            }
          });
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
        <form className={styles.otherFilter} onSubmit={handleFilter}>
            <h3>Filtrar productos</h3>
            <div className={styles.filterInputs}>
                <input
                    type="number"
                    placeholder='Rango de precio'
                    name='range'
                    onChange={handleFilterChange}
                    value={range}
                />
                <input
                    type="text"
                    placeholder='categoria'
                    name='category'
                    onChange={handleFilterChange}
                    value={category}
                />
                <input
                    type="radio"
                    name='available'
                    value={true}
                    onChange={handleFilterChange}
                />
                <span className={styles.radio}>Disponible</span>
                <input
                    type="radio"
                    name='available'
                    value={false}
                    onChange={handleFilterChange}
                />
                <span className={styles.radio}>No Disponible</span>
            </div>
            <button type='submit'>Filtrar</button>
        </form>
    )
}
