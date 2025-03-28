import { uploadImage } from '@/requests/api'
import { useEffect, useRef, useState } from 'react'
import { Button, FloatingLabel, Form, FormControl, Modal } from 'react-bootstrap'
import { Trans, useTranslation } from 'react-i18next'
import { AppData } from '@/models/AppData.js'
import { ModalManager } from '@/models/Modal.js'
import { BoardPosition, Permission, User, VolleyballRole } from '@/models/User.js'
import { UserModalData } from '@/models/UserModal.js'
import { AddedImage } from './AddedImage'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa'
interface EditUserProps {
  modal: ModalManager,
  data: UserModalData,
  appData: AppData,
  handleSubmit: (formData: User) => void
}

export default function EditUser({ modal, data, appData, handleSubmit }: EditUserProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const frontImageRefs = useRef([])
  const frontIconRefs = useRef([])
  const addFrontImageRef = useRef<HTMLInputElement>(null)
  const imageRefs = useRef([])
  const iconRefs = useRef([])
  const startUser = {
    id: '',
    firstName: '',
    lastName: '',
    info: {
      boardPosition: BoardPosition.None,
      email: '',
      preferredRoles: [],
      biography: '',
      picture: '',
      permissions: [],
      joinDate: new Date(),
    },
    tokens: []
  }

  const [formData, setFormData] = useState<User>(startUser);
  const user = data.user;

  useEffect(() => {
    if (user) {
      const info = user.info || startUser.info;
      const newFormData: User = {
        id: user.id,
        firstName: user.firstName || startUser.firstName,
        lastName: user.lastName || startUser.lastName,
        info: {
          boardPosition: info.boardPosition || startUser.info.boardPosition,
          email: info.email || startUser.info.email,
          preferredRoles: info.preferredRoles || startUser.info.preferredRoles,
          picture: info.picture || startUser.info.picture,
          permissions: info.permissions || startUser.info.permissions,
          joinDate: info.joinDate || startUser.info.joinDate,
        },
        tokens: user.tokens || [],
      };
      setFormData(newFormData);
    }
  }, [data.user]);

  function handleDeleteFrontPicture() {
    setFormData({ ...formData, info: { ...formData.info, picture: '' } });
  }

  async function handleChange(e: React.ChangeEvent<HTMLElement>) {
    if (e.target instanceof HTMLInputElement) {
      if (e.target.name === 'picture' && e.target.files !== null && e.target.files.length > 0) {
        await uploadImage(e.target.files[0]).then(url => {
          setFormData({ ...formData, info: { ...formData.info, picture: url } })
        })
        if (addFrontImageRef.current) {
          addFrontImageRef.current.value = ''
        }
      } else {
        const { name, value } = e.target;
        if (Object.keys(formData.info).includes(name)) {
          setFormData({ ...formData, info: { ...formData.info, [name]: value } });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      }
    } else if (e.target instanceof HTMLTextAreaElement) {
      const { name, value } = e.target;
      if (Object.keys(formData.info).includes(name)) {
        setFormData({ ...formData, info: { ...formData.info, [name]: value } });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else if (e.target instanceof HTMLSelectElement) {
      const { name, value } = e.target;
      if (name === 'role') {
        setFormData({ ...formData, info: { ...formData.info, boardPosition: value as BoardPosition } });
      } else {
        setFormData({ ...formData, [name]: parseInt(value, 10) });
      }
    }
  }

  function checkboxChangeAction(value: string, check: boolean, array: string[]) {
    if (check) {
      array.push(value);
    } else {
      const index = array.indexOf(value);
      if (index > -1) {
        array.splice(index, 1);
      }
    }
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.name === 'permissions' || e.target.name === 'preferredRoles') {
      const { value, checked } = e.target;
      const newArr = [...formData.info[e.target.name]];

      checkboxChangeAction(value, checked, newArr);
      setFormData({ ...formData, info: { ...formData.info, [e.target.name]: newArr } });
    }
  }

  function isAdmin(): boolean {
    if (!appData.userDetails) return false;
    return appData.userDetails.permissions.includes(Permission.Admin);
  }

  if (!formData) {
    return (
      <Modal show={modal.isModalVisible(data.name, data.id)} onHide={() => modal.off(data.name, data.id)} size='xl'>
        <Modal.Header closeButton className='py-2 text-gray-700'>
          <Modal.Title>Loading...</Modal.Title>
        </Modal.Header>
      </Modal>
    );
  }

  return (
    <Modal
      show={modal.isModalVisible(data.name, data.id)}
      onHide={() => modal.off(data.name, data.id)}
      size="lg"
      fullscreen="xxl-down"
      backdrop='static'
    >
      <Modal.Header closeButton className='py-2'>
        <Modal.Title>{user.id ? t('editUser.label.editing') + ': ' + user.firstName + ' ' + user.lastName : t('editUser.label.creating')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3 fs-4 fw-light' controlId='formFileMultiple'>
            <Form.Label>{t(`editUser.label.changePicture`)}</Form.Label>
            <Form.Control ref={addFrontImageRef} type='file' name='picture' onChange={(e) => handleChange(e)} />
            <div className='d-flex my-3 justify-content-center'>
              {formData.info.picture && <AddedImage isFrontPicture picture={formData.info.picture} index={0} handleDeleteImage={handleDeleteFrontPicture} imageRefs={frontImageRefs} iconRefs={frontIconRefs} />}
            </div>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formFirstName'>
            <FloatingLabel label={t('editUser.label.firstName')}>
              <Form.Control type='text' placeholder={t('editUser.label.firstName')} name='firstName' value={formData.firstName} onChange={(e) => handleChange(e)} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formLastName'>
            <FloatingLabel label={t('editUser.label.lastName')}>
              <Form.Control type='text' placeholder={t('editUser.label.lastName')} name='lastName' value={formData.lastName} onChange={(e) => handleChange(e)} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formEmail'>
            <FloatingLabel label={t('editUser.label.email')}>
              <Form.Control type='email' placeholder={t('editUser.label.email')} name='email' value={formData.info.email} onChange={(e) => handleChange(e)} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPhone'>
            <FloatingLabel label={t('editUser.label.phone')}>
              <Form.Control type='text' placeholder={t('editUser.label.phone')} name='phone' value={formData.info.phone} onChange={(e) => handleChange(e)} />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formJoinDate'>
            <Form.Label>{t('editUser.label.joinDate')}</Form.Label>
            <div className='d-flex align-items-center w-100'>
              <DatePicker
                className='w-100 p-1'
                selected={formData.info.joinDate}
                onChange={(date) => date && setFormData({ ...formData, info: { ...formData.info, joinDate: date } })}
                dateFormat="MM/yyyy"
                showMonthYearPicker

              />
            </div>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formPreferredRoles'>
            <Form.Label>{t('editUser.label.preferredRoles')}</Form.Label>
            {Object.entries(VolleyballRole).map(([key, value]) => (
              <Form.Check
                key={key}
                type='checkbox'
                name='preferredRoles'
                value={value}
                label={t(`${value}`)}
                checked={formData.info.preferredRoles.includes(value)}
                onChange={(e) => handleCheckboxChange(e)}
              />
            ))}
          </Form.Group>
          {isAdmin() && (
            <div>
              <div className='fs-4 fw-light'>
                <span className='fs-4 fw-light'>{t('editUser.label.admin')}</span>
              </div>
              <Form.Group className='mb-3' controlId='formBoardPosition'>
                <FloatingLabel controlId='floatingRoleSelect' label={t('editUser.label.boardPosition')}>
                  <Form.Control as='select' name='role' value={formData.info.boardPosition} onChange={(e) => handleChange(e)}>
                    {Object.entries(BoardPosition).map(([key, value]) => (
                      <option key={key} value={value}>{t(`${value}`)}</option>
                    ))}
                  </Form.Control>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className='mb-3' controlId='formPermissions'>
                <Form.Label>{t('editUser.label.permissions')}</Form.Label>
                {Object.entries(Permission).map(([key, value]) => (
                  <Form.Check
                    key={key}
                    type='checkbox'
                    name='permissions'
                    value={value}
                    label={t(`${value}`)}
                    checked={formData.info.permissions.includes(value)}
                    onChange={(e) => handleCheckboxChange(e)}
                  />
                ))}
              </Form.Group>
            </div>
          )}
          <div className='mt-3 d-flex justify-content-end'>
            <Button onClick={() => handleSubmit(formData)}>{data.user ? t('editUser.edit.submit') : t('editUser.create.submit')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
