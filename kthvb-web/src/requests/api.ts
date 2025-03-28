import { Settings } from "@/models/Settings"
import { User } from "@/models/User"
import { structureApplicantData } from "@/utils/structureApplicants"
import { pickBy } from "lodash"

// This file was copied and reused from the old frontend repository
export const BASE_URL = "https://api.kthvolleyball.com"
export const SOCKET_URL = "wss://api.kthvolleyball.com"
// export const BASE_URL = 'http://localhost:5041'
// export const SOCKET_URL = "ws://localhost:5041"

const GRAPHQL = "/graphql"
const SIGNUP = "/signup"
const LOGIN = "/users/login"
const PASSWORD_UPDATE = "/users"
const PASSWORD_FORGOT = "/users/forgotPassword"
const PASSWORD_RESET = "/users/resetPassword"
const USER_DELETE = "/delete"
const STATUS_OK = 200

function authorizationHeader() {
    const jwtToken = localStorage.token
    return {
        Authorization: `Bearer ${jwtToken}`,
    }
}

function checkStatus(response: Response) {
    if (response.status >= STATUS_OK && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(response)
    }
}

function parseJSON(response: Response): Promise<any> {
    return response.json()
}

function ftch(input: any, init: any): Promise<any> {
    return fetch(input, init).then(checkStatus).then(parseJSON)
}

export async function fetchUsers(tryout_id?: string | null | undefined) {
    const data = await ftch(BASE_URL + "/users" + (tryout_id ? `/${tryout_id}` : ""), {
        method: "GET",
        headers: {
            ...authorizationHeader(),
            "Content-Type": "application/json",
        },
    })
    const users = data.map((user: User) => {
        return {
            ...user,
            info: {
                ...user.info,
                joinDate: new Date(user.info.joinDate),
            },
        }
    })
    return users
}
export async function createUser(user: User) {
    const body = JSON.stringify({
        ...user,
    })

    const data = await ftch(BASE_URL + "/users", {
        method: "POST",
        headers: {
            ...authorizationHeader(),
            "Content-Type": "application/json",
        },
        body,
    })
    return data
}

export async function updateUser(user: User) {
    const body = JSON.stringify({ ...user })

    const data = await ftch(BASE_URL + "/users/" + user.id, {
        method: "PUT",
        headers: {
            ...authorizationHeader(),
            "Content-Type": "application/json",
        },
        body,
    })
    return data
}

export async function deleteUser(toDeleteId: string) {
    const body = JSON.stringify({
        toDeleteId: toDeleteId,
    })

    const response = fetch(BASE_URL + "/users/" + toDeleteId, {
        method: "DELETE",
        credentials: "include",
        headers: {
            ...authorizationHeader(),
            "Content-Type": "application/json",
        },
        body,
    })
    return
}

export async function uploadImage(file: File) {
    const signedUrlEndpoint = `${BASE_URL}/signed-upload?file-name=${file.name}&file-type=${file.type}`
    const response = await fetch(signedUrlEndpoint, {
        credentials: "include",
        headers: authorizationHeader(),
    })
    const { signedRequest, url } = await response.json()
    const uploadData = {
        method: "PUT",
        body: file,
    }
    await fetch(signedRequest, uploadData)
    return url
}
export function loginUser(email: string, password: string) {
    const data = {
        email,
        password,
    }
    const post = {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    } as RequestInit
    return ftch(BASE_URL + LOGIN, post)
}

export function updateUserPassword(password: string, confirmPassword: string) {
    const post: RequestInit = {
        method: "PUT",
        credentials: "include",
        headers: {
            ...authorizationHeader(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password,
            confirmPassword,
        }),
    }
    return ftch(BASE_URL + PASSWORD_UPDATE, post)
}

export function requestPasswordReset(email: string) {
    const url = `${BASE_URL}${PASSWORD_FORGOT}`
    return ftch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
        }),
    })
}

export function resetPassword(
    password: string,
    confirmPassword: string,
    token: string
) {
    const url = `${BASE_URL}${PASSWORD_RESET}`
    return ftch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password,
            confirmPassword,
            token,
        }),
    })
}

export async function fetchApplicants(tryout_id: string | null | undefined) {
    const url = `${BASE_URL}/applicants/${tryout_id || ""}`
    const data = await ftch(url, {
        method: "GET",
        headers: {
            ...authorizationHeader(),
            "Content-Type": "application/json",
        },
    })
    console.log("map", data);
    
    const structuredApplicantData = data
        .map((applicant: Applicant) => {
                return structureApplicantData(applicant)
        })
        .filter((applicant: Applicant) => applicant !== null)
    console.log("strkt", structuredApplicantData);
    
    return structuredApplicantData
}

export async function updateApplicant(applicant: Applicant, tryout_id: string | null | undefined) {
    const url = `${BASE_URL}/applicants/${tryout_id || ""}`
    const data = await ftch(url, {
        method: "PUT",
        headers: {
            ...authorizationHeader(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(applicant),
    })
    return data
}

export async function deleteApplicant(applicantId: string) {
    const url = `${BASE_URL}/applicants/${applicantId}`
    return await fetch(url, {
        method: "DELETE",
        headers: {
            ...authorizationHeader(),
            "Content-Type": "application/json",
        },
    })
}

export async function fetchSettings() {
    const url = `${BASE_URL}/settings`
    const data: Settings = await ftch(url, {
        method: "GET",
        headers: {
            ...authorizationHeader(),
            "Content-Type": "application/json",
        },
    })

    const settings: Settings = {
        formStatus: data.formStatus,
        formUrl: data.formUrl,
        formStartDate: new Date(data.formStartDate),
        applicantGroups: data.applicantGroups,
        tryoutDays: data.tryoutDays,
    }

    return settings
}

export function updateSettings(settings: Settings) {
    const url = `${BASE_URL}/settings`
    return ftch(url, {
        method: "PUT",
        headers: {
            ...authorizationHeader(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
    })
}
