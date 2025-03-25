import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/user.models";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middlewares/catchAsyncError";
import Layout from "../models/layout.model";
import cloudinary from "cloudinary";
export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { type } = req.body;
    const isTypeExist=await Layout.find({type})
    // console.log(isTypeExist,'typeexxistss');
    // if(isTypeExist.length){
    //     return next(new ErrorHandler("cant create this already exist",400))
    // }
    
    if (type === "banner") {
      const { image, title, subtitle } =  req.body;
    //   const myCloud = await cloudinary.v2.uploader.upload(image, {
    //     folder: "layout",
    //   });
    console.log(image,title,subtitle);
    
      const banner = {
        // type:"banner",
        // image: { public_id: myCloud.public_id, url: myCloud.secure_url },
        image,
        title,
        subtitle,
      };
      await Layout.create({type:"banner",banner:banner});
    }
    if (type === "FAQ") {
      const { faq } = req.body;
      const faqItems=await Promise.all(
        faq.map((el:any)=>{
            return {question:el.question,answer:el.answer}
        })
      )
      console.log(faq.item);
      
      await Layout.create({type:"FAQ",faq:faqItems});
    

    }
    if (type === "Categories") {
      const { categories } = req.body;
      const categoryItems=await Promise.all(
        categories.map((el:any)=>{
            return {title:el.title}
        })
      )
      await Layout.create({type:'Categories',categories:categoryItems});
    }
    res.status(200).json({
      status: "success",
      message: "laoyout created successfully",
    });
  }
);
export const editLayout = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
        const { type } = req.body;
        const isTypeExist=await Layout.find({type})
        console.log(isTypeExist,'typeexxistss');
        if(!isTypeExist.length){
            return next(new ErrorHandler(" can't edit, please create this",400))
        }
        if (type === "banner") {
            const bannerdoc:any=await Layout.find({type:"banner"})
            // const banner=banners[0]
            const { image, title, subtitle } = req.body;
            // console.log(banner,'banner');
            // console.log(bannerdoc,'bannnerrrrr');
            
            if (bannerdoc)
             await cloudinary.v2.uploader.destroy(bannerdoc[0].banner?.image?.public_id);
            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "layout",
              });

            const layout = {
              image: { public_id: myCloud.public_id, url: myCloud.secure_url },
              title,
              subtitle,
            };
            // banner.
            await Layout.findByIdAndUpdate(bannerdoc.id,{type:'banner',layout});
          }
          if (type === "FAQ") {
            const Faqdoc:any=await Layout.find({type:"FAQ"})

            const { faq } = req.body;
            const faqItems=await Promise.all(
              faq.map((el:any)=>{
                  return {question:el.question,answer:el.answer}
              })
            )
            await Layout.findByIdAndUpdate(Faqdoc.id,{type:"FAQ",faq:faqItems});
          
      
          }
          if (type === "Categories") {
            const Faqdoc:any=await Layout.find({type:"Categories"})
            const { categories } = req.body;
            const categoryItems=await Promise.all(
              categories.map((el:any)=>{
                  return {title:el.title}
              })
            )
            await Layout.findByIdAndUpdate(Faqdoc.id,{type:'Categories',categories:categoryItems});
          }
          res.status(200).json({
            status: "success",
            message: "laoyout updated successfully",
          });
        
    })