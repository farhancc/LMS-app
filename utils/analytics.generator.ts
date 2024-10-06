import { Document,Model } from "mongoose";
interface Monthdata{
    month:string
    count:number;
   
}
interface HasCreatedAt {
    createdAt: Date;
}
export async function  generateYearlyData<T extends Document&HasCreatedAt>(
    model:Model<T>

):Promise<{lastYear:Monthdata[]}>{
    const lastYear:Monthdata[]=[]
    const currentDate=new Date();
    currentDate.setDate(currentDate.getDate()+1)
    for(let i=11;i>=0;i--){
        const endDate=new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()-i*28)
        const startDate=new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate()-28)
        const monthYear=endDate.toLocaleString('default',{day:'numeric',month:'short',year:'numeric'})
        const count =await model.countDocuments({
            createdAt:{
                $gte:startDate,
                $lt:endDate
            }
        })
        lastYear.push({month:monthYear,count})
    }
    return {lastYear}
}