import { BiChevronDown, BiChevronUp } from "react-icons/bi";

interface CollapseHeaderProps {
  groupTitle: string
  elements: any[]
  setShow: (show: boolean) => void
  show: boolean
  size?: 'sm' | 'lg' | undefined
}

export default function CollapseHeader({ groupTitle, elements, setShow, show, size }: CollapseHeaderProps) {
  function getSize() {
    if (size === 'sm') {
      return 'h4'
    } else if (size === 'lg') {
      return 'h2'
    }
    return 'h3'
  }

  return (
    <div className='d-flex' onClick={() => setShow(!show)} style={{ cursor: 'pointer' }}>
      <div className={`fw-light d-flex ${getSize()}`}>{groupTitle}&nbsp;({elements.length})</div>
      &nbsp;
      <div className='d-flex align-items-center'>
        {show ? <BiChevronUp size={30} /> : <BiChevronDown size={30} />}
      </div>
    </div>
  )
}