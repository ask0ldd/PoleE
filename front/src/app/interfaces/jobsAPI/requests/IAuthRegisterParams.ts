import IAuthLoginParams from "./IAuthLoginParams"

export default interface IAuthRegisterParams extends IAuthLoginParams {
    email : `${string}@${string}.${string}`
}