import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import { Filter, Search } from '../components';

export default function Home() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState(false);
  const [reload, setReload] = useState(false);

  const router = useRouter();

  const handleClick = (id) => {
    router.push(`/detail/${id}`);
  }

  const Return = () => {

    const handleClick = () => {
      getInfo();
      setFound(false);
      setReload(false);
    }

    return (
      <button onClick={handleClick} className={styles.buttonReturn}>Volver</button>
    )
  }


  const NotFoundProducts = () => {
    return (
      <div className={styles.returnContainer}>
        <p>No hay productos</p>
        <Return />
      </div>
    )
  }

  const getInfo = async () => {
    try {
      const response = await fetch("/api/hello");
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {

    getInfo();
  }, []);

  useEffect(() => {
    const getUser = () => {
      const resp = JSON.parse(localStorage.getItem("user"));
      if (resp === null) {
        router.push("/login");
      }
    }
    getUser();
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Productos App</h1>
      </header>
      <Search
        products={products}
        setProducts={setProducts}
        setFound={setFound}
        setReload={setReload}
      />
      <Filter
        products={products}
        setProducts={setProducts}
        setFound={setFound}
        setReload={setReload}
      />
      <h2 className={styles.title}>Lista de Productos</h2>
      {loading
        ?
        (<p>Espere....</p>)
        :
        found
          ?
          (<NotFoundProducts />)
          :
          (
            <div className={styles.content}>
              {reload && (<Return />)}
              <ul className={styles.listProducts}>
                {products.map((product) => (
                  <li key={product.id} className={styles.card}>
                    <Image src={product.image} width={250} height={250} alt={product.name} className={styles.cardImage} />
                    <h2>{product.name}</h2>
                    <div className={styles.cardText}>
                      <p>Categoria <span>{product.category}</span></p>
                      <p>Precio <span>{product.price}</span></p>
                      <p>Disponible <span>{product.available ? "Si" : "no"}</span></p>
                    </div>
                    <button onClick={() => handleClick(product.id)}>Ver Mas...</button>
                  </li>
                ))}
              </ul>
            </div>
          )
      }
    </div>
  )
}
