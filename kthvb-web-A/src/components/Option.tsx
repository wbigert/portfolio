import React, { useRef, useState } from 'react'
import styles from './index.module.css'
import { useWindowWidth } from '@/hooks/useWindowWidth'


interface OptionProps {
  value: string
  selected: boolean
  handleClickSelect: (value: any) => void
  icon: any
  title: string
  description: string
}

export default function Option({ value, selected, handleClickSelect, icon: Icon, title, description }: OptionProps) {
  const windowWidth = useWindowWidth()
  const [iconOpacity, setIconOpacity] = useState(1)
  const imgRef = useRef<HTMLDivElement | null>(null);
  const isDesktopView = windowWidth >= 576

  return (
    <div
      className={`shadow rounded p-3 ${selected ? 'border-dark' : 'border-white'} border border-5 border-start-0 border-end-0 border-top-0 d-flex flex-column justify-content-center position-relative ${styles.logoImageContainer}`}
      style={{ cursor: 'pointer', width: '300px', height: '200px' }} // Assuming a fixed width of 200px and height of 300px for the card
      onClick={() => {
        handleClickSelect(value)
      }}
      onMouseOver={() => {
        setIconOpacity(0.4)
      }}
      onMouseOut={() => {
        setIconOpacity(1)
        if (imgRef.current) imgRef.current.style.opacity = '1'
      }}
    >
      <div className={`${styles.option} d-flex flex-column align-items-center justify-content-center`} style={{ opacity: iconOpacity }}>
        <div
          ref={imgRef}
          className='d-flex justify-content-center align-items-center'
          style={{ opacity: isDesktopView ? '1' : '0.4' }}
        >
          <Icon size={50} />
        </div>
        <div className='text-center'>
          <span className='fs-5'>{title}</span>
          <span className='d-block small'>{description}</span>
        </div>
      </div>
    </div>
  )
}
