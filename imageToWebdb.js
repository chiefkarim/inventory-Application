const cloudinary = require('cloudinary')
          
cloudinary.config({ 
  cloud_name: 'dikricuif', 
  api_key: '666413593535748', 
  api_secret: 'VdWpKIaib3EHfRwimGFyq1iloQ8' 
});
cloudinary.v2.uploader
  .upload("https://cdn.shopify.com/s/files/1/0628/7304/3159/products/2015-03-30_Jake_Look_06_21714_16409.jpg?v=1645894771",{ responsive_breakpoints: { create_derived: true, bytes_step: 20000, min_width: 200, max_width: 1400, transformation: { crop: 'fill', gravity: 'auto' ,format:'webdb'} } })
  .then((result) => console.log(result.responsive_breakpoints[0].breakpoints));
