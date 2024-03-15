import { commonAPI } from "./commonAPI"
import { baseUrl } from "./baseUrl"
//Actual API call
//1.Register API call-post-body

export const registerAPI=async(user)=>{
    return await commonAPI("post",`${baseUrl}/register`,user,"")
}
//2.login api-post-body
export const loginAPI=async(user)=>{
    return await commonAPI("post",`${baseUrl}/login`,user,"")
}
//3.add project api call -post-body+header
export const addProjectAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${baseUrl}/project/add`,reqBody,reqHeader)
}
//3.get Home Projects API call-get
export const getHomeProjectAPI=async()=>{
    return await commonAPI("get",`${baseUrl}/project/home-projects`,"","")
}
//4.get all project API call-
export const getAllProjectAPI=async(searchKey,reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/project/all-projects?search=${searchKey}`,"",reqHeader)
}
//5.get all user projects
export const getUserProjects=async(reqHeader)=>{
    return await commonAPI("get",`${baseUrl}/project/all-user-Projects`,"",reqHeader)
}
//6.Edit user project
export const editUserProject=async(projectId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${baseUrl}/project/update-project/${projectId}`,reqBody,reqHeader)
}
export const deleteUserProjectAPI= async(projectId,reqHeader)=>{
    return await commonAPI("delete",`${baseUrl}/project/delete-project/${projectId}`,{},reqHeader)
}

