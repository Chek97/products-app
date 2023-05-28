import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../../styles/detail.module.css';

const detail = () => {

  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  const handleReturn = () => {
    router.push("/");
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const request = await fetch(`/api/product/${id}`);
        const data = await request.json();
        setProduct(data.product[0]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
    if (id !== undefined) {
      getData();
    }
  }, [id]);

  useEffect(() => {
    const getUser = () => {
      const resp = JSON.parse(localStorage.getItem("user"));
      if(resp === null){
        router.push("/login");
      }
    }
    getUser();
  }, []);

  return (
    <div className={styles.container}>
      <button className={styles.return} onClick={handleReturn}>Regresar</button>
      <header className={styles.header}>
        <h1>DETALLE DEL PRODUCTO</h1>
      </header>
      {
        loading
          ?
          (<p>Espere....</p>)
          :
          (<div className={styles.grid}>
            <div className={styles.imagesContainer}>
              <Image src={product.image} width={400} height={350} alt="" />
              <div>
                <Image src={product.additional.image1} width={133} height={150} alt="" />
                <Image src={product.additional.image2} width={133} height={150} alt="" />
                <Image src={product.additional.image3} width={133} height={150} alt="" />
              </div>
            </div>
            <div className={styles.infoContainer}>
              <h3>Nombre del producto: {product.name}</h3>
              <div className={styles.info}>
                <p>{product.description}</p>
                <p><strong>Categoria:</strong> {product.category}</p>
                <p><strong>Precio:</strong> {product.price}</p>
                <p><strong>Disponibilidad:</strong> {product.available ? "Disponible" : "No Disponible"}</p>
              </div>
              <h3>Caracteristicas del producto</h3>
              <ul>
                {
                  product.characteristics.lenght === 0
                  ? (<p>No hay caracteristicas</p> )
                  :
                product.characteristics.map(c => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <h3>Reseñas</h3>
              <ul className={styles.detailList}>
                {
                  product.reviews.lenght  === 0
                  ? ( <p>No hay reseñas </p>)
                  :
                  product.reviews.map(r => (
                  <li key={r.user} className={styles.detailCard}>
                    <h6>{r.user}</h6>
                    <p>{r.description}</p>
                    <small>{r.date}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          )}
    </div>
  )
}

export default detail