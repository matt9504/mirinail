import { apiClient, fileApiClient } from "./apiClient"

// 디자이너 인증신청 
export const postApply = async (formdata:any) => {
  const response = await fileApiClient.post<any>(
    "/authentication",
    formdata
  )
  return response.data
}

// 인증신청 전체 조회
export const getAllApply = async (page:number, size:number) => {
  const response = await apiClient.get<any>(
    "/authentication/list",
    { params : { page, size } }
  )
  return response.data
}

// 인증신청 수락/거절
export const patchConfirmApply = async () => {
  const response = await apiClient.get<any>(
    "/authentication/confirm",
  )
  return response.data
}

// 인증파일 다운로드
export const getDownloadApply = async (authUrl:string) => {
  const response = await apiClient.get<any>(
    "/authentication/download/file",
    { params : { authUrl } }
  )
  return response.data
}