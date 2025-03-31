import { InstructionArgs, InstructionData } from '@/models/Instruction'
import { assertDefined } from './assertDefined';
import { setLoggedIn, setLoggedOut } from '@/requests/auth';
import { LoginResponse } from '@/models/Login';
import { loginUser, requestPasswordReset, resetPassword, fetchApplicants, fetchSettings, updateSettings, fetchUsers, updateApplicant, deleteApplicant, createUser, updateUser, deleteUser } from '@/requests/api';
import { Settings } from '@/models/Settings';
import { User } from '@/models/User';
import { Exception } from 'sass';


export default async function instructionSwitchboard(args: InstructionArgs, instruction: string, data: InstructionData): Promise<any> {

  switch (instruction) {
    case 'loginUser': {
      throw new Error('No API calls in tech demo!')
      // const email = assertDefined(data.email, instruction, 'data.email');
      // const password = assertDefined(data.password, instruction, 'data.password');
      // const response: LoginResponse = await loginUser(email, password)
      // setLoggedIn(response)
      // args.navigateTo('/')
      // args.setAppData({ ...args.appData, loggedIn: true, didFetchCollections: false, userDetails: response })
      break
    }
    case 'logoutUser': {
      setLoggedOut()
      args.setAppData({ ...args.appData, loggedIn: false, didFetchCollections: false, userDetails: null })
      args.navigateTo('/')
      break
    }
    case 'fetchSettings': {
      throw new Error('No API calls in tech demo!')
      // const result = await fetchSettings()
      // if (data.delayUpdate) return result
      // args.setAppData({ ...args.appData, settings: result })
      break
    }
    case 'fetchUsers': {
      throw new Error('No API calls in tech demo!')
      // const tryout_id = localStorage.getItem('loggedIn') === 'true' ? undefined : args.appData.tryout_id;
      // const result = await fetchUsers(tryout_id)
      // if (data.delayUpdate) return result
      // args.setAppData({ ...args.appData, users: result })
      break
    }
    case 'createUser': {
      throw new Error('No API calls in tech demo!')
      // const user = assertDefined(data.user, instruction, 'data.user');
      // await createUser(user)
      // const newUsers = [...(args.appData.users || []), user]
      // if (data.delayUpdate) return newUsers
      // args.setAppData({ ...args.appData, users: newUsers })
      break
    }
    case 'deleteUser': {
      throw new Error('No API calls in tech demo!')
      // const toDeleteId = assertDefined(data.toDeleteId, instruction, 'data.toDeleteId');
      // await deleteUser(toDeleteId)
      // args.setAppData({ ...args.appData, users: [...(args.appData.users || []).filter(u => u.id !== toDeleteId)] })
      break
    }
    case 'updateUser': {
      throw new Error('No API calls in tech demo!')
      // const user = assertDefined(data.user, instruction, 'data.user');
      // await updateUser(user)
      // console.log("passed");

      // const newUsers = [...(args.appData.users || []).filter(u => u.id !== user.id), user]
      // if (data.delayUpdate) return newUsers
      // console.log("passed 2", newUsers);

      // args.setAppData({ ...args.appData, users: newUsers })
      break
    }
    case 'fetchApplicants': {
      throw new Error('No API calls in tech demo!')
      // const tryout_id = localStorage.getItem('loggedIn') === 'true' ? undefined : args.appData.tryout_id;
      // const result = await fetchApplicants(tryout_id)
      // if (data.delayUpdate) return result
      // args.setAppData({ ...args.appData, applicants: result })
      break
    }
    case 'updateApplicant': {
      throw new Error('No API calls in tech demo!')
      // const tryout_id = localStorage.getItem('loggedIn') === 'true' ? undefined : args.appData.tryout_id;
      // const applicant = assertDefined(data.applicant, instruction, 'data.applicant');
      // const updatedApplicant = await updateApplicant(applicant, tryout_id);
      // const applicantsArray = args.appData.applicants || [];
      // const oldApplicantIndex = applicantsArray.findIndex(a => a.id === applicant.id);

      // if (oldApplicantIndex === -1) {
      //   console.log("Applicant not found in array");
      //   break;
      // }
      // const newApplicants = [...applicantsArray];
      // newApplicants[oldApplicantIndex] = {...applicantsArray[oldApplicantIndex], ...updatedApplicant};
      
      // console.log("returning with: ", newApplicants);
      // console.log("delayUpdate: ", data.delayUpdate);

      // if (data.delayUpdate) return newApplicants;
      // console.log("new applicant: ", newApplicants[oldApplicantIndex]);
      
      // args.setAppData({ ...args.appData, applicants: newApplicants });
      break;
    }
    case 'deleteApplicant': {
      throw new Error('No API calls in tech demo!')
      // const toDeleteId = assertDefined(data.toDeleteId, instruction, 'data.toDeleteId');
      // await deleteApplicant(toDeleteId)
      // args.setAppData({ ...args.appData, applicants: [...(args.appData.applicants || []).filter(a => a.id !== toDeleteId)] })
      break
    }
    case 'updateSettings': {
      throw new Error('No API calls in tech demo!')
      // const settings = assertDefined(data.settings, instruction, 'data.settings');
      // await updateSettings(settings)
      // if (data.delayUpdate) return settings
      // args.setAppData({ ...args.appData, settings })
      break
    }
    case 'startPasswordReset': {
      throw new Error('No API calls in tech demo!')
      // const email = assertDefined(data.email, instruction, 'data.email');
      // await requestPasswordReset(email)
      break
    }
    case 'resetPassword': {
      throw new Error('No API calls in tech demo!')
      // const password = assertDefined(data.password, instruction, 'data.password');
      // const confirmPassword = assertDefined(data.confirmPassword, instruction, 'data.confirmPassword');
      // const resetToken = assertDefined(data.resetToken, instruction, 'data.resetToken');
      // await resetPassword(password, confirmPassword, resetToken)
      break
    }
    case 'updateAppData': {
      throw new Error('No API calls in tech demo!')
      // const appData = assertDefined(data.appData, instruction, 'data.appData');
      // args.setAppData(appData)
      break
    }
    default:
      console.log('instructionSwitchboard: default')
  }
}
