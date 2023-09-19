const cloudinary = require('cloudinary')
module.exports=function upload(image){
cloudinary.config({ 
  cloud_name: 'dikricuif', 
  api_key: '666413593535748', 
  api_secret: 'VdWpKIaib3EHfRwimGFyq1iloQ8' 
});
return cloudinary.v2.uploader
  .upload(image)
  .then((result) => {
    console.log(result)
  return result.secure_url
}).catch(err=>console.log(err));
}