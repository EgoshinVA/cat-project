import React from 'react'
import styles from './CatCard.module.scss'

type Props = {
  imageUrl: string
  breedName?: string
}

export const CatCard = ({ imageUrl, breedName }: Props) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt="Cat" className={styles.image} />
      {breedName && <p className={styles.breed}>{breedName}</p>}
    </div>
  )
}
