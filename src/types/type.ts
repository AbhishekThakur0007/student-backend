export interface baseQueryType{
    name?:{
        $regex:string,
        $options:'i'
    }
}