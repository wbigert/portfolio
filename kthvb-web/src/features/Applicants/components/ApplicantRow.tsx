
import { useContext, useState, useEffect, useMemo } from 'react'
import styles from '../index.module.css'
import { HandleInstructionsContext, HandleModalsContext } from '@/context'

interface ApplicantRowProps {
  appData: AppData
  index: number
  applicant: Applicant
  headersMap: { [key: string]: string },
  ignoreTeam?: boolean
}

const tightHeaders = ['THSMember', 'studyAtKTH']
const semiTightHeaders = ['email']

import { Dropdown, Form } from 'react-bootstrap';
import { AppData } from '@/models/AppData'
import { TryoutDay } from '@/models/TryoutDays'
import Select from 'react-select'
export default function ApplicantRow({ appData, index, applicant, headersMap, ignoreTeam }: ApplicantRowProps) {
  const handleModals = useContext(HandleModalsContext);
  const handleInstructions = useContext(HandleInstructionsContext);
  const [applicantTryoutDay, setApplicantTryoutDay] = useState<TryoutDay | undefined>(undefined);
  const [applicantShirtNumber, setApplicantShirtNumber] = useState<number>(0);
  const [options, setOptions] = useState<{ 'value': string, 'label': string }[]>([]);

  useEffect(() => {
    const tryoutDay = appData.settings?.tryoutDays.find((tryoutDay) => tryoutDay.applicants.includes(applicant.id))
    setApplicantTryoutDay(tryoutDay)
    setApplicantShirtNumber(applicant.tryouts_shirt_number || 0)
  }, [appData.settings?.tryoutDays, applicant.id])

  function handleClickOpen() {
    handleModals.on({
      name: 'ApplicantModal',
      id: 'ApplicantModal',
      applicantId: applicant.id,
      mode: 'view'
    });
  }

  function handleSwitchChange(e: any) {
    // Your function call here to handle switch toggle
    e.stopPropagation();
    handleInstructions('updateApplicant', { applicant: { id: applicant.id, paid_deposit: e.target.checked ? 'Has paid' : 'Not paid' } })
  }

  useEffect(() => {
    let options = appData.settings?.tryoutDays.map((tryoutDay) => {
      return { 'value': tryoutDay.name, 'label': tryoutDay.name }
    }) || [];
    options.push({ 'value': 'None', 'label': 'None' });
    setOptions(options);
  }, [appData.settings?.tryoutDays, applicantTryoutDay])

  async function changeShirtNumber(e: any) {
    const value = parseInt(e.target.value);
    setApplicantShirtNumber(value);
    await handleInstructions('updateApplicant', { applicant: { id: applicant.id, tryouts_shirt_number: value } })
  }

  function handleTryoutDayChange(selectedValue: any) {
    if (appData.settings && appData.settings.tryoutDays) {

      const { settings } = appData;
      const { tryoutDays } = settings || {};

      if (!tryoutDays) return;

      // Find the tryout day the applicant is currently in, if any.
      const currentTryoutDay = tryoutDays.find(day => day.applicants.includes(applicant.id));

      // Find the tryout day the applicant will be moved to.
      const newTryoutDay = tryoutDays.find(day => day.name === selectedValue);

      // Filter out the tryout days the applicant is moving to and from.
      const unaffectedTryoutDays = tryoutDays.filter(
        day => ![currentTryoutDay?.name, newTryoutDay?.name].includes(day.name)
      );

      // Update the applicants list for the tryout day the applicant is moving from.
      const updatedCurrentDay = currentTryoutDay
        ? { ...currentTryoutDay, applicants: currentTryoutDay.applicants.filter(id => id !== applicant.id) }
        : null;

      // Update the applicants list for the tryout day the applicant is moving to.
      const updatedNewDay = newTryoutDay
        ? { ...newTryoutDay, applicants: [...newTryoutDay.applicants, applicant.id] }
        : null;

      // Combine the updated and unaffected tryout days to get the new list.
      const updatedTryoutDays = [
        ...unaffectedTryoutDays,
        ...(updatedCurrentDay ? [updatedCurrentDay] : []),
        ...(updatedNewDay ? [updatedNewDay] : [])
      ];

      // Update the app data settings.
      handleInstructions('updateSettings', {
        settings: {
          ...settings,
          tryoutDays: updatedTryoutDays,
        },
      });
    }
  }

  return (
    <tr key={index} className={styles.applicantTableRow} onClick={() => handleClickOpen()}>
      {Object.keys(headersMap).filter((header) => !(ignoreTeam && headersMap[header] === 'Team')).map((header, idx) => {
        const width = tightHeaders.includes(header) ? '40px' : semiTightHeaders.includes(header) ? '200px' : '100%';

        if (header === "paid_deposit") {
          return (
            <td key={idx} style={{ maxWidth: width }}>
              <div style={{ zIndex: 1000 }} onClick={
                (e) => {
                  e.stopPropagation();
                }
              }>
                <Form.Check
                  type="switch"
                  id={`switch-${applicant.id}`}
                  checked={applicant[header] === 'Has paid'}
                  onChange={handleSwitchChange}
                />
              </div>
            </td>
          );
        } else {
          return (
            <td key={idx} className='text-truncate' style={{ maxWidth: width }}>
              {applicant[header] === undefined ? '...' : applicant[header].toString()}
            </td>
          )
        }
      })}
      <td onClick={(e) => e.stopPropagation()}>
        <div>
          <select
            onChange={(e) => handleTryoutDayChange(e.target.value)}
            value={applicantTryoutDay ? applicantTryoutDay.name : ''}
          >
            <option value="" disabled>Select an option</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </td>
      <td className='d-flex align-items-center'>
        <div onClick={(e) => e.stopPropagation()}>
          <input style={{ width: '70px' }} value={applicantShirtNumber} onChange={(e) => changeShirtNumber(e)} />
        </div>
      </td>
    </tr>
  );
}
