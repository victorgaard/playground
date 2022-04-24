import Image from "next/image";
import styles from "../styles/Card.module.css";

function Card() {
  return (
    <div className={styles.card}>
      <div className={styles.cardInfo}>
        <div className={styles.cardInfoInner}>
          <p>Name</p>
          <h1>Carla Rosser</h1>
        </div>
        <div className={styles.cardInfoInner}>
          <h3>4006 0045 7804 2093</h3>
          <p>08/23</p>
        </div>
      </div>
      <div className={styles.cardBrand}>
        <Image src="/visa.svg" width={55} height={18} />
      </div>
    </div>
  );
}

export default Card;
