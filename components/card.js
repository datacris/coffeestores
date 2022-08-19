import Link from "next/link";
import Image from "next/image";
import styles from "./card.module.css";
import cls from "classnames";

const Card = (props) => {
  return (
    <Link href={props.href}>
      {/* <a className={`glass ${styles.cardLink}`}> */}
      <a className={styles.cardLink}>
        <div className={`glass ${styles.container}`}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{props.name}</h2>
          </div>
          <div className={styles.cardHeaderWrapper}>
            <Image
              className={styles.cardImage}
              src={props.imgUrl}
              width={260}
              height={160}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};
export default Card;
