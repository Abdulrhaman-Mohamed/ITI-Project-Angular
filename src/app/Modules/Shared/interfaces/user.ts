export interface User {
    _id: string
    firstname: string
    lastname: string
    email: string
    password: string
    role: string
    isActive: boolean
    createdAt: string
    updatedAt: string
    occupation:string
    bio:string
    username:string
    location:string
    age:number
    phone:number
    userimage:string
    address:{city:string , country:string}
}
