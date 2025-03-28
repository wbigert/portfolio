import styles from '../index.module.css'

interface DecideOptionProps {
  icon?: JSX.Element
  text: string
  onClick: () => void
  fullWidth?: boolean
}

export default function DecideOption({ icon, text, onClick, fullWidth }: DecideOptionProps) {
  return (
    <div className={`${fullWidth ? 'col-12' : 'col-6'} ${styles.decideOption}`}>
      <div
        className="d-flex justify-content-center align-items-center kth-bg text-white rounded overflow-auto"
        style={{
          height: '200px',  // Adjust this value to fit your needs 
        }}
        onClick={onClick}
      >
        <div className='d-flex justify-content-center align-items-center flex-column text-center'>
          {icon}
          {text}
        </div>
      </div>
    </div>
  )
}
