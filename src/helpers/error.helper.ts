


export class CustomError extends Error {
   public statuscode:number

    constructor(message:string,statusCode:number){
        super(message)

        this.statuscode =statusCode
    }

}