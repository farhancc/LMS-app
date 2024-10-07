import mongoose,{Document} from "mongoose";
interface Ifaq extends Document{
question:string;
answer:string;
}
interface Icategory extends Document{
    title:string
}
interface BannerImage extends Document{
    public_id:string
    url:string
}
interface Ilayout extends Document{
type:string
faq:Ifaq[]
categories:Icategory[]
banner:{
    image:BannerImage
    title :string
    subtitle:string
}
}
const FAQschema=new mongoose.Schema<Ifaq>({
    question:String,
    answer:String

})
const bannerSchema=new mongoose.Schema<BannerImage>({
    public_id:String,
    url:String
})
const categorySchema=new mongoose.Schema<Icategory>({
    title:String
})
const laoutschema=new mongoose.Schema<Ilayout>({
    type:String,
    faq:[FAQschema],
    categories:[categorySchema],
    banner:{image:bannerSchema,
    title:String,
    subtitle:String,}

})
const Layout=mongoose.model<Ilayout>('Layout',laoutschema)
export default Layout