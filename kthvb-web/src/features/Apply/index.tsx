import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { AppData } from "@/models/AppData";
import { ModalManager } from "@/models/Modal";

export interface ApplyProps {
  appData: AppData
  handleModals: ModalManager
}

export default function Apply({ appData, handleModals }: ApplyProps) {
  const { t } = useTranslation()

  const [form, setForm] = useState({ status: appData.settings?.formStatus, url: appData.settings?.formUrl });

  useEffect(() => {
    console.log('appData', appData);

    setForm({ status: appData.settings?.formStatus, url: appData.settings?.formUrl });
  }, [appData]);

  if (form.status === 'closed') {
    return (
      <div className='container-fluid mb-5' id='hanging-icons'>
        <div className='row row-cols-1 justify-content-center'>
          <div className='mb-5 mt-3 col-11 col-md-9 d-flex flex-column gap-3'>
            <div className='fw-bold pt-2 fs-1'>{t('apply.formClosed')}</div>
            <div className={`fs-5`}>{t('apply.formClosed')}</div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center text-start vh-100 mt-4">
        <div className="vh-100 w-100 rounded overflow-hidden">
          {form.url && <iframe src={form.url} title="Embedded Iframe" width="100%" height="100%" style={{ border: 'none' }}></iframe>}
        </div>
      </div>
    )
  }
}
