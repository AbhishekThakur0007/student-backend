export interface baseQueryType{
    name?:{
        $regex:string,
        $options:'i'
    },
    age?:{
        $gt:number
    },
    gender?:{
        $regex:string
    }
}