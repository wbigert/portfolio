import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs'
import { useTranslation } from 'react-i18next'
import { CSSProperties, useEffect, useState } from 'react'
import { AppData } from '@/models/AppData'
interface FooterProps {
  appData: AppData
}

export default function Footer({ appData }: FooterProps): JSX.Element {
  const { t, i18n } = useTranslation()

  return (
    <div className='container-fluid p-4 bg-dark text-white'>
      <div className='col-12 d-flex justify-content-center'>
        <hr className='col-9 opacity-25' style={{ height: 1 }} />
      </div>
      <div className='col d-flex justify-content-center gap-3 mt-2'>
        <a className='text-muted mx-1' href='https://www.facebook.com/KTHVolleyball'><BsFacebook size={38} /></a>
        <a className='text-muted mx-1' href='https://www.instagram.com/kthvolleyball/'><BsInstagram size={38} /></a>
        <a className='text-muted mx-1' href='https://www.youtube.com/@kthvolleyball909'><BsYoutube size={38} /></a>
      </div>
    </div>
  )
}
