import { Button } from "react-bootstrap"
import { BsFillEyeFill, BsPencil, BsTrash } from "react-icons/bs"

interface ToolsProps {
  id: string,
  handleClickDelete: (id: string) => void
  handleClickEdit: (id: string) => void
  handleClickView: (id: string) => void
  optionsRef?: React.RefObject<HTMLDivElement>
  opacity: number
  inline?: boolean
  toolsToShow: {
    edit: boolean
    delete: boolean
    view: boolean
  }
}

export function Tools({ id, handleClickDelete, handleClickEdit, handleClickView, optionsRef, opacity, inline, toolsToShow }: ToolsProps) {
  const style: React.CSSProperties = {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 100,
    opacity: opacity,
    transition: '0.1s'
  }

  const styleInline: React.CSSProperties = {
    position: 'relative',
  }


  return (
    <div ref={optionsRef} style={inline ? styleInline : style} className='d-flex gap-2' >
      {toolsToShow.view &&
        <Button
          className='p-2 kth-bg' variant='primary' size='lg'
          onClick={(e) => {
            e.stopPropagation()
            handleClickView(id)
          }}
        >
          <BsFillEyeFill className='d-block' size={17} />
        </Button>
      }
      {toolsToShow.edit &&
        <Button
          className='p-2 kth-bg' variant='primary' size='lg'
          onClick={(e) => {
            e.stopPropagation()
            handleClickEdit(id)
          }}
        >
          <BsPencil className='d-block' size={17} />
        </Button>
      }
      {toolsToShow.delete &&
        <Button
          className='p-2' variant='danger' size='lg' onClick={(e) => {
            e.stopPropagation()
            handleClickDelete(id)
          }}
        >
          <BsTrash className='d-block' size={17} />
        </Button>
      }
    </div>
  )
}