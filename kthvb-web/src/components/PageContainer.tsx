
interface PageContainerProps {
  title: string
  intro?: string
  children: React.ReactNode
}

export default function PageContainer({ children, title, intro }: PageContainerProps) {

  return (
    <div className='container-fluid mb-5' id='hanging-icons'>
      <div className='row row-cols-1 justify-content-center'>
        <div className='mb-5 mt-3 col-11 col-md-9 d-flex flex-column gap-3'>
          <div>
            <div className='fw-bold pt-2 fs-1'>{title}</div>
            {intro && <div className={`fs-5`}>{intro}</div>}
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}