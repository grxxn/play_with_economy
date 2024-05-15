import Image from "next/image";
import styles from "./card.module.scss";
import learnCardImg from "../../../public/assets/images/learn1.jpg";
import Link from "next/link";

/**
 * 학습 카드 컴포넌트
 * 
 * @author yjjeon
 * @returns 
 */
export default function LearnCard() {

  return (
    <Link className={styles.cardContainer} href={'/learn/1'}>
      <div className={styles.imgBox}>
        <Image src={learnCardImg} alt="썸네일 이미지" />
      </div>
      <h3>금리란 무엇일까요?</h3>
      <p>금리에 대한 기본상식부터 알아보자!</p>
      <p>2024.05.15</p>
    </Link>
  )
}